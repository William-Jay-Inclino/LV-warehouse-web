import { faker } from '@faker-js/faker';
import { DEPARTMENT_STATUS, DIVISION_STATUS, EMPLOYEE_POSITION, IBrand, ICanvass, ICanvassItem, IClassification, IDepartment, IDivision, IEmployee, IJO, IJOApprover, IJOApproverDefault, IMEQS, IMEQSApproverDefault, IPO, IPOApproverDefault, IRV, IRVApproverDefault, ISPR, ISPRApproverDefault, ISupplier, IUnit } from '../common/entities';

export const suppliers: ISupplier[] = [
    { 
        id: faker.string.uuid(),
        name: 'Robinson',
        contact: '+639000000000',
    },
    { 
        id: faker.string.uuid(),
        name: 'SM',
        contact: '+639000000000',
    },
    { 
        id: faker.string.uuid(),
        name: 'Puregold',
        contact: '+639000000000',
    }
]

const divId1 = faker.string.uuid()
const divId2 = faker.string.uuid()
const divId3 = faker.string.uuid()

export const divisions: IDivision[] = [

    {
        id: divId1,
        code: 'CICTE',
        name: 'College of Information and Communications Technology and Engineering',
        status: DIVISION_STATUS.ACTIVE
    },
    {
        id: divId2,
        code: 'NAHS',
        name: 'Nursing & Allied Health Sciences',
        status: DIVISION_STATUS.ACTIVE
    },
    {
        id: divId3,
        code: 'AB',
        name: 'Accountancy and Business',
        status: DIVISION_STATUS.ACTIVE
    }
]

const depId1 = faker.string.uuid()
const depId2 = faker.string.uuid()
const depId3 = faker.string.uuid()
const depId4 = faker.string.uuid()
const depId5 = faker.string.uuid()
const depId6 = faker.string.uuid()

export const departments: IDepartment[] = [
    {
        id: depId1,
        division_id: divId1,
        code: 'BSIT',
        name: 'Bachelor of Science in Information Technology',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId2,
        division_id: divId1,
        code: 'BSCS',
        name: 'Bachelor of Science in Computer Science',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId3,
        division_id: divId2,
        code: 'BSN',
        name: 'Bachelor of Science in Nursing',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId4,
        division_id: divId2,
        code: 'Midwifery',
        name: '2-Year Diploma in Midwifery',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId5,
        division_id: divId3,
        code: 'BSA',
        name: 'Bachelor of Science in Accountancy',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId6,
        division_id: divId3,
        code: 'BSBA',
        name: 'Bachelor of Science in Business Administration',
        status: DEPARTMENT_STATUS.ACTIVE
    }
]

export const classifications: IClassification[] = [
    {
        id: faker.string.uuid(),
        name: 'Classification 1'
    },
    {
        id: faker.string.uuid(),
        name: 'Classification 2'
    },
    {
        id: faker.string.uuid(),
        name: 'Classification 3'
    }
]

export const units: IUnit[] = [
    {
        id: faker.string.uuid(),
        name: 'Pieces'
    },
    {
        id: faker.string.uuid(),
        name: 'Cartons'
    },
    {
        id: faker.string.uuid(),
        name: 'Pallets'
    }
]

export const brands: IBrand[] = [
    {
        id: faker.string.uuid(),
        name: 'Brand X'
    },
    {
        id: faker.string.uuid(),
        name: 'Brand Y'
    },
    {
        id: faker.string.uuid(),
        name: 'Brand Z'
    } 
]

