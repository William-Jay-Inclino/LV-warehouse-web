import { IBrand, ICanvass, IEmployee, IUnit } from "../../common/entities"


export interface IFormResponseData{
    canvass?: ICanvass | null
    units: IUnit[]
    brands: IBrand[]
    employees: IEmployee[]
    rc_number: string
}