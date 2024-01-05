
import { defineStore } from 'pinia'
import { ICreateCanvassDto, IFormData, IUpdateCanvassDto } from './dto/canvass.dto'
import { computed, ref } from 'vue'
import { IBrand, ICanvass, IEmployee, IUnit } from '../common/entities'
import moment from 'moment'
import { getFullname } from '../common'
import { canvassService } from './canvass.service'
import { IITemDto } from '../common/dto/IItem.dto'

export const canvassStore = defineStore('canvass', () => {

    const _store = 'canvassStore: '
    const today = moment().format('YYYY-MM-DD')

    const _formDataInitial: IFormData = {
        id: '',
        date_requested: today,
        purpose: '',
        notes: '',
        requested_by: null,
        noted_by: null,
        items: [],
    }

    const _formErrorsInitial = {
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

    // onMounted( async() => {
    //     console.log(_store + 'onMounted()')
    //     const items = await bartService.findAll()
    //     setBarts(items)
    // })

    // getters 
    const items = computed( () => _items.value)
    const units = computed( () => _units.value)
    const brands = computed( () => _brands.value)
    const employees = computed( () => {
        return _employees.value.map(obj => ({ ...obj, label: getFullname(obj.firstname, obj.middlename, obj.lastname) }))
    })

    const formIsEditMode = computed( (): boolean => false)

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

    const setItems = (items: ICanvass[]) => {
        console.log(_store + 'setEmployees()', items)
        _items.value = items
    }

    const setFormData = (payload: {data: ICanvass}) => {
        console.log(_store + 'setFormData()', payload)

        const requested_by = payload.data.requested_by 
        const noted_by = payload.data.noted_by

        requested_by.label = getFullname(requested_by.firstname, requested_by.middlename, requested_by.lastname)
        noted_by.label = getFullname(noted_by.firstname, noted_by.middlename, noted_by.lastname)

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
            date_requested: payload.data.date_requested,
            purpose: payload.data.purpose,
            notes: payload.data.notes,
            requested_by: payload.data.requested_by,
            noted_by: payload.data.noted_by,
            items
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

    const onCreate = async(payload: {data: ICreateCanvassDto}): Promise<ICanvass | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await canvassService.create(payload)
        console.log('created', created)
        if(created){
            console.log('Successfully created')
            _items.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {data: IUpdateCanvassDto}): Promise<ICanvass | null> => {
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

        const deleted = await canvassService.remove(id)

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

    return {
        items,
        formData,
        formErrors,
        formIsEditMode,
        units,
        brands,
        employees,
        onCreate,
        onUpdate,
        onAddItem,
        onRemoveItem,
        setUnits,
        setBrands,
        setEmployees,
        setItems,
        // onSubmit,
        onDelete,
        resetFormData,
        // setFormData,
        initUpdateFormData,
    }
})



