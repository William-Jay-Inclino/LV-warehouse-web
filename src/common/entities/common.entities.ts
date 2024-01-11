import { APPROVAL_STATUS, DEPARTMENT_STATUS, DIVISION_STATUS, EMPLOYEE_POSITION, REQUEST_TYPE } from "./common.enums";


// ============================= START DATA MANAGEMENT =============================

export interface ISupplier { 
    id: string 
    name: string 
    contact: string
}

export interface IDivision { 
    id: string
    code: string
    name: string
    status: DIVISION_STATUS
}

export interface IDepartment { 
    id: string
    division_id: string
    code: string
    name: string
    status: DEPARTMENT_STATUS
}

export interface IEmployee { 
    id: string 
    department_id: string
    firstname: string 
    middlename: string | null 
    lastname: string 
    position: EMPLOYEE_POSITION

    // fields that are set programmatically

    fullname?: string 
}

export interface IClassification { 
    id: string
    name: string
}

export interface IUnit { 
    id: string
    name: string
}

export interface IBrand { 
    id: string
    name: string
}

export interface IVehicle {
    id: string
    name: string 
    plate_number: string
}


// ============================= END DATA MANAGEMENT =============================








// ============================= START SETTINGS =============================

export interface IJOApproverDefault { 
    id: string 
    approver_id: string 
    approver: IEmployee
    label: string
    order: number
}

export interface IRVApproverDefault { 
    id: string 
    approver_id: string 
    approver: IEmployee
    label: string
    order: number
}

export interface ISPRApproverDefault { 
    id: string 
    approver_id: string 
    approver: IEmployee
    label: string
    order: number
}

export interface IMEQSApproverDefault { 
    id: string 
    approver_id: string 
    approver: IEmployee
    label: string
    order: number
}


export interface IPOApproverDefault { 
    id: string 
    approver_id: string 
    approver: IEmployee
    label: string
    order: number
}
// ============================= END SETTINGS =============================







// ============================= START PURCHASING =============================
export interface ICanvass {
    id: string
    rc_number: string
    date_requested: string
    purpose: string
    notes: string
    requested_by: IEmployee
    noted_by: IEmployee 
    canvass_items: ICanvassItem[]
    is_referenced: boolean
}

export interface IItem {
    id: string
    description: string
    brand_id: string | null
    brand: IBrand | null
    unit_id: string
    unit: IUnit 
    quantity: number 
    supplier_items?: ISupplierItem[]
}

export interface ICanvassItem {
    id: string 
    canvas_id: string 
    canvass: ICanvass
    item_id: string 
    item: IItem
}

export interface ISupplierItem {
    item: IItem
    supplier: ISupplier
    price: number
}

export interface ISupplierItemDto {
    supplier_id: string 
    price: number
}

export interface IJO {
    id: string
    canvass_id: string
    canvass: ICanvass
    supervisor_id: string 
    supervisor: IEmployee
    classification_id?: string
    classification: IClassification | null
    jo_number: string
    date_requested: string
    equipment: string
    department_id: string,
    department: IDepartment,
    items: IJOItem[]
    approvers: IJOApprover[]
    is_cancelled: boolean
    purpose: string
    notes: string

    // fields that are set programmatically

    statusObj: IStatusObject
}

export interface IJOItem {
    id: string 
    item_id: string 
    item: IItem
}

export interface IJOApprover { 
    id: string 
    approver_id: string 
    approver: IEmployee
    jo_id: string 
    jo: IJO
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface IRV {
    id: string
    canvass_id: string
    canvass: ICanvass
    supervisor_id: string 
    supervisor: IEmployee
    classification_id?: string
    classification: IClassification | null
    rv_number: string
    date_requested: string
    work_order_no: string 
    work_order_date: string 
    rv_items: IRVItem[]
    rv_approvers: IRVApprover[]
    purpose: string
    notes: string
    status: APPROVAL_STATUS
    canceller_id: string | null
    canceller: IEmployee | null
    requested_by_id: string | null
    requested_by: IEmployee | null
    is_referenced: boolean

    // fields that are set programmatically

    statusObj: IStatusObject
}

export interface IRVItem {
    id: string 
    item_id: string 
    item: IItem
}

export interface IRVApprover { 
    id: string 
    approver: IEmployee
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface ICreateApproverDto { 
    approver_id: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface ISPR {
    id: string
    canvass_id: string
    canvass: ICanvass
    supervisor_id: string 
    supervisor: IEmployee
    classification_id?: string
    classification: IClassification | null
    spr_number: string
    date_requested: string
    vehicle_id: string
    vehicle: IVehicle
    items: ISPRItem[]
    approvers: ISPRApprover[]
    is_cancelled: boolean
    purpose: string
    notes: string

    // fields that are set programmatically

    statusObj: IStatusObject
}

export interface ISPRItem {
    id: string 
    item_id: string 
    item: IItem
}

export interface ISPRApprover { 
    id: string 
    approver_id: string 
    approver: IEmployee
    spr_id: string 
    spr: ISPR
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface IMEQS {
    id: string
    jo_id: string | null 
    jo: IJO | null
    rv_id: string | null
    rv: IRV | null
    spr_id: string | null 
    spr: ISPR | null
    meqs_number: string 
    request_type: REQUEST_TYPE
    meqs_date: string
    purpose: string
    notes: string
    status: APPROVAL_STATUS
    canceller_id: string | null 
    canceller: IEmployee | null
    meqs_approvers: IMEQSApprover[]
    meqs_items: IMEQSItem[]
    pos?: IPO[]
}

export interface IMEQSItem {
    id: string 
    item_id: string 
    item: IItem
}

export interface IMEQSApprover { 
    id: string 
    approver_id: string 
    approver: IEmployee
    meqs_id: string 
    meqs: IMEQS
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface IPO {
    id: string 
    po_number: string 
    meqs_id: string
    meqs: IMEQS  
    supplier_id: string 
    supplier: ISupplier 
    po_date: string 
    payment_terms: string 
}

export interface IStatusObject {
    value: APPROVAL_STATUS | string,
    label: string,
    color: string,
}

