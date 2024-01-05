import { sendRequest } from '../../config/api';
import { IBrand } from '../../common/entities';
import { ICreateBrandDto, IUpdateBrandDto } from './dto/brand.dto';

export class BrandService {

    private commonFieldsQuery: string = this.generateFieldsQuery(['id', 'name']);

    private generateFieldsQuery(fields: string[]): string {
        return fields.map(field => `${field}`).join('\n');
    }

    async findAll(): Promise<IBrand[]> {
        const query = `
            query {
                brands {
                    ${this.commonFieldsQuery}
                }
            }
        `;

        try {
            const response = await sendRequest(query);
            console.log('response', response)
            return response.data.data.brands;
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async findOne(brandId: string): Promise<IBrand | null> {
        const query = `
            query {
                brand(id: "${brandId}") {
                    ${this.commonFieldsQuery}
                }
            }
        `;

        try {
            const response = await sendRequest(query);
            console.log('response', response)
            return response.data.data.brand;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(data: ICreateBrandDto): Promise<IBrand | null> {
        const inputFields = Object.keys(data)
            .map(field => `${field}: "${data[field as keyof ICreateBrandDto]}"`)
            .join(', ');
        
        console.log('inputFields', inputFields)

        const mutation = `
            mutation {
                createBrand(data: { ${inputFields} }) {
                    ${this.commonFieldsQuery}
                }
            }`;
    
        try {
            const response = await sendRequest(mutation);
            console.log('response', response);
            return response.data.data.createBrand;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(brandId: string, data: IUpdateBrandDto): Promise<IBrand | null> {
        const inputFields = Object.keys(data)
            .map(field => `${field}: "${data[field as keyof IUpdateBrandDto]}"`)
            .join(', ');

        const mutation = `
            mutation {
                updateBrand(id: "${brandId}", data: { ${inputFields} }) {
                    ${this.commonFieldsQuery}
                }
            }
        `;

        try {
            const response = await sendRequest(mutation);
            console.log('response', response)
            return response.data.data.updateBrand;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async remove(brandId: string): Promise<boolean> {
        const mutation = `
            mutation {
                removeBrand(id: "${brandId}") 
            }
        `;

        try {
            const response = await sendRequest(mutation);
            console.log('response', response)
            return response.data.data.removeBrand;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default BrandService;
