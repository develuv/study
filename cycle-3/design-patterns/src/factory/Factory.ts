import {Product} from "./Product";

export abstract class Factory {
    // Template Method 패턴
    public create(owner: string): Product {
        const p: Product = this.createProduct(owner);
        this.registerProduct(p);
        return p;
    }
    
    protected abstract createProduct(owner: string): Product;

    protected abstract registerProduct(p: Product): void;
}