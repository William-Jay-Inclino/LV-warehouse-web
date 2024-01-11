import { ICanvass, IEmployee, IRV } from "../../common/entities";
import { sendRequest } from "../../config/api";
import { ICreateRVDto, IUpdateRVDto } from "./rv.dto";
import { IFormResponseData } from "./rv.entities";

class RvService{

    // private endpoint = '/canvass/'
    private service = 'RVService: '

    async findAll(): Promise<{rvs: IRV[], employees: IEmployee[], canvasses: ICanvass[]}> {
        const query = `
            query{
                canvasses{
                    rc_number
                }
                rvs{
                    id
                    rv_number
                    canvass{
                        rc_number
                    }
                    date_requested
                    is_referenced
                    status
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
                rvs: data.rvs,
                employees: data.employees,
                canvasses: data.canvasses
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async create(payload: {data: ICreateRVDto}): Promise<IRV | null>{
        console.log(this.service + 'create()', payload)
        const { data } = payload

        const mutation = `
            mutation CreateRv($data: CreateRvInput!) {
                createRv(input: $data) {
                    id
                    rv_number
                    canvass{
                        rc_number
                    }
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
                return response.data.data.createRv 
            }
            console.error('Error creating rv')
            return null
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async update(payload: {id: string, data: IUpdateRVDto}): Promise<IRV | null>{
        console.log(this.service + 'update()', payload)
        const { id, data } = payload

        const mutation = `
            mutation UpdateRv($data: UpdateRvInput!) {
                updateRv(id: "${id}", input: $data) {
                    id
                    rv_number
                    canvass{
                        rc_number
                    }
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
                return response.data.data.updateRv 
            }
            console.error('Error creating rv')
            return null
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async remove(id: string): Promise<{success: boolean, msg: string}> {

        const mutation = `
            mutation {
                removeRv(id: "${id}") {
                    success
                    msg
                }
            }
        `;

        try {
            const response = await sendRequest(mutation);
            console.log('response', response)
            if(response.status === 200 && response.data.data){
                return response.data.data.removeRv 
            }
            console.error('Error creating rv')
        } catch (error) {
            console.error(error);
            throw error;
        }

        return {
            success: false,
            msg: "Failed to remove RV"
        }
    }

    async initForm(id?: string): Promise<IFormResponseData> {

        let query = ''

        if(!id){
            query = `
                query {
                    rv_number
                    canvasses{
                        id
                        rc_number
                        purpose
                        notes
                        is_referenced
                        requested_by{
                          id
                          firstname
                          middlename
                          lastname
                        }
                        canvass_items{
                          item{
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
                    default_rv_approvers{
                        id
                        approver_id
                        approver{
                            id
                            firstname
                            middlename
                            lastname
                        }
                        label
                        order
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
        }else{
            query = `
                query {
                    rv_number
                    default_rv_approvers{
                        id
                        approver_id
                        approver{
                            id
                            firstname
                            middlename
                            lastname
                        }
                        label
                        order
                    }
                    rv(id: "${id}"){
                        id
                        canvass{
                            id
                            rc_number
                        }
                        rv_number
                        date_requested
                        requested_by{
                          id
                          firstname
                          middlename
                          lastname
                        }
                        supervisor{
                          id
                          firstname
                          middlename
                          lastname
                        }
                        classification{
                          id
                          name
                        }
                        work_order_no
                        work_order_date
                        purpose
                        notes
                        rv_items{
                          item{
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
                        rv_approvers{
                          id
                          approver{
                            id
                            firstname
                            middlename
                            lastname
                          }
                          date_approval
                          notes
                          label
                          order
                          status
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
                rv_number: data.rv_number,
                brands: data.brands,
                units: data.units,
                employees: data.employees,
                rv: data.rv ? data.rv : undefined,
                default_approvers: data.default_rv_approvers,
                canvasses: data.canvasses
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

}

export const rvService = new RvService()