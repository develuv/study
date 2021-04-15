import PageData from './wiki/PageData';
import WikiPage from './wiki/WikiPage';
import PageCrawlerImpl from './wiki/PageCrawlerImpl';
import {SuiteResponder} from './enum/SuiteResponder';
import WikiPagePath from './wiki/WikiPagePath';
import PathParser from './wiki/PathParser';

export default class FitnessExample {
    public testableHtml(pageData: PageData, includeSuiteSetup: boolean): string {
        const wikiPage: WikiPage = pageData.getWikiPage();
        const buffer: Array<string> = [];

        if (pageData.hasAttribute("Test")) {
            if (includeSuiteSetup) {
                const suiteSetup: WikiPage = PageCrawlerImpl.getInheritedPage(SuiteResponder.SUITE_SETUP_NAME, wikiPage);
                if (suiteSetup !== null) {
                    const pagePath: WikiPagePath = wikiPage.getPageCrawler().getFullPath(suiteSetup);
                    const pagePathName: string = PathParser.render(pagePath);
                    buffer.push("!include -setup .");
                    buffer.push(pagePathName);
                    buffer.push("\n");
                }
            }

            const setup: WikiPage = PageCrawlerImpl.getInheritedPage("SetUp", wikiPage);
            if (setup !== null) {
                const setupPath: WikiPagePath = wikiPage.getPageCrawler().getFullPath(setup);
                const setupPathName: string = PathParser.render(setupPath);
                buffer.push("!include -setup .");
                buffer.push(setupPathName);
                buffer.push("\n");
            }
        }

        buffer.push(pageData.getContent());

        if (pageData.hasAttribute("Test")) {
            const teardown: WikiPage = PageCrawlerImpl.getInheritedPage("TearDown", wikiPage);
            if (teardown !== null) {
                const tearDownPath: WikiPagePath = wikiPage.getPageCrawler().getFullPath(teardown);
                const tearDownPathName: string = PathParser.render(tearDownPath);
                buffer.push("!include -teardown .");
                buffer.push(tearDownPathName);
                buffer.push("\n");
            }
            if (includeSuiteSetup) {
                const suiteTeardown: WikiPage = PageCrawlerImpl.getInheritedPage(SuiteResponder.SUITE_TEARDOWN_NAME, wikiPage);
                if (suiteTeardown !== null) {
                    const pagePath: WikiPagePath = wikiPage.getPageCrawler().getFullPath(suiteTeardown);
                    const pagePathName: string = PathParser.render(pagePath);
                    buffer.push("!include -teardown .");
                    buffer.push(pagePathName);
                    buffer.push("\n");
                }
            }
        }

        pageData.setContent(buffer.toString());
        return pageData.getHtml();
    }
}