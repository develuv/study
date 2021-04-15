import Expense from './Expense';

export default class ExpenseReport {
    expenses: Array<Expense> = [];
    total: number;
    mealExpenses: number;

    constructor() {
    }

    totalUpExpenses(): void {
        for (const expense of this.expenses)
            this.addTotals(expense);
    }

    addTotals(expense: Expense): void {
        if (expense.isMeal())
            this.mealExpenses += expense.amount;
        this.total += expense.amount;
    }

    public addExpense(expense: Expense): void {
        this.expenses.push(expense);
    }
}