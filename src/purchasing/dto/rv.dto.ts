import { IITemDto } from "../../common/dto/IItem.dto"
import { ICanvass, IEmployee, IRVApprover } from "../../common/entities"

export interface IFormData{
    id?: string
    rc_no: string
    canvass: ICanvass | null
    supervisor: IEmployee | null
    date_requested: string
    work_order_no: string 
    work_order_date: string 
    items: IITemDto[]
    approvers: IRVApprover[]
    purpose: string 
    notes: string 
}

export interface ICreateRVDto {
    canvass: ICanvass
    date_requested: string
    work_order_no: string 
    work_order_date: string 
    supervisor: IEmployee
    items: IITemDto[]
    purpose: string 
    notes: string
}

export interface IUpdateRVDto{
    id: string
    date_requested?: string
    work_order_no?: string 
    work_order_date?: string 
}

