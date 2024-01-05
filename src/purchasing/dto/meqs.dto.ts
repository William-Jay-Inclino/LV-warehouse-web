import { IITemDto } from "../../common/dto/IItem.dto"
import { IJO, IMEQSApprover, IRV, ISPR, REQUEST_TYPES } from "../../common/entities"

export interface IFormData{
    id?: string
    jo?: IJO | null
    rv?: IRV | null
    spr?: ISPR | null
    reference_type: REQUEST_TYPES | null
    meqs_date: string 
    meqs_number: string
    purpose: string
    items: IITemDto[]
    approvers: IMEQSApprover[]
}

export interface ICreateMEQSDto {
    jo?: IJO
    rv?: IRV
    spr?: ISPR
    reference_type: REQUEST_TYPES 
    meqs_date: string 
    purpose: string
    items: IITemDto[]
}

export interface IUpdateMEQSDto{
    id: string
    jo?: IJO
    rv?: IRV
    spr?: ISPR
    reference_type?: REQUEST_TYPES 
    meqs_date?: string 
    purpose?: string
}

