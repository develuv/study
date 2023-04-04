import Product from './Product';

export default class MessageBox extends Product {
    private readonly decoChar: string;

    constructor(decoChar: string) {
        super();
        this.decoChar = decoChar
    }

    use(s: string) {
        const length = s.length;
        let printString: string = '';

        for (let i = 0; i < length + 4; i++)
            printString += this.decoChar;

        console.log(printString);
        console.log(`${this.decoChar} ${s} ${this.decoChar}`);
        console.log(printString);
    }

    createClone(): Product {
        return this.clone(this);
    }

}
