import Builder from './Builder';

export default class TextBuilder implements Builder {
    private buffer: Array<string> = [];

    makeTitle(title: string) {
        this.buffer.push('===========================\n');
        this.buffer.push(`[ ${title} ]\n`);
        this.buffer.push('\n');
    }

    makeString(str: string) {
        this.buffer.push(`ㅁ ${str} ㅁ`);
        this.buffer.push('\n');
    }

    makeItems(items: Array<string>) {
        items.forEach(item => this.buffer.push(` - ${item} \n`));
        this.buffer.push('\n');
    }

    close() {
        this.buffer.push('===========================\n');
    }

    public getResult(): string {
        return this.buffer.join('')
    }

}
