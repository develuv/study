import {Product} from "./Product";

export class IDCard extends Product {

    private owner: string;

    public constructor(owner: string) {
        super();
        console.log(owner + "의 카드를 만듭니다.");
        this.owner = owner;
    }

    public use(): void {
        console.log(this.owner + "의 카드를 사용합니다.");
    }

    public getOwner(): string {
        return this.owner;
    }
}