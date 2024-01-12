import { ICanvass, IEmployee } from "../../common/entities";
import { sendRequest } from "../../config/api";
import { ICreateCanvassDto, IUpdateCanvassDto } from "./canvass.dto";
import { IFormResponseData } from "./canvass.entities";

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
                    is_referenced
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

    async create(payload: {data: ICreateCanvassDto}): Promise<ICanvass | null>{
        console.log(this.service + 'create()', payload)
        const { data } = payload

        const mutation = `
            mutation CreateCanvass($data: CreateCanvassInput!) {
                createCanvass(input: $data) {
                    id
                    rc_number
                    date_requested
                    is_referenced
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

    async update(payload: {id: string, data: IUpdateCanvassDto}): Promise<ICanvass | null>{
        console.log(this.service + 'update()', payload)
        const { id, data } = payload

        const mutation = `
            mutation UpdateCanvass($data: UpdateCanvassInput!) {
                updateCanvass(id: "${id}", input: $data) {
                    id
                    rc_number
                    date_requested
                    is_referenced
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
                return response.data.data.updateCanvass 
            }
            console.error('Error creating canvass')
            return null
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async remove(id: string): Promise<{success: boolean, msg: string}> {

        const mutation = `
            mutation {
                removeCanvass(id: "${id}") {
                    success
                    msg
                }
            }
        `;

        try {
            const response = await sendRequest(mutation);
            console.log('response', response)
            if(response.status === 200 && response.data.data){
                return response.data.data.removeCanvass 
            }
            console.error('Error creating canvass')
        } catch (error) {
            console.error(error);
            throw error;
        }

        return {
            success: false,
            msg: "Failed to remove Canvass"
        }
    }

    async initForm(id?: string): Promise<IFormResponseData> {

        let query = ''

        if(!id){
            query = `
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
        }else{
            query = `
                query {
                    rc_number
                    canvass(id: "${id}") {
                        id
                        rc_number
                        date_requested
                        requested_by{
                            id
                            firstname
                            middlename
                            lastname
                        }
                        noted_by{
                            id
                            firstname
                            middlename
                            lastname
                        }
                        purpose
                        notes
                        canvass_items {
                            item {
                            id
                            description
                            brand{
                                id
                                name
                            }
                            unit{
                                id
                                name
                            }
                            quantity
                            }
                        }
                    }
                    brands {
                        id
                        name
                    }
                    units {
                        id
                        name
                    }
                    employees {
                        id
                        firstname
                        middlename
                        lastname
                    }
                }
                
            `;
        }

        try {
            const response = await sendRequest(query);
            console.log('response', response)
            const data = response.data.data
            return {
                rc_number: data.rc_number,
                brands: data.brands,
                units: data.units,
                employees: data.employees,
                canvass: data.canvass ? data.canvass : undefined
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

}

export const canvassService = new CanvassService()