<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
            <h6 class="m-0 font-weight-bold"> Particulars </h6>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <th width="5%">No.</th>
                        <th width="30%">Description <span class="text-danger">*</span></th>
                        <th width="20%">Brand</th>
                        <th width="20%">Unit <span class="text-danger">*</span></th>
                        <th width="15%">Quantity <span class="text-danger">*</span></th>
                        <th width="10%" class="text-center">
                            <i class="fas fa-fw fa-cogs"></i>
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="item, i in items">
                            <td> {{ i + 1 }}. </td>
                            <td>
                                <input type="text" class="form-control" rows="3" v-model="item.description">
                                <small class="form-text text-danger" v-if="item.invalid.description"> {{ errorMsg }} </small>
                            </td>
                            <td>
                                <select class="form-control" v-model="item.brand">
                                    <option value="null">n/a</option>
                                    <option :value="i" :key="i.id" v-for="i in brands">
                                        {{ i.name }}
                                    </option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control" v-model="item.unit">
                                    <option :value="i" :key="i.id" v-for="i in units">
                                        {{ i.name }}
                                    </option>
                                </select>
                                <small class="form-text text-danger" v-if="item.invalid.unit"> {{ errorMsg }} </small>
                            </td>
                            <td>
                                <input type="number" class="form-control" v-model="item.quantity">
                                <small class="form-text text-danger" v-if="item.invalid.quantity"> {{ errorMsg }} </small>
                            </td>
                            <td class="text-center">
                                <button @click="onRemoveItem(i)" class="btn btn-light">
                                    <i class="fas fa-fw fa-trash text-danger"></i> 
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="6">
                                <button @click="onAddItem()" class="btn btn-secondary btn-sm">Add Item</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <div class="text-center text-danger" v-if="errorForm"> Particulars are required </div>
        </div>

    </div>

</template>


<script setup lang="ts">
import { IBrand, IUnit } from '../../common/entities';
import { ref } from 'vue';
import { IITem } from '../../common/dto/IItem.dto';


const emit = defineEmits(['add-item', 'remove-item'])

defineProps<{
    items: IITem[],
    errorForm: boolean,
    brands: IBrand[],
    units: IUnit[]
}>()

const errorMsg = ref('Invalid field')

const onRemoveItem = (indx: number) => emit('remove-item', indx)

const onAddItem = () => {
    const item = {} as IITem
    item.brand = null 
    item.description = ''
    item.quantity = 0
    item.unit = null
    item.invalid = {
        brand: false,
        description: false,
        unit: false,
        quantity: false
    }
    
    emit('add-item', item)
}


</script>