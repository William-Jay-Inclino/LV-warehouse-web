<template>

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="mt-5">
            <MEQSTitle/>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-9">

                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                        <h6 class="m-0 font-weight-bold"> Details </h6>
                    </div>
        
                    <div class="card-body">

                        <div class="row">
                            <div class="col-4">
                                <div class="form-group">
                                    <label>MEQS Number</label>
                                    <input type="text" class="form-control" :value="$module.formData.meqs_number" disabled>
                                </div>
                                <div class="form-group">
                                    <label>Reference Number</label>
                                    <div class="row">
                                        <div class="col-2">
                                            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {{ requestType[$module.formData.request_type].label }} </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#" @click="onClickReferenceBtn(REQUEST_TYPE.RV)">RV</a>
                                                <a class="dropdown-item" href="#" @click="onClickReferenceBtn(REQUEST_TYPE.JO)">JO</a>
                                                <a class="dropdown-item" href="#" @click="onClickReferenceBtn(REQUEST_TYPE.SPR)">SPR</a>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <v-select v-model="$module.formData.rv" label="rv_number" :options="$module.rvs" @option:selected="onChangeRcNo()"></v-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Date</label>
                                    <input type="date" class="form-control" v-model="$module.formData.meqs_date">
                                    <small class="form-text text-danger" v-if="$module.formErrors.meqs_date"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>PO Issued</label>
                                </div>
                                <div class="form-group">
                                    <label>Purpose</label>
                                    <textarea class="form-control" rows="3" v-model="$module.formData.purpose"></textarea>
                                    <small class="form-text text-danger" v-if="$module.formErrors.purpose"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Requisitioner</label>
                                    <input type="text" class="form-control" :value="requisitioner" disabled>
                                </div>
                                <div class="form-group">
                                    <label>Requisitioner Notes</label>
                                    <textarea class="form-control" rows="3" v-model="$module.formData.notes"></textarea>
                                    <small class="text-muted">optional</small>
                                </div>
                            </div>

                            <div class="col-8">
                                <UpdateApprovers :approvers="$module.formData.approvers" v-if="$module.formIsEditMode"/>
                                <CreateApprovers :approvers="$module.defaultApprovers" v-else/>
                            </div>

                        </div>

                    </div>

                </div>


            </div>

            <!-- <div class="col-6">
                <CreateApprovers :approvers="$module.defaultApprovers"/>
            </div> -->
        </div>

        <div class="row justify-content-center mt-2">
            <div class="col-9">
                <Particulars
                  :error-form="$module.formErrors.items"
                  :items="$module.formData.items"
                  :brands="$module.brands"
                  :units="$module.units"
                  :suppliers="$module.suppliers"
                  :form-suppliers="$module.formData.suppliers"
                  @add-item="addItem"
                  @remove-item="removeItem" 
                  @add-supplier="addSupplier"
                />
            </div>
        </div>

        <div class="row justify-content-center mt-2">
            <div class="col-9">
                <div class="float-right">
                    <button @click="onClickBack" class="btn btn-primary ml-2">Back</button>
                    <button class="btn btn-secondary ml-2">Print</button>
                    <button v-if="$module.formIsEditMode" class="btn btn-danger ml-2">Cancel</button>
                    <span v-if="!$module.formIsEditMode">
                        <button @click="onSubmit(1)" type="button" class="btn btn-success ml-2">Save</button>
                    </span>
                    <span v-else>
                        <button @click="onSubmit(1)" type="button" class="btn btn-success ml-2">Update</button>
                    </span>
                </div>
            </div>
        </div>


  </div>

</template>


<script setup lang="ts">
    import MEQSTitle from "./components/MEQSTitle.vue";
    import { computed, onMounted, ref } from 'vue';
    import { onBeforeRouteLeave, useRouter } from 'vue-router';
    import Breadcrumbs from '../../common/components/Breadcrumbs.vue'
    import { useToast } from "vue-toastification";
    import { routeNames, requestType, getFullname } from '../../common';
    import { meqsStore } from './meqs.store';
    import { IItemWithSupplier } from '../../common/dto/IItem.dto';
    import Particulars from './../components/ParticularSuppliers.vue';
    import CreateApprovers from '../components/CreateApprovers.vue'
    import UpdateApprovers from '../components/UpdateApprovers.vue'
    import { ISupplier, ISupplierItem, REQUEST_TYPE } from "../../common/entities";

    const toast = useToast();
    const router = useRouter()
    const $module = meqsStore()

    const errorMsg = ref('This field is required')

    const breadcrumbItems = ref([
        {
            text: 'MEQS List',
            route: routeNames.purchasing_meqs,
            isActive: false,
        },
        {
            text: 'MEQS Form',
            route: routeNames.purchasing_meqs_form,
            isActive: true,
        }
    ])

    onBeforeRouteLeave( (to: any, from: any, next: any) => {
        console.log('onBeforeRouteLeave()')
        console.log({to})
        console.log({from})
        $module.resetFormData()

        next()
    })

    const requisitioner = computed( () => {
        if($module.formData.requested_by){
            const x = $module.formData.requested_by
            return getFullname(x.firstname, x.middlename, x.lastname) 
        }
        return ''
    })

    onMounted( async() => {

        let id = undefined
        const query = router.currentRoute.value.query

        if(query.id){
            id = query.id as string
        }
        await $module.initForm(id)

    })


    const onSubmit = async(action: number) => {
        console.log('onSubmit()')
        const res = await $module.onSubmit({formData: {...$module.formData}})

        console.log('res', res)

        if(!res.success){
            toast.error(res.msg)
            return 
        }

        $module.resetFormData()
        toast.success(res.msg)

        if(action === 1){
            router.push({name: routeNames.purchasing_rv})
        }

    }

    const addItem = (data: IItemWithSupplier) => $module.onAddItem({data})
    const removeItem = (indx: number) => $module.onRemoveItem({indx})

    const onClickBack = () => {
        router.push({name: routeNames.purchasing_meqs})
    }

    const onClickReferenceBtn = (requestType: REQUEST_TYPE) => {
        $module.formData.request_type = requestType
    }

    const onChangeRcNo = () => {
        console.log('onChangeRcNo()')
        
        if($module.formData.rv){

            const requestedBy = {...$module.formData.rv.requested_by}
            requestedBy.fullname = getFullname(requestedBy.firstname!, requestedBy.middlename!, requestedBy.lastname!)

            // @ts-ignore
            $module.formData.requested_by = requestedBy

            $module.formData.purpose = $module.formData.rv.purpose
            $module.formData.notes = $module.formData.rv.notes

            const itemDtos = [...$module.formData.rv.rv_items].map(i => {
                const x = {} as IItemWithSupplier
                x.brand = i.item.brand
                x.description = i.item.description
                x.quantity = i.item.quantity
                x.unit = i.item.unit
                x.supplier_items = []

                x.invalid = {
                    brand: false,
                    description: false,
                    unit: false,
                    quantity: false,
                    supplier_items: false
                }
                return x
            })

            $module.formData.items = itemDtos
        }
    }

    const addSupplier = (supplier: ISupplier) => {
        const items = $module.formData.items

        for(let item of items){
            const x = {} as ISupplierItem
            x.price = 0
            x.supplier = supplier
            item.supplier_items.push(x)
        }

        $module.formData.suppliers.push(supplier)

    }

</script>

