import { IBrand, IJO, IMEQS, IRV, ISPR, ISupplier, IUnit } from "../../common/entities"
import { IDefaultApprover } from "../entities/purchasing.entity"


export interface IFormResponseData{
    meqs?: IMEQS | null
    units: IUnit[]
    brands: IBrand[]
    meqs_number: string
    default_approvers: IDefaultApprover[]
    rvs: IRV[]
    jos: IJO[]
    sprs: ISPR[]
    suppliers: ISupplier[]
}