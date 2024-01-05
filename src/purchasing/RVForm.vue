<template>

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="mt-5">
            <RVTitle />
        </div>

        <div v-if="!$module.formIsEditMode" class="row justify-content-center mt-5">
            <div class="col-11">
                <div class="float-right">
                    <button @click="onSubmit(1)" type="button" class="btn btn-success form-btn ml-2">Submit & Finish</button>
                    <button @click="onSubmit(2)" type="button" class="btn btn-primary form-btn ml-2">Submit & Add Again</button>
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-3">

                        
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                        <h6 class="m-0 font-weight-bold"> Details </h6>
                    </div>
        
                    <div class="card-body">
                        <div class="form-group">
                            <div class="form-group">
                            <label>Date</label>
                            <input type="date" class="form-control" v-model="$module.formData.date_requested">
                            <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                        </div>
                            <label>RC No.</label>
                            <v-select :options="$module.canvasses" v-model="$module.formData.canvass" @option:selected="onChangeRcNo()"></v-select>
                            <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                        </div>
                        <div class="form-group">
                            <label>Requisitioner</label>
                            <input type="text" class="form-control" :value="requisitioner" readonly>
                            <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                        </div>
                        <div class="form-group">
                            <label>Purpose</label>
                            <textarea class="form-control" rows="3" v-model="$module.formData.purpose"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Notes</label>
                            <textarea class="form-control" rows="3" v-model="$module.formData.notes"></textarea>
                        </div>
                        <div class="form-group" v-if="!$module.formIsEditMode">
                            <label>Imd. Sup.</label>
                            <v-select :options="$module.employees" v-model="$module.formData.supervisor"></v-select>
                            <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                        </div>
                        <div class="form-group">
                            <label>Work Order No.</label>
                            <input type="text" class="form-control" v-model="$module.formData.work_order_no">
                            <small class="form-text text-muted"> <i> Optional </i> </small>
                        </div>
                        <div class="form-group">
                            <label>Work Order Date</label>
                            <input type="date" class="form-control" v-model="$module.formData.work_order_date">
                            <small class="form-text text-muted"> <i> Optional </i> </small>
                        </div>
                    </div>

                </div>

            </div>

            <div v-if="!$module.formIsEditMode" class="col-8">
                <Particulars :items="$module.formData.items" @add-item="addItem" @remove-item="removeItem"/>
            </div>

            <div class="col-lg-7 col-md-12 col-sm-12" v-if="$module.formIsEditMode">

                <div class="col">
                    <Approvers :approvers="$module.formData.approvers"/>
                </div>

            </div>
        </div>

        <div v-if="$module.formIsEditMode" class="row justify-content-center mt-3">
            <div class="col-lg-10">
                <Particulars :items="$module.formData.items" @add-item="addItem" @remove-item="removeItem"/>
            </div>
        </div>

        <div v-if="$module.formIsEditMode" class="row justify-content-center mt-3">
            <div class="col-11">
                <div class="text-center">
                    <button @click="onSubmit(1)" type="button" class="btn btn-success form-btn ml-2">Submit & Finish</button>
                    <button @click="onSubmit(2)" type="button" class="btn btn-primary form-btn ml-2">Submit & Add Again</button>
                </div>
            </div>
        </div>

  </div>

</template>


<script setup lang="ts">
    import RVTitle from "./components/RVTitle.vue";
    import { computed, onMounted, ref } from 'vue';
    import { onBeforeRouteLeave, useRouter } from 'vue-router';
    import Breadcrumbs from '../common/components/Breadcrumbs.vue'
    import Approvers from './components/Approvers.vue';
    import { useToast } from "vue-toastification";
    import { getFullname, routeNames } from '../common';
    import * as mock from '../__temp__/data'
    import { rvStore } from './rv.store';
    import { IITemDto } from '../common/dto/IItem.dto';
    import { ICreateRVDto } from './dto/rv.dto';
    import Particulars from './components/Particulars.vue';

    const toast = useToast();
    const router = useRouter()
    const $module = rvStore()

    $module.setUnits(mock.units)
    $module.setBrands(mock.brands)
    $module.setEmployees(mock.employees)
    $module.setCanvasses(mock.canvasses)

    const moduleLabel = 'RV'
    // const errorMsg = ref('This field is required')

    const breadcrumbItems = ref([
        {
            text: 'RV List',
            route: routeNames.purchasing_rv,
            isActive: false,
        },
        {
            text: 'RV Form',
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
        const query = router.currentRoute.value.query

        if(query.id){
            // intialize update form / populate form 
            await $module.initUpdateFormData(query.id as string)
        }
    })


    const requisitioner = computed( () => {

        if($module.formData.canvass){
            const requestedBy = $module.formData.canvass.requested_by 
            return getFullname(requestedBy.firstname, requestedBy.middlename, requestedBy.lastname)
        }

        return ''
        
    })

    const onSubmit = async(action: number) => {
        console.log('onSubmit()')

        const formData = {...$module.formData}

        if(!formData.canvass){
            console.error('canvass is undefined')
            return 
        }

        if(!formData.supervisor){
            console.error('supervisor is undefined')
            return 
        }

        const data = {} as ICreateRVDto 

        data.canvass = formData.canvass
        data.date_requested = formData.date_requested
        data.items = formData.items
        data.supervisor = formData.supervisor
        data.work_order_date = formData.work_order_date
        data.work_order_no = formData.work_order_no
        data.purpose = formData.purpose 
        data.notes = formData.notes


        const submitted = await $module.onCreate({data})

        if(!submitted){
            toast.error('Failed to save ' + moduleLabel)
            return 
        }

        $module.resetFormData()
        toast.success(moduleLabel + ' successfully saved!')

        if(action === 1){
            router.push({name: routeNames.purchasing_rv})
        }

    }

    const addItem = (data: IITemDto) => $module.onAddItem({data})
    const removeItem = (indx: number) => $module.onRemoveItem({indx})

    const onChangeRcNo = () => {
        console.log('onChangeRcNo()')

        
        if($module.formData.canvass){
            $module.formData.purpose = $module.formData.canvass.purpose
            $module.formData.notes = $module.formData.canvass.notes
            // $module.formData.items = [...$module.formData.canvass.items]

            const itemDtos = [...$module.formData.canvass.items].map(i => {
                const x = {} as IITemDto
                x.brand = i.item.brand
                x.description = i.item.description
                x.id = i.item.id
                x.quantity = i.item.quantity
                x.supplier_items = i.item.supplier_items
                x.unit = i.item.unit

                return x
            })

            $module.formData.items = itemDtos
        }
    }

    // const onCancel = () => {
    //     // $module.resetFormData()
    //     router.push({name: routeNames.purchasing_canvass})
    // }

</script>


<style scoped>
    .form-btn{
        width: 180px;
    }
</style>