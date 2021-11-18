class Singleton2 {
    private readonly uuid: number;

    constructor() {
        this.uuid = Math.random();
    }

    public printSelf(): void {
        console.log('It\'s me', this.uuid);
    }

}

const instance = new Singleton2();
export {instance};