export class ProductNotFoundException extends Error {
    constructor(message: string = 'Products not found') {
        super(message);
    }
}