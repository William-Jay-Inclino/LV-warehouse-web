import { IBrand, ISupplierItem, IUnit } from "../entities"

export interface IITem {
    description: string
    brand_id: string
    brand: IBrand | null 
    unit_id: string
    unit: IUnit | null
    quantity: number 

    invalid: {
        description: boolean,
        brand: boolean,
        unit: boolean,
        quantity: boolean,
    }

}

export interface IItemWithSupplier {
    description: string
    brand_id: string
    brand: IBrand | null 
    unit_id: string
    unit: IUnit | null
    quantity: number 
    supplier_items: ISupplierItem[]

    invalid: {
        description: boolean,
        brand: boolean,
        unit: boolean,
        quantity: boolean,
        supplier_items: boolean
    }

}

export interface IITemDto {
    description: string
    brand_id: string | null
    unit_id: string
    quantity: number 
}

export interface IITemWithSuppliersDto {
    description: string
    brand_id: string
    unit_id: string
    quantity: number 
    supplier_items: ISupplierItem[]
}
