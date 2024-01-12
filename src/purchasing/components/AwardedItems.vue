<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
            <h6 class="m-0 font-weight-bold"> Award to which supplier the item will be purchased and refer to the items above </h6>

            <a href="javascript:void(0)" class="text-decoration-none" @click="$meqs.flags.isExpandedFormAwards = !$meqs.flags.isExpandedFormAwards">
                <i 
                    :class="{'fa-angle-down': !$meqs.flags.isExpandedFormAwards, 'fa-angle-up': $meqs.flags.isExpandedFormAwards}"
                    class="fas fa-fw fa-2x pointer text-light"
                ></i>
            </a>
        </div>

        <div class="card-body" v-show="$meqs.flags.isExpandedFormAwards">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <th>No.</th>
                        <th>Description</th>
                        <th>Awarded Supplier</th>
                        <th>Notes</th>
                    </thead>
                    <tbody>
                        <tr v-for="item, i in items">
                            <td class="align-middle"> {{ i + 1 }} </td>
                            <td class="align-middle"> {{ item.description }} </td>
                            <td class="align-middle">
                                <template v-for="itemSupplier in item.supplier_items">
                                    <select @change="updateSupplier(item, itemSupplier)" class="form-control" v-if="itemSupplier.is_awarded">
                                        <option :value="i" :key="i.id" v-for="i in formSuppliers" :selected="i.id === itemSupplier.supplier.id">
                                            {{ i.name }}
                                        </option>
                                    </select>
                                </template>
                            </td>
                            <td>
                                <textarea class="form-control" rows="3"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">

    import { IItemWithSupplier } from '../../common/dto/IItem.dto';
    import { ISupplier, ISupplierItem } from '../../common/entities';
    import { meqsStore } from '../meqs/meqs.store';


    defineProps<{
        items: IItemWithSupplier[],
        formSuppliers: ISupplier[]
    }>()

    const $meqs = meqsStore()

    const updateSupplier = (item: IItemWithSupplier, itemSupplier: ISupplierItem) => {

        item.supplier_items.forEach(i => {
            i.is_awarded = false 
        })

        itemSupplier.is_awarded = true
    }

</script>