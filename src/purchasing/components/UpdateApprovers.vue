<template>

    <div>
        <h6 class="m-0 font-weight-bold"> Approvers </h6>
        <div class="table-responsive mt-2">
                <table class="table table-bordered">
                    <thead class="bg-secondary text-white">
                        <th>Order</th>
                        <th>Position</th>
                        <th>Name</th>
                        <th class="text-center">Status</th>
                        <th>Notes</th>
                    </thead>

                    <tbody>
                        <tr v-for="approver in approvers">
                            <td class="align-middle"> {{ approver.order }} </td>
                            <td class="align-middle"> {{ approver.label }} </td>
                            <td class="align-middle"> {{ getFullname(approver.approver.firstname, approver.approver.middlename, approver.approver.lastname) }} </td>
                            <td class="text-center align-middle"> 
                                <div class="row">
                                    <div class="col">
                                        <span :class="{[`badge-${approvalStatus[approver.status].color}`]: true}" class="badge badge-pill text-white"> 
                                            {{ approvalStatus[approver.status].label }} 
                                        </span> 
                                    </div>
                                </div>
                                <div class="row" v-if="approver.date_approval">
                                    <div class="col">
                                        <small> <i> {{ moment(Number(approver.date_approval)).format('YYYY-MM-DD') }} </i> </small>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle">
                                <textarea class="form-control" rows="3" :value="approver.notes" readonly></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>

</template>

<script setup lang="ts">
    import { getFullname } from '../../common';
    import { IApprover } from '../entities/purchasing.entity';
    import { approvalStatus } from '../../common/constants'
    import moment from 'moment';


    defineProps<{
        approvers: IApprover[]
    }>()

</script>