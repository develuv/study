import {Type} from './enum/Type';

export default class Expense {
    public type: Type;
    public amount: number;

    constructor(type: Type, amount: number) {
        this.type = type;
        this.amount = amount;
    }

    isOverage(): boolean {
        return ((this.type == Type.DINNER && this.amount > 5000)
            || (this.type == Type.BREAKFAST && this.amount > 1000));
    }

    isMeal(): boolean {
        return this.type == Type.BREAKFAST || this.type == Type.DINNER;
    }
}