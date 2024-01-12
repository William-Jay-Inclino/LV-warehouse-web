import { IBrand, ICanvass, IEmployee, IRV, IUnit } from "../../common/entities"
import { IDefaultApprover } from "../entities/purchasing.entity"


export interface IFormResponseData{
    rv?: IRV | null
    units: IUnit[]
    brands: IBrand[]
    employees: IEmployee[]
    rv_number: string
    default_approvers: IDefaultApprover[]
    canvasses: ICanvass[]
}