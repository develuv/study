import ExpenseReport from './ExpenseReport';
import ReportPrinter from './ReportPrinter';
import Expense from './Expense';
import {Type} from './enum/Type';
import {changeToUsdFormat} from './utils/util';

export default class ExpenseReporter {
    private readonly expenseReport: ExpenseReport = new ExpenseReport();
    private printer: ReportPrinter;

    constructor() {
        this.expenseReport.total = 0;
        this.expenseReport.mealExpenses = 0;
    }

    public printReport(printer: ReportPrinter): void {
        this.printer = printer;
        this.expenseReport.totalUpExpenses();
        this.printExpensesAndTotals();
    }

    private printExpensesAndTotals(): void {
        this.printHeader();
        this.printExpenses();
        this.printTotals();
    }

    private printExpenses(): void {
        for (const expense of this.expenseReport.expenses)
            this.printExpense(expense);
    }

    private printExpense(expense: Expense): void {
        this.printer.print(`${expense.isOverage() ? "X" : " "}\t${this.getName(expense)}\t${changeToUsdFormat(this.penniesToDollars(expense.amount))}\n`);
    }

    private getName(expense: Expense): string {
        let name: string = "TILT";
        switch (expense.type) {
            case Type.DINNER:
                name = "Dinner";
                break;
            case Type.BREAKFAST:
                name = "Breakfast";
                break;
            case Type.CAR_RENTAL:
                name = "Car Rental";
                break;
        }
        return name;
    }

    private printTotals(): void {
        this.printer.print(`\nMeal expenses ${changeToUsdFormat(this.penniesToDollars(this.expenseReport.mealExpenses))}`);
        this.printer.print(`\nTotal ${changeToUsdFormat(this.penniesToDollars(this.expenseReport.total))}`);
    }

    private printHeader(): void {
        this.printer.print("Expenses " + this.getDate() + "\n");
    }

    private penniesToDollars(amount: number): number {
        return amount / 100.0;
    }

    public addExpense(expense: Expense): void {
        this.expenseReport.addExpense(expense);
    }

    private getDate(): string {
        return "9/12/2002";
    }
}