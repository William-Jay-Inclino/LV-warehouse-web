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
                            <label for="formGroupExampleInput">RC Number</label>
                            <v-select label="rc_number" :options="$rv.canvasses"></v-select>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="formGroupExampleInput">RV Number</label>
                            <v-select label="rv_number" :options="$rv.items"></v-select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="formGroupExampleInput2">Date</label>
                            <input type="date" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="formGroupExampleInput2">Requisitioner</label>
                            <v-select label="fullname" :options="$rv.employees"></v-select>
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
    import { rvStore } from '../rv.store';

    const $rv = rvStore()

</script>