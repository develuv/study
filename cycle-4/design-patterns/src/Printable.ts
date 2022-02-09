export interface Printable {
    setPrinterName(name: String): void;
    getPrinterName(): String;
    print(string: String): void;
}