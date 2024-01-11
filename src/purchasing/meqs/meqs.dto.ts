import { IITemWithSuppliersDto, IItemWithSupplier } from "../../common/dto/IItem.dto"
import { APPROVAL_STATUS, ICreateApproverDto, IJO, IMEQSApprover, IRV, ISPR, REQUEST_TYPE } from "../../common/entities"

export interface IFormData{
    id: string
    jo: IJO | null 
    rv: IRV | null 
    spr: ISPR | null 
    meqs_number: string 
    request_type: REQUEST_TYPE | null
    meqs_date: string 
    purpose: string 
    notes: string  
    status: APPROVAL_STATUS
    items: IItemWithSupplier[]
    approvers: IMEQSApprover[]
}

export interface ICreateMEQSDto {
    jo_id?: string 
    rv_id?: string 
    spr_id?: string
    meqs_number: string 
    request_type: REQUEST_TYPE
    meqs_date: string 
    purpose: string 
    notes: string  
    status: APPROVAL_STATUS
    items: IITemWithSuppliersDto[]
    approvers: ICreateApproverDto[]
}

export interface IUpdateMEQSDto{
    meqs_date: string 
    purpose: string 
    notes: string 

    items: IITemWithSuppliersDto[]
}

