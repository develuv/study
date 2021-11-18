import {AbstractDisplay} from "./AbstractDisplay";

export class StringDisplay extends AbstractDisplay {
    private text: string;
    private width: number;

    public constructor(text: string) {
        super();
        this.text = text;
        this.width = text.length;
    }
    close(): void {
        this.printLine();
    }

    open(): void {
        this.printLine();
    }

    print(): void {
        process.stdout.write('|' + this.text + '|\n')
    }

    private printLine() {
        process.stdout.write('+');
        for (let i=0; i < this.width; i++) {
            process.stdout.write('-');
        }
        process.stdout.write('+\n');
    }
}