<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
            <h6 class="m-0 font-weight-bold"> Approvers </h6>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">

                    <thead>
                        <th>Position</th>
                        <th>Name</th>
                        <th class="text-center">Status</th>
                        <th>Notes</th>
                    </thead>

                    <tbody>
                        <tr v-for="approver in approvers">
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
                                        <small> <i> {{ moment(approver.date_approval, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD hh:mm A') }} </i> </small>
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

    </div>

</template>

<script setup lang="ts">
    import { IJOApprover, IRVApprover, ISPRApprover, IMEQSApprover } from '../../common/entities';
    import { getFullname } from '../../common';
    import { approvalStatus } from '../../common/constants'
    import moment from 'moment';


    defineProps<{
        approvers: IJOApprover[] | IRVApprover[] | ISPRApprover[] | IMEQSApprover[] 
    }>()

</script>