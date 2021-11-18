export class Singleton {
    private static instance: Singleton;
    private readonly uuid: number;

    private constructor() {
        this.uuid = Math.random();
    }

    static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    };

    public printSelf(): void {
        console.log('It\'s me', this.uuid);
    }

}