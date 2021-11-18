import {Factory} from "./Factory";
import {IDCard} from "./IDCard";
import {Product} from "./Product";

export class IDCardFactory extends Factory {

    private owners: Array<string> = [];

    protected createProduct(owner: string): Product {
        return new IDCard(owner);
    }

    protected registerProduct(product: Product): void {
        this.owners.push((product as IDCard).getOwner());
    }

    public getOwner(): Array<string> {
        return this.owners;
    }
}