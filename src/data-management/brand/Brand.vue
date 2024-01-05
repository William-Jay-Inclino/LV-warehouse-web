<template>

    <div class="container-fluid">

        <Title />

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <router-link :to="{name: routeNames.data_management_brand_form}" class="float-right">
                            <button class="btn btn-primary" type="button">Add Brand</button>
                        </router-link>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th class="text-center">
                                            <i class="fas fa-fw fa-cogs"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item of $module.brands">
                                        <td> {{ item.name }} </td>
                                        <td class="text-center">
                                            <button @click="onClickUpdateIcon(item)" class="btn btn-light btn-sm">
                                                <i class="fas fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button @click="onDelete(item)" class="btn btn-light btn-sm">
                                                <i class="fas fa-fw fa-trash text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  </div>

</template>


<script setup lang="ts">
import Title from './components/Title.vue'
import { useToast } from "vue-toastification";
import { IBrand } from '../../common/entities'
import { brandStore } from './brand.store'
import { routeNames } from '../../common/constants'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const toast = useToast();
const $module = brandStore()
const router = useRouter()

$module.init()

const onDelete = async(item: IBrand) => {

    Swal.fire({
        title: "Are you sure?",
        text: item.name + " will be removed!",
        position: "top",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74a3b",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
        }).then( async(result) => {
        if (result.isConfirmed) {
            const removed = await $module.onDelete(item.id)

            if(removed){
                toast.success(item.name + ' successfully removed!')

            }else{
                toast.error('Failed to remove ' + item.name)
            }
        }
    });

}


const onClickUpdateIcon = (data: IBrand) => {
    router.push({name: routeNames.data_management_brand_form, query: {id: data.id}})
}

</script>
