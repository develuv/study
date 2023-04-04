import Tray from './Tray';

export default class ListTray extends Tray {
    constructor(caption: string) {
        super(caption);
    }

    public makeHTML(): string {
        const buffer: Array<string> = [];

        buffer.push('<li>\n');
        buffer.push(this.caption + '\n');
        buffer.push('<ul>\n');

        for (const it of this.tray)
            buffer.push(it.makeHTML());

        buffer.push('</ul>\n');
        buffer.push('</li>\n');

        return buffer.join('');

    }
}
