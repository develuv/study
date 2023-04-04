import Product from './Product';

export default class UnderlinePen extends Product {
    private readonly ulchar: string;

    constructor(ulchar: string) {
        super();
        this.ulchar = ulchar;
    }

    use(s: string) {
        const length = s.length;
        let printString: string = '';

        console.log(`"${s}"`);

        for (let i = 0; i < length; i++)
            printString += this.ulchar;

        console.log(printString);
    }

    createClone(): Product {
        return this.clone(this);
    }

}
