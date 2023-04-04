import readline from 'readline';
import {getFactory} from './FactoryUtils';
import Link from './Link';
import Tray from './Tray';
import Page from './Page';
import Factory from './Factory';

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

reader.question('Usage: (ListFactory, TableFactory) : ', input => {
    const factory: Factory = getFactory(input);

    const joins: Link = factory.createLink("중앙일보", "http://www.joins.com/");
    const chosun: Link = factory.createLink("조선일보", "http://www.chosun.com/");

    const us_yahoo: Link = factory.createLink("Yahoo!", "http://www.yahoo.com/");
    const kr_yahoo: Link = factory.createLink("Yahoo!Korea", "http://www.yahoo.co.kr/");
    const excite: Link = factory.createLink("Excite", "http://www.excite.com/");
    const google: Link = factory.createLink("Yahoo!Korea", "http://www.google.com/");

    const traynews: Tray = factory.createTray("신문");
    traynews.add(joins);
    traynews.add(chosun);

    const trayyahoo: Tray = factory.createTray("Yahoo!");
    trayyahoo.add(us_yahoo);
    trayyahoo.add(kr_yahoo);

    const traysearch: Tray = factory.createTray("검색엔진");
    traysearch.add(trayyahoo);
    traysearch.add(excite);
    traysearch.add(google);

    const page: Page = factory.createPage("LinkPage", "영진닷컴");
    page.add(traynews);
    page.add(traysearch);
    page.output();

    reader.close();
});
