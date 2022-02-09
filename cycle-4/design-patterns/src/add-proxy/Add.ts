export interface Add {
    add(a: number, b: number): number;
}

export class AddImpl {
    public add(a: number, b: number): number {
        return a + b;
    }
}