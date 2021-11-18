export abstract class AbstractDisplay {
    public abstract open(): void;

    public abstract print(): void;

    public abstract close(): void;

    public display(): void {
        this.open();
        for (let i = 0; i < 5; i++) {
            this.print();
        }
        this.close();
    }
}