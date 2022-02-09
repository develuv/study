import {Printable} from './Printable';

export class Printer implements Printable {
    private name: String;

    constructor(name: String) {
        this.name = name;
        this.heavyJob('Printer의 인스턴스 (' + name + ')을 생성 중');
    }

    getPrinterName() {
        return this.name;
    }

    print(string: String) {
        console.log('=== ' + this.name + ' ===');
        console.log(string);
    }

    setPrinterName(name: String) {
        this.name = name;
    }

    private async heavyJob(msg: String) {
        console.log(msg);
        for (let i: number = 0; i < 5; i++) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(console.log("."));
                }, 1000);
            });
        }
        console.log('완료');
    }

}