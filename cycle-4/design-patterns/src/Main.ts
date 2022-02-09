import {Printable} from './Printable';
import {PrinterProxy} from './PrinterProxy';

const p: Printable = new PrinterProxy('Alice');
console.log('이름은 현재 ' + p.getPrinterName() + '입니다.');
p.setPrinterName('Bob');
console.log('이름은 현재 ' + p.getPrinterName() + '입니다.');
p.print('Hello, world.');