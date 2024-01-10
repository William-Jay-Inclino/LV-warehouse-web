import { IITem, IITemDto } from "../../common/dto/IItem.dto"
import { IEmployee} from "../../common/entities"

export interface IFormData{
    id: string
    rc_number: string
    date_requested: string
    purpose: string
    notes: string
    requested_by: IEmployee | null
    noted_by: IEmployee | null
    items: IITem[]
}

export interface ICreateCanvassDto {
    rc_number: string
    date_requested: string
    purpose: string
    notes: string
    requested_by_id: string
    noted_by_id: string
    items: IITemDto[]
}

export interface IUpdateCanvassDto{
    // id: string
    date_requested?: string
    purpose?: string
    notes?: string
    requested_by_id?: string 
    noted_by_id?: string
    items?: IITemDto[]
}
