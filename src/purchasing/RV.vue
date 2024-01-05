<template>

    <div class="container-fluid">

        <RVTitle />

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        <div class="row w-100 justify-content-between align-items-center">
                            <div class="col-8">
                            <Search />
                            </div>
                            <div class="col-4 text-right">
                            <router-link :to="{name: routeNames.purchasing_rv_form}">
                                <button class="btn btn-primary">Add RV</button>
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
                                                <th>RV Number</th>
                                                <th>RC Number</th>
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
                                                <td> {{ item.rv_number }} </td>
                                                <td> {{ item.canvass.rc_number }} </td>
                                                <td> {{ getFullname(item.canvass.requested_by.firstname, item.canvass.requested_by.middlename, item.canvass.requested_by.lastname) }} </td>
                                                <td> {{ item.date_requested }} </td>
                                                <td class="text-center"> 
                                                    <span :class="{[`badge-${item.statusObj.color}`]: true}" class="badge badge-pill text-white"> 
                                                        {{ item.statusObj.label }} 
                                                    </span> 
                                                </td>
                                                <td class="text-center">
                                                    <button @click="onClickUpdate(item)" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                                    </button>
                                                    <!-- <button @click="onDelete(item)" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-trash text-danger"></i>
                                                    </button> -->
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
// import { useToast } from "vue-toastification";
// import Swal from 'sweetalert2'
import RVTitle from "./components/RVTitle.vue";
import Search from './components/Search.vue'
import TablePagination from './components/TablePagination.vue'
import TablePerPage from './components/TableSelectPerPage.vue'
import { routeNames } from '../common';
import { rvStore } from './rv.store';
import { getFullname } from '../common'
import { useRouter } from 'vue-router';
import { IRV } from '../common/entities';

const $module = rvStore()
// const toast = useToast();
const router = useRouter()

// const onDelete = async(item: IRV) => {

//     Swal.fire({
//         title: "Are you sure?",
//         text: "RV No. " + item.rv_number + " will be removed!",
//         position: "top",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#e74a3b",
//         cancelButtonColor: "#6c757d",
//         confirmButtonText: "Yes, delete it!",
//         reverseButtons: true,
//         }).then( async(result) => {
//         if (result.isConfirmed) {
//             const removed = await $module.onDelete(item.id)

//             if(removed){
//                 toast.success("RV No. " + item.rv_number + ' successfully removed!')

//             }else{
//                 toast.error('Failed to remove RV No. ' + item.rv_number)
//             }
//         }
//     });

// }


const onClickUpdate = (data: IRV) => {
    router.push({name: routeNames.purchasing_rv_form, query: {id: data.id}})
}


/* 
    1. check if rv is cancelled
    2. check if there is an approver who disapproves
    3. Check if there is still an approver who is pending 
    4. Else all approver approves
*/

// const getStatus = (item: IRV) => {
//     console.log('getStatus()', item)

//     if(item.is_cancelled){
//         return approvalStatus['cancelled'].label
//     }

//     const hasDisapproved = item.approvers.find(i => i.status === APPROVAL_STATUS.DISAPPROVED)

//     if(hasDisapproved){
//         return approvalStatus[APPROVAL_STATUS.DISAPPROVED].label
//     }

//     const hasPending = item.approvers.find(i => i.status === APPROVAL_STATUS.PENDING)

//     if(hasPending){
//         return approvalStatus[APPROVAL_STATUS.PENDING].label
//     }

//     return approvalStatus[APPROVAL_STATUS.APPROVED].label

// }

</script>