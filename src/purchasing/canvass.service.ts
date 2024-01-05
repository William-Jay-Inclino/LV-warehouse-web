import { ICanvass, ICanvassItem, IItem } from "../common/entities";
import { ICreateCanvassDto } from "./dto/canvass.dto";
import { faker } from '@faker-js/faker';

class CanvassService{

    // private endpoint = '/canvass/'
    private service = 'CanvassService: '
    private ctr = 2

    async findAll(): Promise<ICanvass[]>{
        return []
    }

    async findOne(id: string): Promise<ICanvass | null>{
        console.log('id', id)
        const item = {} as ICanvass 
        return item
    }

    async create(payload: {data: ICreateCanvassDto}): Promise<ICanvass | null>{
        console.log(this.service + 'create()', payload)

        const canvassId = faker.string.uuid()

        const item = {} as ICanvass 
        item.id = canvassId
        item.date_requested = payload.data.date_requested
        item.noted_by = payload.data.noted_by!
        item.noted_by_id = payload.data.noted_by!.id
        item.notes = payload.data.notes 
        item.purpose = payload.data.purpose
        item.rc_number = '23-0000' + this.ctr
        item.requested_by = payload.data.requested_by!
        item.requested_by_id = payload.data.requested_by!.id
        
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

        const canvassItems: ICanvassItem[] = []

        items.forEach(i => {
            canvassItems.push({
                id: faker.string.uuid(),
                item_id: i.id,
                item: i
            })
        })

        item.items = canvassItems

        this.ctr ++ 

        // canvasses.unshift(item)

        return item
    }

    async update(payload: {id: string, data: ICanvass}): Promise<ICanvass | null>{
        console.log('payload', payload)
        const item = {} as ICanvass 
        return item
    }

    async remove(id: string): Promise<boolean> {
        console.log('id', id)
        return true
    }

}

export const canvassService = new CanvassService()