import {Printable} from './Printable';
import {Printer} from './Printer';

export class PrinterProxy implements Printable {
    private name: String;
    private real: Printer = null;

    constructor(name: String) {
        this.name = name;
    }

    getPrinterName() {
        return this.name;
    }

    print(string: String) {
        this.realize();
        this.real.print(string);
    }

    setPrinterName(name: String) {
        if (this.real != null) {
            this.real.setPrinterName(name);
        }
        this.name = name;
    }

    private realize() {
        if (this.real == null) {
            this.real = new Printer(this.name);
        }
    }
}