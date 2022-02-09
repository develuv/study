import {Add, AddImpl} from './Add';

export class AddProxy implements Add {
    private $add: Add;

    private count: number = 0;

    constructor() {
        this.$add = new AddImpl();
    }

    public add(a: number, b: number): number {
        this.count++;
        return this.$add.add(a, b)
    }

    public callCount(): number {
        return this.count;
    }
}