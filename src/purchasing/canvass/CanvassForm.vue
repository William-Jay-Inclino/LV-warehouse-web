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
            <div class="col-3">

                <div class="row">
                    <div class="col">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                <h6 class="m-0 font-weight-bold"> Details </h6>
                            </div>
                
                            <div class="card-body">
                                <div class="form-group">
                                    <label>RC Number</label>
                                    <input type="text" class="form-control" :value="$module.formData.rc_number" disabled>
                                </div>
                                <div class="form-group">
                                    <label>Date <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control" v-model="$module.formData.date_requested">
                                    <small class="form-text text-danger" v-if="$module.formErrors.date_requested"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Requisitioner <span class="text-danger">*</span></label>
                                    <v-select label="fullname" :options="$module.employees" v-model="$module.formData.requested_by"></v-select>
                                    <small class="form-text text-danger" v-if="$module.formErrors.requested_by"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Noted By <span class="text-danger">*</span></label>
                                    <v-select label="fullname" :options="$module.employees" v-model="$module.formData.noted_by"></v-select>
                                    <small class="form-text text-danger" v-if="$module.formErrors.noted_by"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Purpose <span class="text-danger">*</span></label>
                                    <textarea class="form-control" rows="3" v-model="$module.formData.purpose"></textarea>
                                    <small class="form-text text-danger" v-if="$module.formErrors.purpose"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Notes</label>
                                    <textarea class="form-control" rows="3" v-model="$module.formData.notes"></textarea>
                                </div>
                            </div>
        
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="float-right">
                            <button @click="onClickBack" class="btn btn-primary ml-2">Back</button>
                            <button class="btn btn-secondary ml-2">Print</button>
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

            <div class="col-8">
                <Particulars :error-form="$module.formErrors.items" :items="$module.formData.items" :brands="$module.brands" :units="$module.units" @add-item="addItem" @remove-item="removeItem"/>
            </div>
        </div>


  </div>

</template>


<script setup lang="ts">
    import CanvassTitle from "./components/CanvassTitle.vue";
    import { onMounted, ref } from 'vue';
    import { onBeforeRouteLeave, useRouter } from 'vue-router';
    import Breadcrumbs from '../../common/components/Breadcrumbs.vue'
    import { useToast } from "vue-toastification";
    import { routeNames } from '../../common';
    import { canvassStore } from './canvass.store';
    import { IITem } from '../../common/dto/IItem.dto';
    import Particulars from './../components/Particulars.vue';

    const toast = useToast();
    const router = useRouter()
    const $module = canvassStore()

    const errorMsg = ref('This field is required')

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
            router.push({name: routeNames.purchasing_canvass})
        }

    }

    const addItem = (data: IITem) => $module.onAddItem({data})
    const removeItem = (indx: number) => $module.onRemoveItem({indx})

    const onClickBack = () => {
        router.push({name: routeNames.purchasing_canvass})
    }

</script>


<style scoped>
    /* .form-btn{
        width: 100px;
    } */
</style>