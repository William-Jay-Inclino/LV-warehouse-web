import { IBrand, ICanvass, IEmployee, IUnit } from "../common/entities";
import { sendRequest } from "../config/api";
import { ICreateCanvassDto } from "./dto/canvass.dto";
import { IFormResponseData } from "./entities/canvass.entity";

class CanvassService{

    // private endpoint = '/canvass/'
    private service = 'CanvassService: '

    async findAll(): Promise<{canvasses: ICanvass[], employees: IEmployee[]}> {
        const query = `
            query{
                canvasses{
                    id
                    rc_number
                    date_requested
                    requested_by{
                        id
                        firstname
                        middlename
                        lastname
                    }
                },
                employees{
                  id
                  firstname
                  middlename
                  lastname
                }
            }
        `;

        try {
            const response = await sendRequest(query);
            console.log('response', response)
            const data = response.data.data
            return {
                canvasses: data.canvasses,
                employees: data.employees
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<IFormResponseData | null> {
        return null
        // const query = `
        //     query{
        //         canvass(id: ${id}){
        //             rc_number
        //             id
        //             purpose
        //             notes
        //             canvass_items{
        //               item{
        //                 description
        //               }
        //             }
        //         }
        //     }
        // `;

        // try {
        //     const response = await sendRequest(query);
        //     console.log('response', response)
        //     const data = response.data.data
        //     return {
        //         canvasses: data.canvasses,
        //         employees: data.employees
        //     }
        // } catch (error) {
        //     console.error(error);
        //     return null
        // }
    }

    async create(payload: {data: ICreateCanvassDto}): Promise<ICanvass | null>{
        console.log(this.service + 'create()', payload)
        const { data } = payload

        const mutation = `
            mutation CreateCanvass($data: CreateCanvassInput!) {
                createCanvass(input: $data) {
                    id
                    rc_number
                    date_requested
                    requested_by {
                        id
                        firstname
                        middlename
                        lastname
                    }
                }
            }
        `;

        try {
            const response = await sendRequest(mutation, {data});
            console.log('response', response)
            if(response.status === 200 && response.data.data){
                return response.data.data.createCanvass 
            }
            console.error('Error creating canvass')
            return null
        } catch (error) {
            console.error(error);
            throw error;
        }

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

    async initForm(): Promise<IFormResponseData> {
        const query = `
            query{
                rc_number
                brands{
                    id
                    name
                }
                units{
                    id
                    name
                }
                employees{
                    id
                    firstname
                    middlename
                    lastname
                }
            }
        `;

        try {
            const response = await sendRequest(query);
            console.log('response', response)
            const data = response.data.data
            return {
                rc_number: data.rc_number,
                brands: data.brands,
                units: data.units,
                employees: data.employees
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

}

export const canvassService = new CanvassService()