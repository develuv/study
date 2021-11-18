import {Singleton} from "./Singleton";
import {instance} from "./Singleton2";
import {instance as instance2} from "./Singleton2";

export class Index {
    public constructor() {
        this.run();
    }

    private run() {
        const singleton = Singleton.getInstance();
        singleton.printSelf();

        const singleton2 = Singleton.getInstance();
        singleton2.printSelf();

        instance.printSelf();
        instance2.printSelf();

        // const singleton2 = new Singleton();
        // singleton2.printSelf();
    }
}

new Index();