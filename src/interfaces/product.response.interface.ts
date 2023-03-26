export interface ProductRating {
    rate: number;
    count?: number;
}

export interface ProductResponse {
    "id"?: number;
    "title": string;
    "price": number,
    "description": string,
    "category"?: string,
    "image"?: string,
    "rating"?: ProductRating
}

export interface CreateProduct {
    title: string,
    price: number,
    description: string
}

export interface Product extends ProductResponse {
    isFavourite?: boolean
}
