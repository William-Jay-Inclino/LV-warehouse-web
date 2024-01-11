import { IITem, IITemDto } from "../../common/dto/IItem.dto"
import { APPROVAL_STATUS, ICanvass, ICreateApproverDto, IEmployee, IRVApprover } from "../../common/entities"

export interface IFormData{
    id: string
    status: APPROVAL_STATUS
    canvass: ICanvass | null
    rv_number: string
    date_requested: string
    requested_by: IEmployee | null
    supervisor: IEmployee | null
    work_order_no: string 
    work_order_date: string 
    purpose: string 
    notes: string 
    items: IITem[]
    approvers: IRVApprover[]
}

export interface ICreateRVDto {
    canvass_id: string 
    supervisor_id: string 
    rv_number: string 
    date_requested: string;
    work_order_no?: string | null;
    work_order_date?: string | null;
    purpose: string;
    notes?: string | null;
    status: APPROVAL_STATUS;
    requested_by_id: string;
    items: IITemDto[]
    approvers: ICreateApproverDto[]
}

export interface IUpdateRVDto{
    supervisor_id: string
    classification_id?: string;
    date_requested?: string;
    work_order_no?: string;
    work_order_date?: string;
    purpose?: string;
    notes?: string;
    requested_by_id?: string;
    status?: APPROVAL_STATUS;
    items?: IITemDto[]
}

