<template>

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="mt-5">
            <RVTitle/>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-9">

                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                        <h6 class="m-0 font-weight-bold"> Details </h6>
                    </div>
        
                    <div class="card-body">

                        <div class="row">

                            <div class="col-6">
                                <div class="form-group">
                                    <label>RV Number <span class="text-danger">*</span> </label>
                                    <input type="text" class="form-control" :value="$module.formData.rv_number" disabled>
                                </div>
                                <div class="form-group">
                                    <label>RC Number <span class="text-danger">*</span></label>
                                    <v-select
                                      label="rc_number"
                                      v-model="$module.formData.canvass"
                                      :options="$module.canvasses"
                                      @option:selected="onChangeRcNo()"
                                      :selectable="(option: ICanvass) => !option.is_referenced"
                                      v-if="!$module.formIsEditMode"
                                    >
                                    </v-select>
                                    <input type="text" class="form-control" :value="$module.formData.canvass?.rc_number" readonly v-else>
                                </div>
                                <div class="form-group">
                                    <label>Date <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control" v-model="$module.formData.date_requested">
                                    <small class="form-text text-danger" v-if="$module.formErrors.date_requested"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Requisitioner <span class="text-danger">*</span></label>
                                    <v-select label="fullname" :options="$module.employees" v-model="$module.formData.requested_by"></v-select>
                                    <!-- <v-select label="fullname" :options="$module.employees" v-model="$module.formData.requested_by" @option:selected="onChangeRequestedBy()"></v-select> -->
                                    <small class="form-text text-danger" v-if="$module.formErrors.requested_by"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Purpose <span class="text-danger">*</span></label>
                                    <textarea class="form-control" rows="3" v-model="$module.formData.purpose"></textarea>
                                    <small class="form-text text-danger" v-if="$module.formErrors.purpose"> {{ errorMsg }} </small>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="form-group">
                                    <label>Immediate Supervisor <span class="text-danger">*</span></label>
                                    <v-select label="fullname" :options="$module.employees" v-model="$module.formData.supervisor"></v-select>
                                    <small class="form-text text-danger" v-if="$module.formErrors.supervisor"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Work Order Number</label>
                                    <input type="text" class="form-control" v-model="$module.formData.work_order_no">
                                </div>
                                <div class="form-group">
                                    <label>Work Order Date</label>
                                    <input type="date" class="form-control" v-model="$module.formData.work_order_date">
                                </div>
                                <div class="form-group">
                                    <label>Classification</label>
                                    <input type="text" class="form-control" readonly>
                                </div>
                                <div class="form-group">
                                    <label>Notes</label>
                                    <textarea class="form-control" rows="3" v-model="$module.formData.notes"></textarea>
                                </div>
                            </div>
                            
                        </div>

                        <div class="row mt-3">
                            <div class="col-9" v-if="!$module.formIsEditMode">
                                <CreateApprovers :approvers="$module.defaultApprovers"/>
                            </div>
                            <div class="col-11" v-else>
                                <UpdateApprovers :approvers="$module.formData.approvers"/>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-9">
                <Particulars :error-form="$module.formErrors.items" :items="$module.formData.items" :brands="$module.brands" :units="$module.units" @add-item="addItem" @remove-item="removeItem"/>
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
    import RVTitle from "./components/RVTitle.vue";
    import { onMounted, ref } from 'vue';
    import { onBeforeRouteLeave, useRouter } from 'vue-router';
    import Breadcrumbs from '../../common/components/Breadcrumbs.vue'
    import { useToast } from "vue-toastification";
    import { getFullname, routeNames } from '../../common';
    import { rvStore } from './rv.store';
    import { IITem } from '../../common/dto/IItem.dto';
    import Particulars from './../components/Particulars.vue';
    import CreateApprovers from '../components/CreateApprovers.vue'
    import UpdateApprovers from '../components/UpdateApprovers.vue'
    import { ICanvass } from "../../common/entities";

    const toast = useToast();
    const router = useRouter()
    const $module = rvStore()

    const errorMsg = ref('This field is required')

    const breadcrumbItems = ref([
        {
            text: 'RV List',
            route: routeNames.purchasing_rv,
            isActive: false,
        },
        {
            text: 'Canvass Form',
            route: routeNames.purchasing_rv_form,
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

    const addItem = (data: IITem) => $module.onAddItem({data})
    const removeItem = (indx: number) => $module.onRemoveItem({indx})

    const onChangeRcNo = () => {
        console.log('onChangeRcNo()')
        
        if($module.formData.canvass){

            const requestedBy = {...$module.formData.canvass.requested_by}
            requestedBy.fullname = getFullname(requestedBy.firstname, requestedBy.middlename, requestedBy.lastname)

            $module.formData.requested_by = requestedBy

            $module.formData.purpose = $module.formData.canvass.purpose
            $module.formData.notes = $module.formData.canvass.notes

            const itemDtos = [...$module.formData.canvass.canvass_items].map(i => {
                const x = {} as IITem
                x.brand = i.item.brand
                x.description = i.item.description
                x.quantity = i.item.quantity
                x.unit = i.item.unit

                x.invalid = {
                    brand: false,
                    description: false,
                    unit: false,
                    quantity: false
                }
                return x
            })

            $module.formData.items = itemDtos
        }
    }

    const onClickBack = () => {
        router.push({name: routeNames.purchasing_rv})
    }

</script>

