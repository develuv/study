import Link from './Link';

export default class ListLink extends Link {
    constructor(caption: string, url: string) {
        super(caption, url);
    }

    public makeHTML() {
        return ` <li><a href="${this.url}">${this.caption}</a></li>\n`;
    }
}
