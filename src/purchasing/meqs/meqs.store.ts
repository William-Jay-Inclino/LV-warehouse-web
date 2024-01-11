
import { defineStore } from 'pinia'
import { ICreateMEQSDto, IFormData, IUpdateMEQSDto } from './meqs.dto'
import { computed, ref } from 'vue'
import { IBrand, IRV, IUnit, APPROVAL_STATUS, ICreateApproverDto, IMEQS, ISupplier, ISPR, IJO, ISupplierItemDto, IEmployee } from '../../common/entities'
import moment from 'moment'
import { getFullname, isValidDate } from '../../common'
import { meqsService } from './meqs.service'
import { IITemWithSuppliersDto, IItemWithSupplier } from '../../common/dto/IItem.dto'
import { IDefaultApprover } from '../entities/purchasing.entity'

export const meqsStore = defineStore('meqs', () => {

    const _store = 'meqsStore: '
    const today = moment().format('YYYY-MM-DD')

    const _formDataInitial: IFormData = {
        id: '',
        jo: null,
        rv: null,
        spr: null,
        meqs_number: '',
        request_type: null,
        meqs_date: today,
        purpose: '',
        notes: '',
        status: APPROVAL_STATUS.PENDING,
        items: [],
        approvers: [],
    }

    const _formErrorsInitial = {
        rc_number: false,
        meqs_number: false,
        request_type: false,
        meqs_date: false,
        purpose: false,
        items: false,
    }
    
    // state
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})
    const _items = ref<IMEQS[]>([])
    const _rvs = ref<IRV[]>([])
    const _jos = ref<IJO[]>([])
    const _sprs = ref<ISPR[]>([])
    const _units = ref<IUnit[]>([])
    const _brands = ref<IBrand[]>([])
    const _suppliers = ref<ISupplier[]>([])
    const _defaultApprovers = ref<IDefaultApprover[]>([])
    const _employees = ref<IEmployee[]>([])

    // getters 
    const items = computed( () => {
        return _items.value.map((i) => ({
            ...i,
            meqs_date: moment(Number(i.meqs_date)).format('YYYY-MM-DD'),
        }));
    })
    const units = computed( () => _units.value)
    const brands = computed( () => _brands.value)
    const rvs = computed( () => _rvs.value)
    const jos = computed( () => _jos.value)
    const sprs = computed( () => _sprs.value)
    const employees = computed( () => {
        return _employees.value.map(obj => ({ ...obj, fullname: getFullname(obj.firstname, obj.middlename, obj.lastname) }))
    })
    const defaultApprovers = computed( () => _defaultApprovers.value)

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

    const setItems = (items: IMEQS[]) => {
        console.log(_store + 'setItems()', items)
        _items.value = items
    }

    const setSuppliers = (items: ISupplier[]) => {
        console.log(_store + 'setSuppliers()', items)
        _suppliers.value = items
    }

    const setRVs = (items: IRV[]) => {
        console.log(_store + 'setRVs()', items)
        _rvs.value = items
    }

    const setJOs = (items: IJO[]) => {
        console.log(_store + 'setJOs()', items)
        _jos.value = items
    }

    const setSPRs = (items: ISPR[]) => {
        console.log(_store + 'setSPRs()', items)
        _sprs.value = items
    }

    const setDefaultApprovers = (items: IDefaultApprover[]) => {
        console.log(_store + 'setDefaultApprovers()', items)
        _defaultApprovers.value = items
    }

    const setFormData = (payload: {data: IMEQS}) => {
        console.log(_store + 'setFormData()', payload)

        const { data } = payload

        const meqs_date = moment(Number(data.meqs_date)).format('YYYY-MM-DD')

        const items = data.meqs_items.map(i => {
            const x = {} as IItemWithSupplier
            x.brand = i.item.brand
            x.description = i.item.description
            x.quantity = i.item.quantity
            x.unit = i.item.unit
            
            x.invalid = {
                brand: false,
                description: false,
                quantity: false,
                unit: false,
                supplier_items: false 
            }

            if(i.item.supplier_items){
                x.supplier_items = i.item.supplier_items
            }else{
                i.item.supplier_items = []
            }


            return x
        }) 

        const approvers = data.meqs_approvers.map(i => {
            i.approver.fullname = getFullname(i.approver.firstname, i.approver.middlename, i.approver.lastname)
            return i
        }) 

        formData.value = {
            id: data.id,
            jo: data.jo || null,
            rv: data.rv || null,
            spr: data.spr || null,
            meqs_number: data.meqs_number,
            request_type: data.request_type,
            meqs_date: meqs_date,
            purpose: data.purpose,
            notes: data.notes,
            status: data.status,
            items,
            approvers
        }
    }

    // // methods

    const init = async() => {
        const { meqs, rvs, employees } = await meqsService.findAll()
        setItems(meqs)
        setRVs(rvs)
        setEmployees(employees)
    }

    const initForm = async(id?: string) => {
        const { meqs_number, brands, units, meqs, default_approvers, suppliers, rvs, jos, sprs } = await meqsService.initForm(id)
        formData.value.meqs_number = meqs_number
        setBrands(brands)
        setUnits(units)
        setDefaultApprovers(default_approvers)
        setSuppliers(suppliers)
        setRVs(rvs)
        setJOs(jos)
        setSPRs(sprs)

        if(meqs){
            setFormData({data: meqs})
        }
    }

    const onSubmit = async(payload: { formData: IFormData }): Promise<{success: boolean, msg: string}> => {

        const { formData } = payload

        formErrors.value.rc_number = false
        formErrors.value.meqs_number = false
        formErrors.value.request_type = false
        formErrors.value.meqs_date = false
        formErrors.value.purpose = false
        formErrors.value.items = false

        if(formData.meqs_number.trim() === '' && !formIsEditMode.value){
            formErrors.value.meqs_number = true
        }

        if(!formData.request_type){
            formErrors.value.request_type = true
        }

        if(!(isValidDate(formData.meqs_date))){
            formErrors.value.meqs_date = true
        }

        if(formData.purpose.trim() === ''){
            formErrors.value.purpose = true
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

            const data = {} as IUpdateMEQSDto
            data.meqs_date = formData.meqs_date
            data.purpose = formData.purpose
            data.notes = formData.notes

            data.items = formData.items.map(i => {
                const x = {} as IITemWithSuppliersDto
                x.brand_id = i.brand ? i.brand.id : null
                x.description = i.description
                x.quantity = i.quantity
                x.unit_id = i.unit!.id
                x.supplier_items = i.supplier_items.map(j => {
                    const y = {} as ISupplierItemDto
                    y.price = j.price
                    y.supplier_id = j.supplier.id 

                    return y
                })

                return x
            })

            return await onUpdate( {id: formData.id, data} )
        }else{
            const data = {} as ICreateMEQSDto
            data.jo_id = formData.jo ? formData.jo.id : undefined
            data.rv_id = formData.rv ? formData.rv.id : undefined
            data.spr_id = formData.spr ? formData.spr.id : undefined
            data.meqs_number = formData.meqs_number
            data.request_type = formData.request_type!
            data.meqs_date = formData.meqs_date
            data.purpose = formData.purpose
            data.notes = formData.notes
            data.status = formData.status

            data.items = formData.items.map(i => {
                const x = {} as IITemWithSuppliersDto
                x.brand_id = i.brand ? i.brand.id : null
                x.description = i.description
                x.quantity = i.quantity
                x.unit_id = i.unit!.id
                x.supplier_items = i.supplier_items.map(j => {
                    const y = {} as ISupplierItemDto
                    y.price = j.price
                    y.supplier_id = j.supplier.id 

                    return y
                })
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

    const onCreate = async(payload: {data: ICreateMEQSDto}): Promise<{success: boolean, msg: string}> => {
        console.log(_store + 'onCreate()', payload)

        const created = await meqsService.create(payload)
        console.log('created', created)
        if(created){
            console.log('Successfully created')
            _items.value.unshift(created)
            return {
                success: true,
                msg: 'MEQS successfully saved!'
            }
        }

        return {
            success: false,
            msg: 'Failed to save MEQS. Please refresh the page and try again'
        }
    }

    const onUpdate = async(payload: {id: string, data: IUpdateMEQSDto}): Promise<{success: boolean, msg: string}> => {
        console.log('store: onUpdate()', payload)
        
        const updated = await meqsService.update(payload)

        if(updated){

            return {
                success: true,
                msg: 'MEQS successfully updated!'
            }
            
        }

        return {
            success: false,
            msg: 'Failed to update MEQS!'
        }

    }

    const onAddItem = (payload: {data: IItemWithSupplier}) => {
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
                msg: 'MEQS not found'
            }
        }

        const res = await meqsService.remove(id)

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
        rvs,
        jos,
        sprs,
        defaultApprovers,
        employees,
        onAddItem,
        onRemoveItem,
        setUnits,
        setBrands,
        setItems,
        onSubmit,
        onDelete,
        resetFormData,
        init,
        initForm,
    }
})



