import Factory from './Factory';
import ListLink from './ListLink';
import ListTray from './ListTray';
import ListPage from './ListPage';

export default class ListFactory extends Factory {
    createLink(caption: string, url: string) {
        return new ListLink(caption, url);
    }

    createTray(caption: string) {
        return new ListTray(caption);
    }

    createPage(title: string, author: string) {
        return new ListPage(title, author)
    }

}
