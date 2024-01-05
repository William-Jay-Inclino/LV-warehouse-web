<template>

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="mt-5">
            <CanvassTitle/>
        </div>

        <div class="row justify-content-center mt-5">
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
                            <label>Date</label>
                            <input type="date" class="form-control" v-model="$module.formData.date_requested">
                            <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                        </div>
                        <div class="form-group">
                            <label>Requested By</label>
                            <v-select :options="$module.employees" v-model="$module.formData.requested_by"></v-select>
                            <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                        </div>
                        <div class="form-group">
                            <label>Noted By</label>
                            <v-select :options="$module.employees" v-model="$module.formData.noted_by"></v-select>
                            <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                        </div>
                        <div class="form-group">
                            <label>Purpose</label>
                            <textarea class="form-control" rows="3" v-model="$module.formData.purpose"></textarea>
                            <!-- <small class="form-text text-danger" > {{ errorMsg }} </small> -->
                            <!-- <small class="text-muted">optional</small> -->
                        </div>
                        <div class="form-group">
                            <label>Notes</label>
                            <textarea class="form-control" rows="3" v-model="$module.formData.notes"></textarea>
                            <!-- <small class="form-text text-danger" > {{ errorMsg }} </small> -->
                            <!-- <small class="text-muted">optional</small> -->
                        </div>
                    </div>

                </div>


            </div>

            <div class="col-8">
                <Particulars :items="$module.formData.items" @add-item="addItem" @remove-item="removeItem"/>
            </div>
        </div>


  </div>

</template>


<script setup lang="ts">
    import CanvassTitle from "./components/CanvassTitle.vue";
    import { onMounted, ref } from 'vue';
    import { onBeforeRouteLeave, useRouter } from 'vue-router';
    import Breadcrumbs from '../common/components/Breadcrumbs.vue'
    import { useToast } from "vue-toastification";
    import { routeNames } from '../common';
    import * as mock from '../__temp__/data'
    import { canvassStore } from './canvass.store';
    import { IITemDto } from '../common/dto/IItem.dto';
    import Particulars from './components/Particulars.vue';

    const toast = useToast();
    const router = useRouter()
    const $module = canvassStore()

    const _units = mock.units
    const _brands = mock.brands 
    const _employees = mock.employees

    $module.setUnits(_units)
    $module.setBrands(_brands)
    $module.setEmployees(_employees)

    const moduleLabel = 'Canvass'
    // const errorMsg = ref('This field is required')

    const breadcrumbItems = ref([
        {
            text: 'Canvass List',
            route: routeNames.purchasing_canvass,
            isActive: false,
        },
        {
            text: 'Canvass Form',
            route: routeNames.purchasing_canvass_form,
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


    const onSubmit = async(action: number) => {
        console.log('onSubmit()')
        const submitted = await $module.onCreate({data: {...$module.formData}})

        if(!submitted){
            toast.error('Failed to save ' + moduleLabel)
            return 
        }

        $module.resetFormData()
        toast.success(moduleLabel + ' successfully saved!')

        if(action === 1){
            router.push({name: routeNames.purchasing_canvass})
        }

    }

    const addItem = (data: IITemDto) => $module.onAddItem({data})
    const removeItem = (indx: number) => $module.onRemoveItem({indx})

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