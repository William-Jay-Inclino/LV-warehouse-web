<template>
    <div class="card shadow mb-5">
        <div class="card-header">
            Search Filters
        </div>
        <div class="card-body">
            <form>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="formGroupExampleInput">MEQS Number</label>
                            <v-select label="meqs_number" :options="$meqs.items"></v-select>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="formGroupExampleInput2">Date</label>
                            <input type="date" class="form-control input-sm">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="formGroupExampleInput2">Transaction</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">RV</button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">RV</a>
                                    <a class="dropdown-item" href="#">JO</a>
                                    <a class="dropdown-item" href="#">SPR</a>
                                    </div>
                                </div>
                                <v-select label="rv_number" :options="$meqs.rvs" style="width: 80%;"></v-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="formGroupExampleInput2">Requisitioner</label>
                            <v-select label="fullname" :options="$meqs.employees"></v-select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary float-right">Search</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { meqsStore } from '../meqs.store';

    const $meqs = meqsStore()

</script>