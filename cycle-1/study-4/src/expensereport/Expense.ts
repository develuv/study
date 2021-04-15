import {Type} from './enum/Type';

export default class Expense {
    public type: Type;
    public amount: number;

    constructor(type: Type, amount: number) {
        this.type = type;
        this.amount = amount;
    }
}