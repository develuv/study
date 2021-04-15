import MockReportPrinter from './MockReportPrinter';
import {Type} from '../src/expensereport/enum/Type';
import Expense from '../src/expensereport/Expense';
import {changeToUsdFormat} from '../src/expensereport/utils/util';
import ExpenseReport from '../src/expensereport/ExpenseReport';

describe("Tdd Test ExpenseReporter", () => {
    let report: ExpenseReport = new ExpenseReport();
    let printer: MockReportPrinter = new MockReportPrinter();

    beforeEach(() => {
        report = new ExpenseReport();
        printer = new MockReportPrinter();
    });


    it("printEmpty", () => {
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(0.00) + "\n" +
            "Total " + changeToUsdFormat(0.00)
        ).toEqual(printer.getText());
    });

    it("printOneDinner", () => {
        report.addExpense(new Expense(Type.DINNER, 1678));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tDinner\t" + changeToUsdFormat(16.78) + "\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(16.78) + "\n" +
            "Total " + changeToUsdFormat(16.78)
        ).toEqual(printer.getText());
    });

    it("printOneDinner", () => {
        report.addExpense(new Expense(Type.DINNER, 1678));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tDinner\t" + changeToUsdFormat(16.78) + "\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(16.78) + "\n" +
            "Total " + changeToUsdFormat(16.78)
        ).toEqual(printer.getText());
    });

    it("twoMeals", () => {
        report.addExpense(new Expense(Type.DINNER, 1000));
        report.addExpense(new Expense(Type.BREAKFAST, 500));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tDinner\t" + changeToUsdFormat(10.00) + "\n" +
            " \tBreakfast\t" + changeToUsdFormat(5.00) + "\n" +

            "\n" +
            "Meal expenses " + changeToUsdFormat(15.00) + "\n" +
            "Total " + changeToUsdFormat(15.00)
        ).toEqual(printer.getText());
    });

    it("twoMealsAndCarRental", () => {
        report.addExpense(new Expense(Type.DINNER, 1000));
        report.addExpense(new Expense(Type.BREAKFAST, 500));
        report.addExpense(new Expense(Type.CAR_RENTAL, 50000));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tDinner\t" + changeToUsdFormat(10.00) + "\n" +
            " \tBreakfast\t" + changeToUsdFormat(5.00) + "\n" +
            " \tCar Rental\t" + changeToUsdFormat(500.00) + "\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(15.00) + "\n" +
            "Total " + changeToUsdFormat(515.00)
        ).toEqual(printer.getText());
    });

    it("overages", () => {
        report.addExpense(new Expense(Type.BREAKFAST, 1000));
        report.addExpense(new Expense(Type.BREAKFAST, 1001));
        report.addExpense(new Expense(Type.DINNER, 5000));
        report.addExpense(new Expense(Type.DINNER, 5001));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tBreakfast\t" + changeToUsdFormat(10.00) + "\n" +
            "X\tBreakfast\t" + changeToUsdFormat(10.01) + "\n" +
            " \tDinner\t" + changeToUsdFormat(50.00) + "\n" +
            "X\tDinner\t" + changeToUsdFormat(50.01) + "\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(120.02) + "\n" +
            "Total " + changeToUsdFormat(120.02)
        ).toEqual(printer.getText());
    });

});