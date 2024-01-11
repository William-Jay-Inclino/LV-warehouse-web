import { IEmployee, IMEQS, IRV } from "../../common/entities";
import { sendRequest } from "../../config/api";
import { ICreateMEQSDto, IUpdateMEQSDto } from "./meqs.dto";
import { IFormResponseData } from "./meqs.entities";

class MeqsService{

    // private endpoint = '/canvass/'
    private service = 'MeqsService: '

    async findAll(): Promise<{rvs: IRV[], meqs: IMEQS[], employees: IEmployee[]}> {
        const query = `
            query {
                rvs {
                rv_number
                }
                meqs {
                id
                meqs_number
                rv {
                    rv_number
                    requested_by {
                    id
                    firstname
                    middlename
                    lastname
                    }
                }
                meqs_date
                status
                }
                employees {
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
                meqs: data.meqs,
                employees: data.employees
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async create(payload: {data: ICreateMEQSDto}): Promise<IMEQS | null>{
        console.log(this.service + 'create()', payload)
        const { data } = payload

        const mutation = `
            mutation CreateMeqs($data: CreateMeqsInput!) {
                createMeqs(input: $data) {
                    id
                    meqs_number
                    rv{
                        rv_number
                    }
                    date_requested
                    status
                    requested_by{
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
            console.error('Error creating meqs')
            return null
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async update(payload: {id: string, data: IUpdateMEQSDto}): Promise<IMEQS | null>{
        console.log(this.service + 'update()', payload)
        const { id, data } = payload

        const mutation = `
            mutation UpdateMeqs($data: UpdateMeqsInput!) {
                updateMeqs(id: "${id}", input: $data) {
                    id
                    meqs_number
                    rv{
                        rv_number
                    }
                    date_requested
                    status
                    requested_by{
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
            console.error('Error creating meqs')
            return null
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async remove(id: string): Promise<{success: boolean, msg: string}> {

        const mutation = `
            mutation {
                removeMeqs(id: "${id}") {
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
            console.error('Error removing meqs')
        } catch (error) {
            console.error(error);
            throw error;
        }

        return {
            success: false,
            msg: "Failed to remove MEQS"
        }
    }

    async initForm(id?: string): Promise<IFormResponseData> {

        let query = ''

        if(!id){
            query = `
                query {
                    meqs_number
                    rvs{
                        id
                        rv_number
                        purpose
                        notes
                        is_referenced
                        requested_by{
                          id
                          firstname
                          middlename
                          lastname
                        }
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
                    }
                    default_meqs_approvers{
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
                    suppliers{
                        id
                        name
                    }
                }
              
            `;
        }else{
            query = `
                query {
                    default_meqs_approvers{
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
                    meq(id: "${id}"){
                        id
                        rv{
                            id
                            rv_number
                            requested_by{
                                id
                                firstname
                                middlename
                                lastname
                            }
                        }
                        meqs_number
                        meqs_date
                        purpose
                        notes
                        meqs_items{
                            item{
                              id
                              description
                              brand{
                                name
                              }
                              unit{
                                name
                              }
                              supplier_items{
                                id
                                item_id
                                supplier{
                                  name
                                }
                                price
                              }
                            }
                        }
                        meqs_approvers{
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
                    suppliers{
                        id
                        name
                    }
                }
                
            `;
        }

        try {
            const response = await sendRequest(query);
            console.log('response', response)
            const data = response.data.data
            return {
                meqs_number: data.meqs_number,
                brands: data.brands,
                units: data.units,
                meqs: data.meq ? data.meq : undefined,
                default_approvers: data.default_meqs_approvers,
                suppliers: data.suppliers,
                rvs: data.rvs ? data.rvs : [],
                jos: data.jos ? data.jos : [],
                sprs: data.sprs ? data.sprs : [],
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

}

export const meqsService = new MeqsService()