import Product from './Product';

export default class Manager {
    private showcase: Map<string, Product> = new Map()

    public register(name: string, proto: Product) {
        this.showcase.set(name, proto);
    }

    public create(protoName: string): Product {
        const p: Product = this.showcase.get(protoName) as Product;
        return p.createClone();
    }
}
