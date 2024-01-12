<template>

    <div>
        <h6 class="m-0 font-weight-bold"> Approvers </h6>
        <div class="table-responsive mt-2">
            <table class="table table-bordered">
                <thead class="bg-secondary text-white">
                    <th>Order</th>
                    <th>Position</th>
                    <th>Name</th>
                </thead>
    
                <tbody>
                    <tr v-for="approver in approvers">
                        <td class="align-middle"> {{ approver.order }} </td>
                        <td class="align-middle"> {{ approver.label }} </td>
                        <td class="align-middle"> {{ getFullname(approver.approver.firstname, approver.approver.middlename, approver.approver.lastname) }} </td>
                    </tr>
                </tbody>
    
            </table>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { getFullname } from '../../common';
    import { IDefaultApprover } from '../entities/purchasing.entity';


    defineProps<{
        approvers: IDefaultApprover[]
    }>()

</script>