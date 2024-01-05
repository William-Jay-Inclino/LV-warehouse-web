<template>

    <div class="container-fluid">

        <CanvassTitle />

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        <div class="row w-100 justify-content-between align-items-center">
                            <div class="col-8">
                            <Search />
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
                                            <!-- <tr>
                                                <td>
                                                    <TableSearch />
                                                </td>
                                                <td>
                                                    <TableSearch />
                                                </td>
                                                <td>
                                                    <TableSearch />
                                                </td>
                                                <td></td>
                                            </tr> -->
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

</template>

<script setup lang="ts">
import CanvassTitle from "./components/CanvassTitle.vue";
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2'
// import TableSearch from './components/TableSearch.vue'
import Search from "./components/Search.vue";
import TablePagination from './components/TablePagination.vue'
import TablePerPage from './components/TableSelectPerPage.vue'
import { routeNames } from '../common';
import { canvassStore } from './canvass.store';
import { getFullname } from '../common'
import { useRouter } from 'vue-router';

import * as mock from '../__temp__/data'
import { ICanvass } from "../common/entities";

const $module = canvassStore()
const toast = useToast();
const router = useRouter()

$module.setItems(mock.canvasses)

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
            const removed = await $module.onDelete(item.id)

            if(removed){
                toast.success(item.rc_number + ' successfully removed!')

            }else{
                toast.error('Failed to remove ' + item.rc_number)
            }
        }
    });

}


const onClickUpdate = (data: ICanvass) => {
    router.push({name: routeNames.purchasing_canvass_form, query: {id: data.id}})
}


</script>