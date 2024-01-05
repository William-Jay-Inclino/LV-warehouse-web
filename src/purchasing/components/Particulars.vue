<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
            <h6 class="m-0 font-weight-bold"> Particulars </h6>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <th width="10%">No.</th>
                        <th width="30%">Description</th>
                        <th width="20%">Brand</th>
                        <th width="20%">Unit</th>
                        <th width="10%">Quantity</th>
                        <th width="10%" class="text-center">
                            <i class="fas fa-fw fa-cogs"></i>
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="item, i in items">
                            <td> {{ i + 1 }}. </td>
                            <td>
                                <input type="text" class="form-control" rows="3" v-model="item.description">
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
                            </td>
                            <td>
                                <input type="number" class="form-control" v-model="item.quantity">
                            </td>
                            <td class="text-center">
                                <button @click="onRemoveItem(i)" class="btn btn-light">
                                    <i class="fas fa-fw fa-trash text-danger"></i> 
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="6">
                                <button @click="onAddItem()" class="btn btn-secondary btn-sm">Add Particular</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">
import * as mock from '../../__temp__/data'
import { IBrand, IUnit } from '../../common/entities';
import { ref } from 'vue';
import { IITemDto } from '../../common/dto/IItem.dto';


const emit = defineEmits(['add-item', 'remove-item'])

const brands = ref<IBrand[]>(mock.brands)
const units = ref<IUnit[]>(mock.units)

defineProps<{
    items: IITemDto[],
}>()

const onRemoveItem = (indx: number) => emit('remove-item', indx)

const onAddItem = () => {
    const item = {} as IITemDto
    item.brand = null 
    item.description = ''
    item.quantity = 0
    item.unit = null
    
    emit('add-item', item)
}


</script>