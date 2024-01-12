<template>

    <div class="container-fluid">

        <MEQSTitle />



        <div class="row justify-content-center mt-5">

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
                                        <h5 class="mb-0">List of MEQS</h5>
                                    </div>
                                    <div class="col-4 text-right">
                                        <router-link :to="{name: routeNames.purchasing_meqs_form}">
                                            <button class="btn btn-primary">Add MEQS</button>
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
                                                        <th>MEQS Number</th>
                                                        <th>Reference</th>
                                                        <th>Requisitioner</th>
                                                        <th>Date</th>
                                                        <th class="text-center">Status</th>
                                                        <th class="text-center">
                                                            <i class="fas fa-fw fa-cogs"></i>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in $module.items">
                                                        <td> {{ item.meqs_number }} </td>
                                                        <td> {{ getReference(item) }} </td>
                                                        <td> {{ getRequisitioner(item) }} </td>
                                                        <td> {{ item.meqs_date }} </td>
                                                        <td class="text-center align-middle"> 
                                                            <span :class="{[`badge-${approvalStatus[item.status].color}`]: true}" class="badge badge-pill text-white"> 
                                                                {{ approvalStatus[item.status].label }} 
                                                            </span> 
                                                        </td>
                                                        <td class="text-center">
                                                            <button @click="onClickUpdate(item)" class="btn btn-light btn-sm">
                                                                <i class="fas fa-fw fa-pencil-alt"></i>
                                                            </button>
                                                            <button @click="onDelete(item)" class="btn btn-light btn-sm custom-button">
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
import MEQSTitle from "./components/MEQSTitle.vue";
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2'
import SearchFilter from "./components/MEQSSearchFilter.vue";
import TablePagination from '../components/TablePagination.vue'
import TablePerPage from '../components/TableSelectPerPage.vue'
import { routeNames } from '../../common';
import { meqsStore } from './meqs.store';
import { getFullname } from '../../common'
import { useRouter } from 'vue-router';
import { approvalStatus } from '../../common/constants'
import { IEmployee, IMEQS } from "../../common/entities";

const $module = meqsStore()
const toast = useToast();
const router = useRouter()

$module.init()

const onDelete = async(item: IMEQS) => {

    Swal.fire({
        title: "Are you sure?",
        text: item.meqs_number + " will be removed!",
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


const onClickUpdate = (data: IMEQS) => {
    router.push({name: routeNames.purchasing_rv_form, query: {id: data.id}})
}

const getRequisitioner = (item: IMEQS) => {
    let employee = {} as IEmployee 

    if(item.rv){
        employee = item.rv.requested_by !
        return getFullname(employee.firstname, employee.middlename, employee.lastname)
    }

}

const getReference = (item: IMEQS) => {

    if(item.jo){
        return 'JO#' + item.jo.jo_number
    }

    if(item.rv){
        return 'RV#' + item.rv.rv_number
    }

    if(item.spr){
        return 'JO#' + item.spr.spr_number
    }

}


</script>


<style scoped>
.btn.custom-button[disabled] {
    cursor: not-allowed;
}
</style>