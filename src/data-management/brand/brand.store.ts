
import { defineStore } from 'pinia'
import { IBrand } from '../../common/entities'
import { computed, ref } from 'vue';
import { BrandService } from './brand.service';
import { ICreateBrandDto, IUpdateBrandDto } from './dto/brand.dto';

export const brandStore = defineStore('brand', () => {

    const brandService = new BrandService()

    const _formDataInitial: IBrand = {
        id: '',
        name: '', 
    }

    const _formErrorsInitial = {
        name: false,
    }
    
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})

    // state
    const _brands = ref<IBrand[]>([])

    // getters 
    const brands = computed( () => _brands.value)

    const formIsEditMode = computed( (): boolean => {
        if(formData.value.id && formData.value.id.trim() !== ''){
            return true 
        }
        return false 
    })


    // setters 
    const setBrands = (items: IBrand[]) => {
        _brands.value = items
    }

    const setFormData = (payload: {data: IBrand}) => {
        formData.value = payload.data
    }

    // methods

    const init = async() => {
        setBrands(await brandService.findAll())
    }

    const initUpdateFormData = async(id: string) => {
        const itemFound = await brandService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onCreate = async(payload: {data: ICreateBrandDto}): Promise<IBrand | null> => {
        console.log('store: onCreate()', payload)

        const created = await brandService.create(payload.data)

        if(created){

            _brands.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: IUpdateBrandDto}): Promise<IBrand | null> => {
        console.log('store: onUpdate()', payload)

        const updated = await brandService.update(payload.id, payload.data)

        if(updated){

            const indx = _brands.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _brands.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log('store: onDelete()', id)

        const indx = _brands.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await brandService.remove(id)

        if(deleted){
            _brands.value.splice(indx, 1)
            return true
        }

        return false 

    }

    const resetFormData = () => {
        console.log('store: resetForm()')
        formData.value = {..._formDataInitial}
        formErrors.value = {..._formErrorsInitial}
    }

    return {
        brands,
        formData,
        formErrors,
        formIsEditMode,
        // onSubmit,
        init,
        onCreate,
        onUpdate,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})





// methods


