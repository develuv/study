import Page from './Page';

export default class ListPage extends Page {
    constructor(title: string, author: string) {
        super(title, author);
    }

    public makeHTML(): string {
        const buffer: Array<string> = [];

        buffer.push(`<html><head><title>${this.title}</title></head>\n`);
        buffer.push('<body>\n');
        buffer.push(`<h1>${this.title}<\h1>\n`);
        buffer.push('<ul>\n');

        for (const it of this.content)
            buffer.push(it.makeHTML());

        buffer.push('</ul>\n');
        buffer.push(`<hr><address>${this.author}</address>`);
        buffer.push('</body></html>\n');

        return buffer.join('');
    }
}
