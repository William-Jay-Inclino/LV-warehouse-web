
import { defineStore } from 'pinia'
import { ICreateRVDto, IFormData, IUpdateRVDto } from './rv.dto'
import { computed, ref, watch } from 'vue'
import { IBrand, IRV, IEmployee, IUnit, APPROVAL_STATUS, ICreateApproverDto, ICanvass } from '../../common/entities'
import moment from 'moment'
import { getFullname, isValidDate, supervisorLabel } from '../../common'
import { rvService } from './rv.service'
import { IITem, IITemDto } from '../../common/dto/IItem.dto'
import { IDefaultApprover } from '../entities/purchasing.entity'

export const rvStore = defineStore('rv', () => {

    const _store = 'rvStore: '
    const today = moment().format('YYYY-MM-DD')

    const _formDataInitial: IFormData = {
        id: '',
        canvass: null,
        status: APPROVAL_STATUS.PENDING,
        rv_number: '',
        date_requested: today,
        requested_by: null,
        supervisor: null,
        work_order_no: '',
        work_order_date: '',
        purpose: '',
        notes: '',
        items: [],
        approvers: [],
    }

    const _formErrorsInitial = {
        rv_number: false,
        date_requested: false,
        requested_by: false,
        supervisor: false,
        purpose: false,
        items: false,
    }
    
    // state
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})
    const _items = ref<IRV[]>([])
    const _canvasses = ref<ICanvass[]>([])
    const _units = ref<IUnit[]>([])
    const _brands = ref<IBrand[]>([])
    const _employees = ref<IEmployee[]>([])
    const _defaultApprovers = ref<IDefaultApprover[]>([])

    // getters 
    const items = computed( () => {
        return _items.value.map((i) => ({
            ...i,
            date_requested: moment(Number(i.date_requested)).format('YYYY-MM-DD'),
            work_order_date: i.work_order_date ? moment(Number(i.date_requested)).format('YYYY-MM-DD') : '',
        }));
    })
    const units = computed( () => _units.value)
    const brands = computed( () => _brands.value)
    const canvasses = computed( () => _canvasses.value)
    const defaultApprovers = computed( () => _defaultApprovers.value)
    const employees = computed( () => {
        return _employees.value.map(obj => ({ ...obj, fullname: getFullname(obj.firstname, obj.middlename, obj.lastname) }))
    })

    const formIsEditMode = computed( (): boolean => !!formData.value.id)

    const formDataSupervisorId = computed( (): string => formData.value.supervisor ? formData.value.supervisor.id : '' )



    // watchers 

    watch(formDataSupervisorId, (val) => {

        console.log('=== watch: formDataSupervisorId ===', val)

        const indx = defaultApprovers.value.findIndex(i => i.order === 1)

        if(indx !== -1){
            defaultApprovers.value.splice(indx, 1)
        }

        if(!formData.value.supervisor) return 

        const x = {} as IDefaultApprover 
        x.approver = formData.value.supervisor
        x.label = supervisorLabel
        x.order = 1

        defaultApprovers.value.unshift(x)

    })



    // setters 

    const setUnits = (items: IUnit[]) => {
        console.log(_store + 'setUnits()', items)
        _units.value = items
    }

    const setBrands = (items: IBrand[]) => {
        console.log(_store + 'setBrands()', items)
        _brands.value = items
    }

    const setEmployees = (items: IEmployee[]) => {
        console.log(_store + 'setEmployees()', items)
        _employees.value = items
    }

    const setItems = (items: IRV[]) => {
        console.log(_store + 'setItems()', items)
        _items.value = items
    }

    const setCanvasses = (items: ICanvass[]) => {
        console.log(_store + 'setCanvasses()', items)
        _canvasses.value = items
    }

    const setDefaultApprovers = (items: IDefaultApprover[]) => {
        console.log(_store + 'setDefaultApprovers()', items)
        _defaultApprovers.value = items
    }

    const setFormData = (payload: {data: IRV}) => {
        console.log(_store + 'setFormData()', payload)

        const date_requested = moment(Number(payload.data.date_requested)).format('YYYY-MM-DD')
        const work_order_date = payload.data.work_order_date ? moment(Number(payload.data.date_requested)).format('YYYY-MM-DD') : ''
        const requested_by = payload.data.requested_by 
        const supervisor = payload.data.supervisor 

        requested_by!.fullname = getFullname(requested_by!.firstname, requested_by!.middlename, requested_by!.lastname)
        supervisor!.fullname = getFullname(supervisor!.firstname, supervisor!.middlename, supervisor!.lastname)

        const items = payload.data.rv_items.map(i => {
            const x = {} as IITem
            x.brand = i.item.brand
            x.description = i.item.description
            x.quantity = i.item.quantity
            x.unit = i.item.unit
            x.invalid = {
                brand: false,
                description: false,
                quantity: false,
                unit: false,
            }
            return x
        }) 

        const approvers = payload.data.rv_approvers.map(i => {
            i.approver.fullname = getFullname(i.approver.firstname, i.approver.middlename, i.approver.lastname)

            return i
        }) 

        formData.value = {
            rv_number: payload.data.rv_number,
            status: payload.data.status,
            canvass: payload.data.canvass,
            id: payload.data.id,
            date_requested: date_requested,
            requested_by: payload.data.requested_by,
            supervisor: supervisor,
            work_order_no: payload.data.work_order_no,
            work_order_date: work_order_date,
            purpose: payload.data.purpose,
            notes: payload.data.notes,
            items,
            approvers
        }
    }

    // // methods

    const init = async() => {
        const { rvs, employees, canvasses } = await rvService.findAll()
        setItems(rvs)
        setEmployees(employees)
        setCanvasses(canvasses)
    }

    const initForm = async(id?: string) => {
        const { rv_number, units, brands, employees, rv, default_approvers, canvasses } = await rvService.initForm(id)
        formData.value.rv_number = rv_number
        setBrands(brands)
        setUnits(units)
        setEmployees(employees)
        setDefaultApprovers(default_approvers)
        setCanvasses(canvasses)

        if(rv){
            setFormData({data: rv})
        }
    }

    const onSubmit = async(payload: { formData: IFormData }): Promise<{success: boolean, msg: string}> => {

        const { formData } = payload

        formErrors.value.rv_number = false
        formErrors.value.date_requested = false
        formErrors.value.requested_by = false
        formErrors.value.supervisor = false
        formErrors.value.purpose = false
        formErrors.value.items = false

        if(formData.rv_number.trim() === '' && !formIsEditMode.value){
            formErrors.value.rv_number = true
        }

        if(!(isValidDate(formData.date_requested))){
            formErrors.value.date_requested = true
        }

        if(formData.purpose.trim() === ''){
            formErrors.value.purpose = true
        }

        if(!formData.requested_by){
            formErrors.value.requested_by = true
        }

        if(!formData.supervisor){
            formErrors.value.supervisor = true
        }

        if(formData.items.length === 0){
            formErrors.value.items = true
        }

        const hasErrorDetails = Object.values(formErrors.value).includes(true);
        let hasErrorItems = false

        for(let item of formData.items){

            item.invalid.brand = false
            item.invalid.description= false
            item.invalid.unit = false
            item.invalid.quantity = false

            if(!item.unit){
                item.invalid.unit = true 
                hasErrorItems = true
            }
            if(item.description.trim() === ''){
                item.invalid.description = true 
                hasErrorItems = true
            }
            if(!item.quantity || item.quantity <= 0){
                item.invalid.quantity = true 
                hasErrorItems = true
            }
        }

        console.log('hasErrorDetails', hasErrorDetails)
        console.log('hasErrorItems', hasErrorItems)

        if(hasErrorDetails || hasErrorItems){
            return {
                success: false,
                msg: 'Failed to save RV. There are form errors!'
            }
        }

        if(formIsEditMode.value){

            const data = {} as IUpdateRVDto
            data.supervisor_id = formData.supervisor!.id
            // data.classification_id = formData
            data.date_requested = formData.date_requested
            data.work_order_no = formData.work_order_no
            data.work_order_date = formData.work_order_date
            data.purpose = formData.purpose
            data.notes = formData.notes
            data.requested_by_id = formData.requested_by?.id

            data.items = formData.items.map(i => {
                const x = {} as IITemDto
                x.brand_id = i.brand ? i.brand.id : null
                x.description = i.description
                x.quantity = i.quantity
                x.unit_id = i.unit!.id
                return x
            })

            return await onUpdate( {id: formData.id, data} )
        }else{
            const data = {} as ICreateRVDto
            data.canvass_id = formData.canvass!.id
            data.supervisor_id = formData.supervisor!.id
            data.rv_number = formData.rv_number
            data.date_requested = formData.date_requested
            data.work_order_no = formData.work_order_no
            data.work_order_date = formData.work_order_date ? formData.work_order_date : null
            data.purpose = formData.purpose
            data.notes = formData.notes
            data.status = formData.status
            data.requested_by_id = formData.requested_by!.id
            data.items = formData.items.map(i => {
                const x = {} as IITemDto
                x.brand_id = i.brand ? i.brand.id : null
                x.description = i.description
                x.quantity = i.quantity
                x.unit_id = i.unit!.id
                return x
            })

            data.approvers = defaultApprovers.value.map(i => {
                const x = {} as ICreateApproverDto 
                x.approver_id = i.approver.id
                x.label = i.label
                x.order = i.order
                x.status = APPROVAL_STATUS.PENDING

                return x
            })

            return await onCreate( {data} )
        }

    }

    const onCreate = async(payload: {data: ICreateRVDto}): Promise<{success: boolean, msg: string}> => {
        console.log(_store + 'onCreate()', payload)

        const created = await rvService.create(payload)
        console.log('created', created)
        if(created){
            console.log('Successfully created')
            _items.value.unshift(created)
            return {
                success: true,
                msg: 'RV successfully saved!'
            }
        }

        return {
            success: false,
            msg: 'Failed to save RV. Please refresh the page and try again'
        }
    }

    const onUpdate = async(payload: {id: string, data: IUpdateRVDto}): Promise<{success: boolean, msg: string}> => {
        console.log('store: onUpdate()', payload)
        
        const updated = await rvService.update(payload)

        if(updated){

            return {
                success: true,
                msg: 'RV successfully updated!'
            }
            
        }

        return {
            success: false,
            msg: 'Failed to update RV!'
        }

    }

    const onAddItem = (payload: {data: IITem}) => {
        console.log(_store + 'onAddItem()', payload)
        formData.value.items.push(payload.data)
    }

    const onRemoveItem = (payload: {indx: number}) => {
        console.log(_store + 'onAddItem()', payload)
        formData.value.items.splice(payload.indx, 1)
    }

    const onDelete = async(id: string): Promise<{success: boolean, msg: string}> => {
        console.log(_store + 'onDelete()', id)

        const indx = _items.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return {
                success: false,
                msg: 'RV not found'
            }
        }

        const res = await rvService.remove(id)

        if(res.success){
            _items.value.splice(indx, 1)
        }

        return res 

    }

    const resetFormData = () => {
        console.log(_store + 'resetForm()')
        formData.value = {..._formDataInitial}
        formData.value.items = []
        formErrors.value = {..._formErrorsInitial}
    }

    return {
        items,
        formData,
        formErrors,
        formIsEditMode,
        units,
        brands,
        employees,
        canvasses,
        defaultApprovers,
        onAddItem,
        onRemoveItem,
        setUnits,
        setBrands,
        setEmployees,
        setItems,
        onSubmit,
        onDelete,
        resetFormData,
        init,
        initForm,
    }
})



