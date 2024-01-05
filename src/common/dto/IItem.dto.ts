import { IBrand, ISupplierItem, IUnit } from "../entities"


export interface IITemDto {
    id?: string
    description: string
    brand: IBrand | null
    unit: IUnit | null
    quantity: number 
    supplier_items?: ISupplierItem[]
}
