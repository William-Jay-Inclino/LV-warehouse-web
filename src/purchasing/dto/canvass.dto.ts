import { IITemDto } from "../../common/dto/IItem.dto"
import { IEmployee} from "../../common/entities"

export interface IFormData{
    id: string
    date_requested: string
    purpose: string
    notes: string
    requested_by: IEmployee | null
    noted_by: IEmployee | null
    items: IITemDto[]
}

export interface ICreateCanvassDto {
    date_requested: string
    purpose: string
    notes: string
    requested_by: IEmployee | null
    noted_by: IEmployee | null
    items: IITemDto[]
}

export interface IUpdateCanvassDto{
    id: string
    date_requested?: Date
    purpose?: string
    notes?: string
    requested_by?: IEmployee | null
    noted_by?: IEmployee | null
}
