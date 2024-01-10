
import { defineStore } from 'pinia'
import { ICreateCanvassDto, IFormData, IUpdateCanvassDto } from './dto/canvass.dto'
import { computed, ref } from 'vue'
import { IBrand, ICanvass, IEmployee, IUnit } from '../common/entities'
import moment from 'moment'
import { getFullname, isValidDate } from '../common'
import { canvassService } from './canvass.service'
import { IITem, IITemDto } from '../common/dto/IItem.dto'

export const canvassStore = defineStore('canvass', () => {

    const _store = 'canvassStore: '
    const today = moment().format('YYYY-MM-DD')

    const _formDataInitial: IFormData = {
        id: '',
        rc_number: '',
        date_requested: today,
        purpose: '',
        notes: '',
        requested_by: null,
        noted_by: null,
        items: [],
    }

    const _formErrorsInitial = {
        rc_number: false,
        date_requested: false,
        purpose: false,
        notes: false,
        requested_by: false,
        noted_by: false,
        items: false,
    }
    
    // state
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})
    const _items = ref<ICanvass[]>([])
    const _units = ref<IUnit[]>([])
    const _brands = ref<IBrand[]>([])
    const _employees = ref<IEmployee[]>([])

    // getters 
    const items = computed( () => {
        return _items.value.map((i) => ({
            ...i,
            date_requested: moment(Number(i.date_requested)).format('YYYY-MM-DD'),
        }));
    })
    const units = computed( () => _units.value)
    const brands = computed( () => _brands.value)
    const employees = computed( () => {
        return _employees.value.map(obj => ({ ...obj, fullname: getFullname(obj.firstname, obj.middlename, obj.lastname) }))
    })

    const formIsEditMode = computed( (): boolean => !!formData.value.id)

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

    const setItems = (items: ICanvass[]) => {
        console.log(_store + 'setItems()', items)
        _items.value = items
    }

    const setFormData = (payload: {data: ICanvass}) => {
        console.log(_store + 'setFormData()', payload)

        const date_requested = moment(Number(payload.data.date_requested)).format('YYYY-MM-DD')
        const requested_by = payload.data.requested_by 
        const noted_by = payload.data.noted_by

        requested_by.fullname = getFullname(requested_by.firstname, requested_by.middlename, requested_by.lastname)
        noted_by.fullname = getFullname(noted_by.firstname, noted_by.middlename, noted_by.lastname)

        const items = payload.data.canvass_items.map(i => {
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

        formData.value = {
            rc_number: payload.data.rc_number,
            id: payload.data.id,
            date_requested: date_requested,
            purpose: payload.data.purpose,
            notes: payload.data.notes,
            requested_by: payload.data.requested_by,
            noted_by: payload.data.noted_by,
            items
        }
    }

    // // methods

    const init = async() => {
        const { canvasses, employees } = await canvassService.findAll()
        setItems(canvasses)
        setEmployees(employees)
    }

    const initForm = async(id?: string) => {
        const { rc_number, units, brands, employees, canvass } = await canvassService.initForm(id)
        formData.value.rc_number = rc_number
        setBrands(brands)
        setUnits(units)
        setEmployees(employees)

        if(canvass){
            setFormData({data: canvass})
        }
    }

    const onSubmit = async(payload: { formData: IFormData }): Promise<{success: boolean, msg: string}> => {

        const { formData } = payload

        formErrors.value.rc_number = false
        formErrors.value.date_requested = false
        formErrors.value.purpose = false
        formErrors.value.notes = false
        formErrors.value.requested_by = false
        formErrors.value.noted_by = false
        formErrors.value.items = false

        if(formData.rc_number.trim() === '' && !formIsEditMode.value){
            formErrors.value.rc_number = true
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

        if(!formData.noted_by){
            formErrors.value.noted_by = true
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
                msg: 'Failed to save canvass. There are form errors!'
            }
        }

        if(formIsEditMode.value){

            const data = {} as IUpdateCanvassDto
            data.date_requested = formData.date_requested
            data.purpose = formData.purpose
            data.notes = formData.notes
            data.requested_by_id = formData.requested_by?.id
            data.noted_by_id = formData.noted_by?.id
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
            const data = {} as ICreateCanvassDto
            data.rc_number = formData.rc_number
            data.date_requested = formData.date_requested
            data.purpose = formData.purpose
            data.notes = formData.notes
            data.requested_by_id = formData.requested_by!.id
            data.noted_by_id = formData.noted_by!.id
            data.items = formData.items.map(i => {
                const x = {} as IITemDto
                x.brand_id = i.brand!.id
                x.description = i.description
                x.quantity = i.quantity
                x.unit_id = i.unit!.id
                return x
            })

            return await onCreate( {data} )
        }

    }

    const onCreate = async(payload: {data: ICreateCanvassDto}): Promise<{success: boolean, msg: string}> => {
        console.log(_store + 'onCreate()', payload)

        const created = await canvassService.create(payload)
        console.log('created', created)
        if(created){
            console.log('Successfully created')
            _items.value.unshift(created)
            return {
                success: true,
                msg: 'Canvass successfully saved!'
            }
        }

        return {
            success: false,
            msg: 'Failed to save Canvass!'
        }
    }

    const onUpdate = async(payload: {id: string, data: IUpdateCanvassDto}): Promise<{success: boolean, msg: string}> => {
        console.log('store: onUpdate()', payload)
        
        const updated = await canvassService.update(payload)

        if(updated){

            return {
                success: true,
                msg: 'Canvass successfully updated!'
            }
            
        }

        return {
            success: false,
            msg: 'Failed to update Canvass!'
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
                msg: 'Canvass not found'
            }
        }

        const res = await canvassService.remove(id)

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
        // onCreate,
        // onUpdate,
        onAddItem,
        onRemoveItem,
        setUnits,
        setBrands,
        setEmployees,
        setItems,
        onSubmit,
        onDelete,
        resetFormData,
        // setFormData,
        init,
        initForm,
        // initUpdateFormData,
    }
})



