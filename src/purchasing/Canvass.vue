<template>

    <div class="container-fluid">

        <CanvassTitle />



        <div class="row justify-content-center">

            <div class="col-8">

                <div class="row">
                    <div class="col-6">
                        <SearchFilter />
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-12">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center">
                                <div class="row w-100 justify-content-between align-items-center">
                                    <div class="col-8">
                                        <h5 class="mb-0">List of Canvass</h5>
                                    </div>
                                    <div class="col-4 text-right">
                                        <router-link :to="{name: routeNames.purchasing_canvass_form}">
                                            <button class="btn btn-primary">Add Canvass</button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
        
                            <!-- Card Body -->
                            <div class="card-body">
        
                                <div class="row mb-3">
                                    <TablePerPage />
                                </div>
        
                                <div class="row">
                                    <div class="col">
                                        <div class="table-responsive">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th width="30%">RC Number</th>
                                                        <th width="30%">Requisitioner</th>
                                                        <th width="30%">Date</th>
                                                        <th class="text-center">
                                                            <i class="fas fa-fw fa-cogs"></i>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in $module.items">
                                                        <td> {{ item.rc_number }} </td>
                                                        <td> {{ getFullname(item.requested_by.firstname, item.requested_by.middlename, item.requested_by.lastname) }} </td>
                                                        <td> {{ item.date_requested }} </td>
                                                        <td class="text-center">
                                                            <button @click="onClickUpdate(item)" class="btn btn-light btn-sm">
                                                                <i class="fas fa-fw fa-pencil-alt"></i>
                                                            </button>
                                                            <button :disabled="item.is_referenced" @click="onDelete(item)" class="btn btn-light btn-sm custom-button">
                                                                <i class="fas fa-fw fa-trash text-danger"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
        
                                <div class="row mt-2">
                                    <div class="col">
                                        <TablePagination class="float-right"/>
                                    </div>
                                </div>
        
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>


  </div>

</template>

<script setup lang="ts">
import CanvassTitle from "./components/CanvassTitle.vue";
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2'
import SearchFilter from "./components/CanvassSearchFilter.vue";
import TablePagination from './components/TablePagination.vue'
import TablePerPage from './components/TableSelectPerPage.vue'
import { routeNames } from '../common';
import { canvassStore } from './canvass.store';
import { getFullname } from '../common'
import { useRouter } from 'vue-router';

import { ICanvass } from "../common/entities";

const $module = canvassStore()
const toast = useToast();
const router = useRouter()

$module.init()

const onDelete = async(item: ICanvass) => {

    Swal.fire({
        title: "Are you sure?",
        text: item.rc_number + " will be removed!",
        position: "top",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74a3b",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
        }).then( async(result) => {
        if (result.isConfirmed) {
            const res = await $module.onDelete(item.id)

            if(res.success){
                toast.success(res.msg)

            }else{
                toast.error(res.msg)
            }
        }
    });

}


const onClickUpdate = (data: ICanvass) => {
    router.push({name: routeNames.purchasing_canvass_form, query: {id: data.id}})
}


</script>


<style scoped>
.btn.custom-button[disabled] {
    cursor: not-allowed;
    /* Override any hover styles or other styles for the disabled state */
}
</style>