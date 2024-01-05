import { rv_default_approvers } from "../__temp__/data";
import { supervisorLabel } from "../common";
import { APPROVAL_STATUS, IItem, IRV, IRVApprover, IRVApproverDefault, IRVItem } from "../common/entities";
import { ICreateRVDto } from "./dto/rv.dto";
import { faker } from '@faker-js/faker';
// import moment from 'moment'
// import * as mock from '../__temp__/data'

class RVService{

    // private endpoint = '/rv/'
    private service = 'RVService: '
    private ctr = 1
    // private today = moment().format('YYYY-MM-DD')

    async findAll(): Promise<IRV[]>{
        return []
    }

    async findOne(id: string): Promise<IRV | null>{
        console.log('id', id)
        const item = {} as IRV 
        return item
    }

    async create(payload: {data: ICreateRVDto}): Promise<IRV | null>{
        console.log(this.service + 'create()', payload)

        const rvId = faker.string.uuid()

        const item = {} as IRV 
        item.canvass = payload.data.canvass
        item.canvass_id = payload.data.canvass.id
        item.date_requested = payload.data.date_requested
        item.id = rvId 
        item.rv_number = '23-0000' + this.ctr
        item.work_order_date = payload.data.work_order_date
        item.work_order_no = payload.data.work_order_no
        item.supervisor_id = payload.data.supervisor.id
        item.supervisor = payload.data.supervisor
        item.is_cancelled = false
        item.notes = payload.data.notes
        item.purpose = payload.data.purpose

        const items = payload.data.items.map(i => {

            const itemId = faker.string.uuid()

            const x = {} as IItem
            x.brand_id = i.brand ? i.brand.id : null
            x.brand = i.brand || null
            x.description = i.description
            x.id = itemId
            x.quantity = i.quantity
            x.unit_id = i.unit!.id
            x.unit = i.unit!
            return x
        }) 

        const rvItems: IRVItem[] = []

        items.forEach(i => {
            rvItems.push({
                id: faker.string.uuid(),
                item_id: i.id,
                item: i
            })
        })

        item.items = rvItems

        const defaultApprovers: IRVApproverDefault[] = [...rv_default_approvers]

        const approverSuperior = {} as IRVApproverDefault
        approverSuperior.approver_id = payload.data.supervisor.id
        approverSuperior.approver = payload.data.supervisor
        approverSuperior.id = faker.string.uuid()
        approverSuperior.approver = payload.data.supervisor 
        approverSuperior.label = supervisorLabel
        approverSuperior.order = 1
        defaultApprovers.unshift(approverSuperior)

        const approvers = defaultApprovers.map(i => {
            const x = {} as IRVApprover 
            x.approver_id = i.approver_id
            x.approver = i.approver
            x.id = faker.string.uuid() 
            x.label = i.label 
            x.notes = ''
            x.order = i.order
            x.rv = item 
            x.rv_id = item.id
            x.status = APPROVAL_STATUS.PENDING

            return x 
        })

        item.approvers = approvers
        
        this.ctr ++ 

        return item
    }

    async update(payload: {id: string, data: IRV}): Promise<IRV | null>{
        console.log('payload', payload)
        const item = {} as IRV 
        return item
    }

    async remove(id: string): Promise<boolean> {
        console.log('id', id)
        return true
    }

}

export const rVService = new RVService()