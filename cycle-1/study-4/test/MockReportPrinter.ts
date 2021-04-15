import ReportPrinter from '../src/expensereport/ReportPrinter';

export default class MockReportPrinter implements ReportPrinter {
    private printedText: string = "";

    public print(text: string): void {
        this.printedText += text;
    }

    public getText(): string {
        return this.printedText;
    }
}