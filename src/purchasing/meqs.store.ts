

import { defineStore } from 'pinia'
import { ICreateMEQSDto, IFormData, IUpdateMEQSDto } from './dto/meqs.dto'
import { computed, ref } from 'vue'
import { APPROVAL_STATUS, IMEQSApprover, IBrand, ICanvass, IEmployee, IMEQS, IStatusObject, IUnit } from '../common/entities'
import moment from 'moment'
import { approvalStatus, convertMiddleNameToInitial } from '../common'
import { meqsService } from './meqs.service'
import { IITemDto } from '../common/dto/IItem.dto'

export const meqsStore = defineStore('meqs', () => {

    const _store = 'meqsStore: '
    const today = moment().format('YYYY-MM-DD')

    const _formDataInitial: IFormData = {
        id: '',
        jo: null,
        rv: null,
        spr: null,
        reference_type: null,
        meqs_date: today,
        meqs_number: '',
        items: [],
        approvers: [],
        purpose: '',
    }

    const _formErrorsInitial = {
        jo: false,
        rv: false,
        spr: false,
        reference_type: false,
        meqs_date: false,
        meqs_number: false,
        purpose: false,
    }
    
    // state
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})
    const _items = ref<IMEQS[]>([])
    const _units = ref<IUnit[]>([])
    const _brands = ref<IBrand[]>([])
    const _employees = ref<IEmployee[]>([])
    const _canvasses = ref<ICanvass[]>([])
    const _approvers = ref<IMEQSApprover[]>([])

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

    const setFormData = (payload: {data: IMEQS}) => {
        console.log(_store + 'setFormData()', payload)

        // const items = payload.data.items.map(i => {
        //     const x = {} as IITemDto
        //     x.brand = i.brand
        //     x.description = i.description
        //     x.id = i.id
        //     x.quantity = i.quantity
        //     x.unit = i.unit
        //     return x
        // }) 

        // formData.value = {
        //     id: payload.data.id,
        //     jo: payload.data.jo,
        //     rv: payload.data.rv,
        //     spr: payload.data.spr,
        //     reference_type: payload.data.reference_type,
        //     meqs_date: payload.data.meqs_date,
        //     meqs_number: payload.data.meqs_number,
        //     items: payload.data.items,
        //     approvers: payload.data.approvers,
        //     purpose: payload.data.purpose,
        // }
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

    const onCreate = async(payload: {data: ICreateMEQSDto}): Promise<IMEQS | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await meqsService.create(payload)
        console.log('created', created)
        if(created){
            console.log('Successfully created')
            _items.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {data: IUpdateMEQSDto}): Promise<IMEQS | null> => {
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

        const deleted = await meqsService.remove(id)

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

    const getStatus = (item: IMEQS): IStatusObject => {
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



