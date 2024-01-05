
import { defineStore } from 'pinia'
import { IBrand, ICanvass, IClassification, IDepartment, IDivision, IEmployee, IJO, IJOApproverDefault, IMEQS, IMEQSApproverDefault, IPO, IPOApproverDefault, IRV, ISPR, ISPRApproverDefault, ISupplier, IUnit } from '../common/entities';
import { ref } from 'vue';
import * as mock from './data';

export const tempStore = defineStore('temp', () => {

    // state
    const suppliers = ref<ISupplier[]>(mock.suppliers)
    const departments = ref<IDepartment[]>(mock.departments)
    const divisions = ref<IDivision[]>(mock.divisions)
    const classifications = ref<IClassification[]>(mock.classifications)
    const units = ref<IUnit[]>(mock.units)
    const brands = ref<IBrand[]>(mock.brands)
    const employees = ref<IEmployee[]>(mock.employees)
    const canvasses = ref<ICanvass[]>(mock.canvasses)

    const RVs = ref<IRV[]>(mock.RVs)
    const JOs = ref<IJO[]>(mock.JOs)
    const SPRs = ref<ISPR[]>(mock.SPRs)
    const MEQSs = ref<IMEQS[]>(mock.MEQSs)
    const POs = ref<IPO[]>(mock.POs)
    // const POItems = ref<IPOItems[]>(mock.POItems)

    // const approvers = ref<IApprover[]>(mock.approvers)
    const joApprovers = ref<IJOApproverDefault[]>(mock.jo_default_approvers)
    const rvApprovers = ref<IPOApproverDefault[]>(mock.rv_default_approvers)
    const sprApprovers = ref<ISPRApproverDefault[]>(mock.spr_default_approvers)
    const meqsApprovers = ref<IMEQSApproverDefault[]>(mock.meqs_default_approvers)
    const poApprovers = ref<IPOApproverDefault[]>(mock.po_default_approvers)

    // const saveApprovers = (items: IApprover[]) => {
    //     items.forEach(i => approvers.value.push(i))
    // }

    const saveRv = (item: IRV) => {
        RVs.value.push(item)
    }

    const saveCanvass = (item: ICanvass) => {
        canvasses.value.push(item)
    }

    // const saveItems = (_items: IItem[]) => {
    //     _items.forEach(i => items.value.push(i))
    // }

    return {
        suppliers,
        departments,
        divisions,
        classifications,
        units,
        brands,
        employees,
        canvasses,
        // approvers,
        joApprovers,
        rvApprovers,
        sprApprovers,
        meqsApprovers,
        poApprovers,
        RVs,
        JOs,
        SPRs,
        MEQSs,
        POs,
        // POItems,
        // items,

        // saveApprovers,
        saveRv,
        saveCanvass,
        // saveItems,
    }
})



