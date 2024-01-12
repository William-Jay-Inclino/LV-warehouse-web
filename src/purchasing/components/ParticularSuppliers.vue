<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
            <h6 class="m-0 font-weight-bold"> Particulars and Unit Cost Per Item</h6>
            <a href="javascript:void(0)" class="text-decoration-none" @click="$meqs.flags.isExpandedFormParticulars = !$meqs.flags.isExpandedFormParticulars">
                <i 
                    :class="{'fa-angle-down': !$meqs.flags.isExpandedFormParticulars, 'fa-angle-up': $meqs.flags.isExpandedFormParticulars}"
                    class="fas fa-fw fa-2x pointer text-light"
                ></i>
            </a>
        </div>

        <div class="card-body" v-show="$meqs.flags.isExpandedFormParticulars">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <th>No.</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th v-for="supplier in formSuppliers">
                            {{ supplier.name }}
                        </th>
                        <th class="text-center">
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
                                <select class="form-control" v-model="item.brand" style="width: 150px;">
                                    <option value="null">n/a</option>
                                    <option :value="i" :key="i.id" v-for="i in brands">
                                        {{ i.name }}
                                    </option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control" v-model="item.unit" style="width: 150px;">
                                    <option :value="i" :key="i.id" v-for="i in units">
                                        {{ i.name }}
                                    </option>
                                </select>
                                <small class="form-text text-danger" v-if="item.invalid.unit"> {{ errorMsg }} </small>
                            </td>
                            <td>
                                <input type="number" class="form-control" v-model="item.quantity" style="width: 60px;">
                                <small class="form-text text-danger" v-if="item.invalid.quantity"> {{ errorMsg }} </small>
                            </td>
                            <td v-for="itemSupplier in item.supplier_items">
                                <div class="input-group mb-3" style="width: 150px;">
                                    <input type="text" class="form-control" v-model="itemSupplier.price">
                                    <div class="input-group-append">
                                        <button @click="onClickStar(itemSupplier, item)" class="btn btn-sm">
                                            <i class="fas fa-fw fa-star" :class="{'text-warning': itemSupplier.is_awarded}"></i>
                                        </button>
                                        <!-- <span class="input-group-text" id="basic-addon1">@</span> -->
                                    </div>
                                </div>
                            </td>
                            <td class="text-center">
                                <button @click="onRemoveItem(i)" class="btn btn-light">
                                    <i class="fas fa-fw fa-trash text-danger"></i> 
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer text-center" v-show="$meqs.flags.isExpandedFormParticulars">
            <button @click="onAddItem()" class="btn btn-secondary btn-sm">Add Item</button>
            <button @click="onAddSupplier()" class="btn btn-secondary btn-sm ml-3">Add Supplier</button>
            <div class="text-danger" v-if="errorForm"> Particulars are required </div>
        </div>

    </div>

</template>


<script setup lang="ts">
import { IBrand, ISupplier, ISupplierItem, IUnit } from '../../common/entities';
import { computed, ref } from 'vue';
import { IITem, IItemWithSupplier } from '../../common/dto/IItem.dto';
import Swal from 'sweetalert2';
import { meqsStore } from '../meqs/meqs.store';
import 'animate.css';

const emit = defineEmits(['add-item', 'remove-item', 'add-supplier'])

const props = defineProps<{
    items: IItemWithSupplier[],
    errorForm: boolean,
    brands: IBrand[],
    units: IUnit[],
    suppliers: ISupplier[],
    formSuppliers: ISupplier[]
}>()

const $meqs = meqsStore()

const errorMsg = ref('Invalid field')

const supplierOptions = computed(() =>
  props.suppliers.reduce((options, supplier) => {
    options[supplier.id] = `${supplier.name}`;
    return options;
  }, {} as { [key: string]: string })
);


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

const onAddSupplier = () => {
    Swal.fire({
        title: 'Add Supplier',
        icon: "info",
        input: 'select',
        inputOptions: supplierOptions.value,
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false,
        reverseButtons: true,
        confirmButtonColor: "#1cc88a",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
            `
        },
        preConfirm: (selectedSupplierId) => {
        if (!selectedSupplierId) {
            Swal.showValidationMessage('Please select a supplier');
        }
        return selectedSupplierId;
        }
    }).then((result: any) => {
        if (result.isConfirmed) {
            const selectedSupplierId = result.value;
            console.log('You selected supplier ID: ' + selectedSupplierId);

            const supplier = props.suppliers.find(i => i.id === selectedSupplierId)

            if(!supplier){
                console.error('supplier not found with id of ', selectedSupplierId)
            }

            emit('add-supplier', {...supplier})

        }
    });
};

const onClickStar = (supplierItem: ISupplierItem, item: IItemWithSupplier) => {

    item.supplier_items.forEach(i => {
        i.is_awarded = false 
    })

    supplierItem.is_awarded = true

}

</script>