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
                            <v-select label="rc_number" :options="rcNumbers" v-model="selectedRcNumber"></v-select>
                        </div>
                    </div>
                    <div class="col-6">
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
                            <v-select label="fullname" :options="employees" v-model="selectedEmployee"></v-select>
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
    import { ref } from 'vue';
    import { sendRequest } from '../../config/api';
    import { ISearchRcNumber, ISearchEmployee } from '../entities/common.entites';
    import { getFullname } from '../../common';


    const rcNumbers = ref<ISearchRcNumber[]>([])
    const selectedRcNumber = ref<ISearchRcNumber | null>(null)
    const employees = ref<ISearchEmployee[]>([])
    const selectedEmployee = ref<ISearchEmployee | null>(null)

    fetchData()

    async function fetchData(){
        const query = `
            query {
                canvasses {
                    rc_number
                },
                employees{
                    id
                    firstname
                    middlename
                    lastname
                }
            }
        `;
        try {
            const response = await sendRequest(query);
            console.log('response', response)
            rcNumbers.value = response.data.data.canvasses
            employees.value = response.data.data.employees.map((i: ISearchEmployee) => ({...i, fullname: getFullname(i.firstname, i.middlename, i.lastname)}))
            // return response.data.data.canvasses
        } catch (error) {
            console.error(error);
            throw error
        }
    }

</script>