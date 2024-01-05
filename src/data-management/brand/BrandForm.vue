<template>

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="mt-5">
            <Title/>
        </div>


        <div class="row justify-content-center mt-5">
            <div class="col-4">

                <form @submit.prevent="onSubmit">

                    <div class="row">
                        <div class="col">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                    <h6 class="m-0 font-weight-bold"> {{ action + ' ' + moduleLabel }} </h6>
                                </div>
                    
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input v-model="$module.formData.name" type="text" class="form-control">
                                        <small class="form-text text-danger" v-if="$module.formErrors.name"> {{ errorMsg }} </small>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
    
                    <div class="row">
                        <div class="col">
                            <div class="d-flex justify-content-between">
                                <button @click="onCancel" type="button" class="btn btn-dark">Cancel</button>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </div>



  </div>

</template>


<script setup lang="ts">
import Title from './components/Title.vue'
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import Breadcrumbs from '../../common/components/Breadcrumbs.vue'
import { useToast } from "vue-toastification";
import { brandStore } from './brand.store'
import { routeNames } from '../../common';
import { ICreateBrandDto, IUpdateBrandDto } from './dto/brand.dto';
import { IBrand } from '../../common/entities';

const toast = useToast();
const $module = brandStore()
const router = useRouter()

const moduleLabel = 'Brand'
const errorMsg = ref('This field is required')

const breadcrumbItems = ref([
    {
        text: 'Brand List',
        route: routeNames.data_management_brand,
        isActive: false,
    },
    {
        text: 'Brand Form',
        route: routeNames.data_management_brand_form,
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
        await $module.initUpdateFormData(query.id as string)
    }
})

const action = computed( () => $module.formData.id === '' ? 'Add' : 'Update')

const onSubmit = async() => {

    const errors = $module.formErrors
    errors.name = false 

    if($module.formData.name.trim() === ''){
        errors.name = true
    }

    const hasError = Object.values(errors).includes(true)

    if(hasError){
        return 
    }

    const submitted = await ($module.formIsEditMode ? onUpdate() : onCreate())

    if(!submitted){
        toast.error('Failed to save ' + moduleLabel)
        return null
    }

    $module.resetFormData()
    toast.success(moduleLabel + ' successfully saved!')
    router.push({name: routeNames.data_management_brand})

}


const onCreate = async(): Promise<IBrand | null> => {
    const formData = {...$module.formData} 
    const data = {} as ICreateBrandDto 
    data.name = formData.name
    
    return await $module.onCreate({data})
}

const onUpdate = async(): Promise<IBrand | null> => {
    const formData = {...$module.formData} 
    const data = {} as IUpdateBrandDto 
    data.name = formData.name
    
    return await $module.onUpdate({id: formData.id, data})
}


const onCancel = () => {
    $module.resetFormData()
    router.push({name: routeNames.data_management_brand})
}

</script>
