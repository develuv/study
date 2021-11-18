import {AbstractDisplay} from "./AbstractDisplay";
import {CharDisplay} from "./CharDisplay";
import {StringDisplay} from "./StringDisplay";

export class Index {
    public constructor() {
        this.run();
    }

    private run() {
        const d1: AbstractDisplay = new CharDisplay('H');
        const d2: AbstractDisplay = new StringDisplay('Hello, world.');

        d1.display();
        console.log();
        d2.display();
        console.log();
    }
}

new Index();