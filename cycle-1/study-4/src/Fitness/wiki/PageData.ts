import WikiPage from './WikiPage';

export default class PageData {
    getWikiPage(): WikiPage {
        return new WikiPage();
    }

    hasAttribute(test: string) {
        return false;
    }

    getContent() {
        return '';
    }

    setContent(s: string) {

    }

    getHtml() {
        return '';
    }
};









