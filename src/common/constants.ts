import { APPROVAL_STATUS, DEPARTMENT_STATUS } from "./entities/common.enums"

export const routeNames = {
    dashboard: 'dashboard.route',
    login: 'login.route',
    home: 'home.route',
    purchasing_canvass: 'purchasing_canvass.route',
    purchasing_canvass_form: 'purchasing_canvass_form.route',
    purchasing_rv: 'purchasing_rv.route',
    purchasing_rv_form: 'purchasing_rv_form.route',
    purchasing_meqs: 'purchasing_meqs.route',
    purchasing_meqs_form: 'purchasing_meqs_form.route',
    data_management_brand: 'data_management_brand.route',
    data_management_brand_form: 'data_management_brand_form.route',
}

export const supervisorLabel = 'Imd. Sup.'

export const departmentStatus = {
    [DEPARTMENT_STATUS.ACTIVE]: {
        value: DEPARTMENT_STATUS.ACTIVE,
        label: 'Active',
        color: 'success',
    },
    [DEPARTMENT_STATUS.INACTIVE]: {
        value: DEPARTMENT_STATUS.INACTIVE,
        label: 'Inactive',
        color: 'danger',
    }
}

export const divisionStatus = {
    [DEPARTMENT_STATUS.ACTIVE]: {
        value: DEPARTMENT_STATUS.ACTIVE,
        label: 'Active',
        color: 'success',
    },
    [DEPARTMENT_STATUS.INACTIVE]: {
        value: DEPARTMENT_STATUS.INACTIVE,
        label: 'Inactive',
        color: 'danger',
    }
}

export const approvalStatus = {
    [APPROVAL_STATUS.PENDING]: {
        value: APPROVAL_STATUS.PENDING,
        label: 'Pending',
        color: 'primary',
    },
    [APPROVAL_STATUS.APPROVED]: {
        value: APPROVAL_STATUS.APPROVED,
        label: 'Approved',
        color: 'success',
    },
    [APPROVAL_STATUS.DISAPPROVED]: {
        value: APPROVAL_STATUS.DISAPPROVED,
        label: 'Disapproved',
        color: 'danger',
    },
    ['cancelled']: {
        value: 'cancelled',
        label: 'Cancelled',
        color: 'warning',
    },
}