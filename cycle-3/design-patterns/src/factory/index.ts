import {Factory} from "./Factory";
import {IDCardFactory} from "./IDCardFactory";
import {Product} from "./Product";

export class Index {
    public constructor() {
        this.run();
    }

    private run() {
        const factory: Factory = new IDCardFactory();

        const card1: Product = factory.create("홍길동");
        const card2: Product = factory.create("이순신");
        const card3: Product = factory.create("강감찬");

        card1.use();
        card2.use();
        card3.use();
    }
}

new Index();