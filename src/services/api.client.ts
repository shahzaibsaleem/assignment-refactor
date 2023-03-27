import { ProductNotFoundException } from "../exceptions/product.not-found.exception";
import {CreateProduct, ProductResponse} from "../interfaces/product.response.interface";

export const productsEndpoint = 'https://fakestoreapi.com/products'

export const fetchProducts = async (): Promise<ProductResponse[]> => {
    return await fetchData<ProductResponse[]>(productsEndpoint).catch(error => {
        throw new ProductNotFoundException(error);
    })
}

export const updateProducts = async (payload: CreateProduct): Promise<{ id: number }> => {
    return await fetchData<{id: number}>(productsEndpoint, {method: 'POST', body: JSON.stringify(payload)})
}

export const fetchData = async <T>(url: string, opts?: RequestInit): Promise<T> => {
    return await fetch(url, opts).then((response) => response.json().then((resp: T) => resp as T));
}