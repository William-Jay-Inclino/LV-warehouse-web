<template>

    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <h1 class="h3 mb-0 text-gray-800">Purchasing</h1>
            </div>
            </div>
            <div class="row mb-4">
            <div class="col">
                <h2 class="h5 mb-0 text-gray-600">MEQS</h2>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        <div class="row w-100 justify-content-between align-items-center">
                            <div class="col-8">
                            <Search />
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
                                                <th>Type</th>
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
                                                <td> {{ item.reference_type }} </td>
                                                <td>  </td>
                                                <td> {{ item.meqs_date }} </td>
                                                <td class="text-center"> 
                                                    <span :class="{[`badge-${item.statusObj.color}`]: true}" class="badge badge-pill text-white"> 
                                                        {{ item.statusObj.label }} 
                                                    </span> 
                                                </td>
                                                <td class="text-center">
                                                    <button @click="onClickUpdate(item)" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-pencil-alt"></i>
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
// import { useToast } from "vue-toastification";
// import Swal from 'sweetalert2'
import Search from './components/Search.vue'
import TablePagination from './components/TablePagination.vue'
import TablePerPage from './components/TableSelectPerPage.vue'
import { routeNames } from '../common';
import { meqsStore } from './meqs.store';
// import { getFullname } from '../common'
import { useRouter } from 'vue-router';
import { IMEQS } from '../common/entities';

const $module = meqsStore()
// const toast = useToast();
const router = useRouter()


const onClickUpdate = (data: IMEQS) => {
    router.push({name: routeNames.purchasing_meqs_form, query: {id: data.id}})
}


</script>