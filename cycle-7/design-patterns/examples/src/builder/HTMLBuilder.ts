import Builder from './Builder';

export default class HTMLBuilder implements Builder {
    private writer: Array<string> = [];

    makeTitle(title: string) {
        this.writer.push(`<html><head><title>${title}</title></head><body>`);
        this.writer.push(`<h1>${title}</h1>`);
    }

    makeString(str: string) {
        this.writer.push(`<p>${str}</p>`);
    }

    makeItems(items: Array<string>) {
        this.writer.push(`<ul>`);
        items.forEach(item => this.writer.push(`<li>${item}</li>`))
        this.writer.push(`</ul>`);
    }

    close() {
        this.writer.push(`</body></html>`);
    }

    public getResult(): string {
        return this.writer.join('');
    }
}
