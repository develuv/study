import {AbstractDisplay} from "./AbstractDisplay";

export class CharDisplay extends AbstractDisplay {
    private ch: string;

    public constructor(ch: string) {
        super();
        this.ch = ch;
    }
    close(): void {
        process.stdout.write('>>');
    }

    open(): void {
        process.stdout.write('<<');
    }

    print(): void {
        process.stdout.write(this.ch);
    }

}