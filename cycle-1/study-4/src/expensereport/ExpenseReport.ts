import Expense from './Expense';
import ReportPrinter from './ReportPrinter';
import {changeToUsdFormat} from './utils/util';
import {Type} from './enum/Type';

export default class ExpenseReport {
    expenses: Array<Expense> = [];

    public printReport(printer: ReportPrinter): void {
        let total: number = 0;
        let mealExpenses: number = 0;

        printer.print("Expenses " + this.getDate() + "\n");

        for (const expense of this.expenses) {
            if (expense.type == Type.BREAKFAST || expense.type == Type.DINNER)
                mealExpenses += expense.amount;

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
            printer.print(`${((expense.type == Type.DINNER && expense.amount > 5000)
                || (expense.type == Type.BREAKFAST && expense.amount > 1000)) ? "X" : " "}\t${name}\t${changeToUsdFormat(expense.amount / 100.0)}\n`);

            total += expense.amount;
        }

        printer.print(`\nMeal expenses ${changeToUsdFormat(mealExpenses / 100.0)}`);
        printer.print(`\nTotal ${changeToUsdFormat(total / 100.0)}`);
    }

    public addExpense(expense: Expense): void {
        this.expenses.push(expense);
    }

    private getDate(): string {
        return "9/12/2002";
    }
}