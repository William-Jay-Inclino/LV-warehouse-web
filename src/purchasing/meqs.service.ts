import { faker } from "@faker-js/faker"
import { APPROVAL_STATUS, IMEQSApprover, IMEQS, IMEQSApproverDefault } from "../common/entities"
import { ICreateMEQSDto } from "./dto/meqs.dto"
import { meqs_default_approvers } from "../__temp__/data"


class MEQSService{

    // private endpoint = '/rv/'
    private service = 'MEQSService: '
    private ctr = 1
    // private today = moment().format('YYYY-MM-DD')

    async findAll(): Promise<IMEQS[]>{
        return []
    }

    async findOne(id: string): Promise<IMEQS | null>{
        console.log('id', id)
        const item = {} as IMEQS 
        return item
    }

    async create(payload: {data: ICreateMEQSDto}): Promise<IMEQS | null>{
        console.log(this.service + 'create()', payload)

        const meqsId = faker.string.uuid()

        const item = {} as IMEQS 
        item.id = meqsId 
        item.meqs_number = '23-0000' + this.ctr
        item.meqs_date = payload.data.meqs_date
        item.purpose = payload.data.purpose
        item.is_cancelled = false

        // if(payload.data.jo){
        //     item.reference_type = REQUEST_TYPES.JO
        //     item.jo = payload.data.jo
        // }else if(payload.data.rv){
        //     item.reference_type = REQUEST_TYPES.RV
        //     item.rv = payload.data.rv
        // }else if(payload.data.spr) {
        //     item.reference_type = REQUEST_TYPES.SPR
        //     item.spr = payload.data.spr
        // }else{
        //     console.error('Undefined jo/rv/spr')
        //     return null
        // }

        // item.items = payload.data.items.map(i => {
        //     const x = {} as IItem
        //     x.brand_id = i.brand ? i.brand.id : null
        //     x.brand = i.brand || null
        //     x.meqs_id = meqsId
        //     x.meqs =  item
        //     x.description = i.description
        //     x.id = faker.string.uuid()
        //     x.quantity = i.quantity
        //     x.unit_id = i.unit!.id
        //     x.unit = i.unit!
        //     x.supplier_items = i.supplier_items
        //     return x
        // }) 

        const defaultApprovers: IMEQSApproverDefault[] = [...meqs_default_approvers]


        const approvers = defaultApprovers.map(i => {
            const x = {} as IMEQSApprover 
            x.approver_id = i.approver_id
            x.approver = i.approver
            x.id = faker.string.uuid() 
            x.label = i.label 
            x.notes = ''
            x.order = i.order
            x.meqs = item 
            x.meqs_id = item.id
            x.status = APPROVAL_STATUS.PENDING

            return x 
        })

        item.approvers = approvers
        
        this.ctr ++ 

        return item
    }

    async update(payload: {id: string, data: IMEQS}): Promise<IMEQS | null>{
        console.log('payload', payload)
        const item = {} as IMEQS 
        return item
    }

    async remove(id: string): Promise<boolean> {
        console.log('id', id)
        return true
    }

}

export const meqsService = new MEQSService()