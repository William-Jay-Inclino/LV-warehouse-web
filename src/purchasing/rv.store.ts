
import { defineStore } from 'pinia'
import { ICreateRVDto, IFormData, IUpdateRVDto } from './dto/rv.dto'
import { computed, ref } from 'vue'
import { APPROVAL_STATUS, IBrand, ICanvass, IEmployee, IRV, IRVApprover, IStatusObject, IUnit } from '../common/entities'
import moment from 'moment'
import { approvalStatus, convertMiddleNameToInitial } from '../common'
import { rVService } from './rv.service'
import { IITemDto } from '../common/dto/IItem.dto'

export const rvStore = defineStore('rv', () => {

    const _store = 'rvStore: '
    const today = moment().format('YYYY-MM-DD')

    const _formDataInitial: IFormData = {
        id: '',
        rc_no: '',
        canvass: null,
        supervisor: null,
        date_requested: today,
        work_order_no: '',
        work_order_date: '',
        items: [],
        approvers: [],
        purpose: '',
        notes: '',
    }

    const _formErrorsInitial = {
        canvass: false,
        date_requested: false,
        work_order_no: false,
        work_order_date: false,
        items: false,
    }
    
    // state
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})
    const _items = ref<IRV[]>([])
    const _units = ref<IUnit[]>([])
    const _brands = ref<IBrand[]>([])
    const _employees = ref<IEmployee[]>([])
    const _canvasses = ref<ICanvass[]>([])
    const _approvers = ref<IRVApprover[]>([])

    // getters 
    const items = computed( () => {
        return _items.value.map(i => ({...i, statusObj: getStatus(i)}))
    })
    const units = computed( () => _units.value)
    const brands = computed( () => _brands.value)
    const approvers = computed( () => _approvers.value)
    const canvasses = computed( () => _canvasses.value.map(obj => ({...obj, label: obj.rc_number })))



    const employees = computed( () => {
        return _employees.value.map(obj => {
            let label = ''

            if(obj.middlename){
                label = `${obj.lastname}, ${obj.firstname} ${convertMiddleNameToInitial(obj.middlename)}`
            }else{
                label = `${obj.lastname}, ${obj.firstname}`
            }

            return { ...obj, label }
        })
    })

    const formIsEditMode = computed( (): boolean => {
        if(formData.value.id && formData.value.id.trim() !== ''){
            return true 
        }
        return false 
    })

    // setters 

    const setUnits = (items: IUnit[]) => {
        console.log(_store + 'setUnits()', items)
        _units.value = items
    }

    const setBrands = (items: IUnit[]) => {
        console.log(_store + 'setBrands()', items)
        _brands.value = items
    }

    const setEmployees = (items: IEmployee[]) => {
        console.log(_store + 'setEmployees()', items)
        _employees.value = items
    }

    const setCanvasses = (items: ICanvass[]) => {
        console.log(_store + 'setCanvasses()', items)
        _canvasses.value = items
    }

    // const setApprovers = (items: IRVApproverDefault[]) => {
    //     console.log(_store + 'setApprovers()', items)

    //     const rvApprovers = [] 
        
    //     for(let item of items){
    //         const i = {} as IApprover
    //         i.approver = item.approver 
    //         i.approver_id = item.approver_id
    //         i.date_approval = ''
    //         i.id = ''
    //         i.label = item.label
    //         i.notes = ''
    //         i.order = item.order
    //         i.status = APPROVAL_STATUS.PENDING

    //         rvApprovers.push(i)
    //     }

    //     _approvers.value = rvApprovers
    // }

    const setFormData = (payload: {data: IRV}) => {
        console.log(_store + 'setFormData()', payload)

        const items = payload.data.items.map(i => {
            const x = {} as IITemDto
            x.brand = i.item.brand
            x.description = i.item.description
            x.id = i.id
            x.quantity = i.item.quantity
            x.unit = i.item.unit
            return x
        }) 

        formData.value = {
            id: payload.data.id,
            rc_no: payload.data.canvass.rc_number,
            canvass: payload.data.canvass,
            date_requested: payload.data.date_requested,
            work_order_no: payload.data.work_order_no,
            work_order_date: payload.data.work_order_date,
            supervisor: payload.data.supervisor,
            items: items,
            approvers: payload.data.approvers,
            purpose: payload.data.purpose,
            notes: payload.data.notes,
        }
    }

    // // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        // const itemFound = await bartService.findOne(id)
        const itemFound = _items.value.find(i => i.id === id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onCreate = async(payload: {data: ICreateRVDto}): Promise<IRV | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await rVService.create(payload)
        console.log('created', created)
        if(created){
            console.log('Successfully created')
            _items.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {data: IUpdateRVDto}): Promise<IRV | null> => {
        console.log(_store + 'onUpdate()', payload)
        return null

    }

    const onAddItem = (payload: {data: IITemDto}) => {
        console.log(_store + 'onAddItem()', payload)
        formData.value.items.push(payload.data)
    }

    const onRemoveItem = (payload: {indx: number}) => {
        console.log(_store + 'onAddItem()', payload)
        formData.value.items.splice(payload.indx, 1)
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _items.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await rVService.remove(id)

        if(deleted){
            _items.value.splice(indx, 1)
            return true
        }

        return false 

    }

    const resetFormData = () => {
        console.log(_store + 'resetForm()')
        formData.value = {..._formDataInitial}
        formData.value.items = []
        formErrors.value = {..._formErrorsInitial}
    }


    /* 
        1. check if rv is cancelled
        2. check if there is an approver who disapproves
        3. Check if there is still an approver who is pending 
        4. Else all approver approves
    */

    const getStatus = (item: IRV): IStatusObject => {
        console.log('getStatus()', item)
    
        if(item.is_cancelled){
            return approvalStatus["cancelled"]
        }
    
        const hasDisapproved = item.approvers.find(i => i.status === APPROVAL_STATUS.DISAPPROVED)
    
        if(hasDisapproved){
            return approvalStatus[APPROVAL_STATUS.DISAPPROVED]
        }
    
        const hasPending = item.approvers.find(i => i.status === APPROVAL_STATUS.PENDING)
    
        if(hasPending){
            return approvalStatus[APPROVAL_STATUS.PENDING]
        }
    
        return approvalStatus[APPROVAL_STATUS.APPROVED]
    
    }

    return {
        _items,
        items,
        formData,
        formErrors,
        formIsEditMode,
        units,
        brands,
        employees,
        canvasses,
        approvers,
        onCreate,
        onUpdate,
        onAddItem,
        onRemoveItem,
        setUnits,
        setBrands,
        setEmployees,
        setCanvasses,
        // onSubmit,
        onDelete,
        resetFormData,
        // setFormData,
        initUpdateFormData,
    }
})



