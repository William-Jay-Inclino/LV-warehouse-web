import { APPROVAL_STATUS, IEmployee } from "../../common/entities"

export interface ISearchRcNumber {
    rc_number: string 
}

export interface ISearchEmployee {
    id: string
    firstname: string 
    middlename: string 
    lastname: string 

    fullname: string
}

export interface IApprover { 
    approver: IEmployee
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface IDefaultApprover { 
    approver: IEmployee
    label: string 
    order: number
}