export const employees: IEmployee[] = [
    // Imd. Sup. = 0
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Ana Maria',
        middlename: 'Lourdes',
        lastname: 'Pastor',
        position: EMPLOYEE_POSITION.CETD,
    },
    // Budget Officer = 1
    {
        id: faker.string.uuid(),
        department_id: depId2,
        firstname: 'Suan',
        middlename: null,
        lastname: 'Ricaflor',
        position: EMPLOYEE_POSITION.BUDGET_OFFICER,
    },
    // AUDIT = 2
    {
        id: faker.string.uuid(),
        department_id: depId2,
        firstname: 'Marlon',
        middlename: null,
        lastname: 'Sanico',
        position: EMPLOYEE_POSITION.AUDIT,
    },
    // GM / OIC = 3
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Jannie Ann',
        middlename: null,
        lastname: 'Dayandayan',
        position: EMPLOYEE_POSITION.GM,
    },
    // 1st CPC Member = 4
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Jhun Rey',
        middlename: null,
        lastname: 'Nahine',
        position: EMPLOYEE_POSITION.CPC_MEMBER,
    },
    // 2nd CPC Member = 5
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Gretchen',
        middlename: null,
        lastname: 'Tagalog',
        position: EMPLOYEE_POSITION.CPC_MEMBER,
    },
    // Witness = 6
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Dionic',
        middlename: null,
        lastname: 'De La Pena',
        position: EMPLOYEE_POSITION.AUDIT,
    },
    // CPC Chairman = 7
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Anthony',
        middlename: null,
        lastname: 'Cecilio',
        position: EMPLOYEE_POSITION.CPC_MEMBER,
    },
    // Finance Manager = 8
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Frances Paula',
        middlename: null,
        lastname: 'Lumacang',
        position: EMPLOYEE_POSITION.FINANCE,
    },
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'William Jay',
        middlename: 'Intales',
        lastname: 'Inclino',
        position: EMPLOYEE_POSITION.ADMIN,
    },
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Joshua',
        middlename: 'X',
        lastname: 'Tayag',
        position: EMPLOYEE_POSITION.IT,
    },
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Jessa',
        middlename: 'X',
        lastname: 'Pelones',
        position: EMPLOYEE_POSITION.IT,
    },
    {
        id: faker.string.uuid(),
        department_id: depId2,
        firstname: 'Joseph Ken',
        middlename: 'X',
        lastname: 'Estrera',
        position: EMPLOYEE_POSITION.WAREHOUSE_OPERATOR,
    },
    {
        id: faker.string.uuid(),
        department_id: depId2,
        firstname: 'Jared',
        middlename: 'X',
        lastname: 'Singcol',
        position: EMPLOYEE_POSITION.CETD,
    },
    {
        id: faker.string.uuid(),
        department_id: depId3,
        firstname: 'Hannah Grace',
        middlename: 'Bioco',
        lastname: 'Tudio',
        position: EMPLOYEE_POSITION.AUDIT,
    },
    {
        id: faker.string.uuid(),
        department_id: depId3,
        firstname: 'Jessa',
        middlename: '',
        lastname: 'Valida',
        position: EMPLOYEE_POSITION.AUDIT,
    },
    {
        id: faker.string.uuid(),
        department_id: depId3,
        firstname: 'Roger',
        middlename: '',
        lastname: 'Laurente',
        position: EMPLOYEE_POSITION.CETD,
    }
]

export const jo_default_approvers: IJOApproverDefault[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        approver: employees[1],
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        approver: employees[2],
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        approver: employees[3],
        label: 'GM / OIC',
        order: 4,
    },
]

export const rv_default_approvers: IRVApproverDefault[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        approver: employees[1],
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        approver: employees[2],
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        approver: employees[3],
        label: 'GM / OIC',
        order: 4,
    },
]

export const spr_default_approvers: ISPRApproverDefault[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        approver: employees[1],
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        approver: employees[2],
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        approver: employees[3],
        label: 'GM / OIC',
        order: 4,
    },
]

export const meqs_default_approvers: IMEQSApproverDefault[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[4].id,
        approver: employees[4],
        label: '1st CPC Member',
        order: 1,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[5].id,
        approver: employees[5],
        label: '2nd CPC Member',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[6].id,
        approver: employees[6],
        label: 'Witness',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[7].id,
        approver: employees[7],
        label: 'CPC Chairman',
        order: 4,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        approver: employees[3],
        label: 'GM / OIC',
        order: 5,
    },
]

export const po_default_approvers: IPOApproverDefault[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        approver: employees[1],
        label: 'Budget Approved By',
        order: 1,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[8].id,
        approver: employees[8],
        label: 'Checked By Finance Mngr',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        approver: employees[2],
        label: 'Audited By',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        approver: employees[3],
        label: 'GM / OIC',
        order: 4,
    },
]

const canvassId = faker.string.uuid()

const canvass: ICanvass = {
    id: canvassId,
    rc_number: '23-00001',
    date_requested: "2024-01-01",
    purpose: 'purpose',
    notes: 'notes',
    requested_by_id: employees[9].id,
    requested_by: employees[9],
    noted_by_id: employees[10].id,
    noted_by: employees[10],
    items: []
}


const itemId = faker.string.uuid() 

const canvassItems: ICanvassItem[] = [
    {
        id: faker.string.uuid(),
        item_id: itemId,
        item: {
            id: itemId,
            description: 'Item 1',
            brand_id: brands[0].id,
            brand: brands[0],
            unit_id: units[0].id,
            unit: units[0],
            quantity: 5,
        },
    }
]

export const canvasses: ICanvass[] = [
    {
        id: canvass.id,
        rc_number: canvass.rc_number,
        date_requested: canvass.date_requested,
        purpose: canvass.purpose,
        notes: canvass.notes,
        requested_by_id: canvass.requested_by.id,
        requested_by: canvass.requested_by,
        noted_by_id: canvass.noted_by.id,
        noted_by: canvass.noted_by,
        items: canvassItems
    }
]
export const RVs: IRV[] = []
export const JOs: IJO[] = []
export const SPRs: ISPR[] = []
export const MEQSs: IMEQS[] = []
export const POs: IPO[] = []

export const joApprovers: IJOApprover[] = []

// export const items: IItem[] = [...canvassItems]