export default abstract class Product {
    abstract use(s: string): void;

    abstract createClone(): Product;

    protected clone(instance: Product): Product {
        return Object.create(instance);
    }

}
