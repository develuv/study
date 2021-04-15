import FitnessExample from '../src/Fitness/FitnessExample';
import WikiPage from '../src/Fitness/wiki/WikiPage';
import PageData from '../src/Fitness/wiki/PageData';
import PageCrawlerImpl from '../src/Fitness/wiki/PageCrawlerImpl';
import PathParser from '../src/Fitness/wiki/PathParser';

describe.skip("test add function", () => {
    const expectedResultForTestCase: string = `<div class="setup">
                                                    <div style="float: right;" class="meta"><a href="javascript:expandAll();">Expand All</a> | <a href="javascript:collapseAll();">Collapse All</a></div>
                                                    <a href="javascript:toggleCollapsable('');">
                                                        <img src="/files/images/collapsableOpen.gif" class="left" id="img"/>
                                                    </a>
                                                    &nbsp;<span class="meta">Set Up: <a href="SuiteSetUp">.SuiteSetUp</a> <a href="SuiteSetUp?edit&amp;redirectToReferer=true&amp;redirectAction=">(edit)</a></span>
                                                    <div class="collapsable" id="">suiteSetUp</div>
                                                </div>
                                                <div class="setup">
                                                    <div style="float: right;" class="meta"><a href="javascript:expandAll();">Expand All</a> | <a href="javascript:collapseAll();">Collapse All</a></div>
                                                    <a href="javascript:toggleCollapsable('');">
                                                        <img src="/files/images/collapsableOpen.gif" class="left" id="img"/>
                                                    </a>
                                                    &nbsp;<span class="meta">Set Up: <a href="SetUp">.SetUp</a> <a href="SetUp?edit&amp;redirectToReferer=true&amp;redirectAction=">(edit)</a></span>
                                                    <div class="collapsable" id="">setup</div>
                                                </div>
                                                <span class="meta">variable defined: TEST_SYSTEM=slim</span><br/>the content!include -teardown <a href="TearDown">.TearDown</a><br/><div class="teardown">
                                                    <div style="float: right;" class="meta"><a href="javascript:expandAll();">Expand All</a> | <a href="javascript:collapseAll();">Collapse All</a></div>
                                                    <a href="javascript:toggleCollapsable('');">
                                                        <img src="/files/images/collapsableOpen.gif" class="left" id="img"/>
                                                    </a>
                                                    &nbsp;<span class="meta">Tear Down: <a href="SuiteTearDown">.SuiteTearDown</a> <a href="SuiteTearDown?edit&amp;redirectToReferer=true&amp;redirectAction=">(edit)</a></span>
                                                    <div class="collapsable" id="">suiteTearDown</div>
                                                </div>`;

    const expectedResultForNonTestCase: string = `<div class="setup">
                                                    <div style="float: right;" class="meta"><a href="javascript:expandAll();">Expand All</a> | <a href="javascript:collapseAll();">Collapse All</a></div>
                                                    <a href="javascript:toggleCollapsable('');">
                                                        <img src="/files/images/collapsableOpen.gif" class="left" id="img"/>
                                                    </a>
                                                    &nbsp;<span class="meta">Set Up: <a href="SetUp">.SetUp</a> <a href="SetUp?edit&amp;redirectToReferer=true&amp;redirectAction=">(edit)</a></span>
                                                    <div class="collapsable" id="">setup</div>
                                                </div>
                                                <div class="setup">
                                                    <div style="float: right;" class="meta"><a href="javascript:expandAll();">Expand All</a> | <a href="javascript:collapseAll();">Collapse All</a></div>
                                                    <a href="javascript:toggleCollapsable('');">
                                                        <img src="/files/images/collapsableOpen.gif" class="left" id="img"/>
                                                    </a>
                                                    &nbsp;<span class="meta">Set Up: <a href="SuiteSetUp">.SuiteSetUp</a> <a href="SuiteSetUp?edit&amp;redirectToReferer=true&amp;redirectAction=">(edit)</a></span>
                                                    <div class="collapsable" id="">suiteSetUp</div>
                                                </div>
                                                <div class="setup">
                                                    <div style="float: right;" class="meta"><a href="javascript:expandAll();">Expand All</a> | <a href="javascript:collapseAll();">Collapse All</a></div>
                                                    <a href="javascript:toggleCollapsable('');">
                                                        <img src="/files/images/collapsableOpen.gif" class="left" id="img"/>
                                                    </a>
                                                    &nbsp;<span class="meta">Set Up: <a href="SetUp">.SetUp</a> <a href="SetUp?edit&amp;redirectToReferer=true&amp;redirectAction=">(edit)</a></span>
                                                    <div class="collapsable" id="">setup</div>
                                                </div>
                                                <span class="meta">variable defined: TEST_SYSTEM=slim</span><br/>the content!include -teardown <a href="TearDown">.TearDown</a><br/><div class="teardown">
                                                    <div style="float: right;" class="meta"><a href="javascript:expandAll();">Expand All</a> | <a href="javascript:collapseAll();">Collapse All</a></div>
                                                    <a href="javascript:toggleCollapsable('');">
                                                        <img src="/files/images/collapsableOpen.gif" class="left" id="img"/>
                                                    </a>
                                                    &nbsp;<span class="meta">Tear Down: <a href="SuiteTearDown">.SuiteTearDown</a> <a href="SuiteTearDown?edit&amp;redirectToReferer=true&amp;redirectAction=">(edit)</a></span>
                                                    <div class="collapsable" id="">suiteTearDown</div>
                                                </div>
                                                <div class="teardown">
                                                    <div style="float: right;" class="meta"><a href="javascript:expandAll();">Expand All</a> | <a href="javascript:collapseAll();">Collapse All</a></div>
                                                    <a href="javascript:toggleCollapsable('');">
                                                        <img src="/files/images/collapsableOpen.gif" class="left" id="img"/>
                                                    </a>
                                                    &nbsp;<span class="meta">Tear Down: <a href="TearDown">.TearDown</a> <a href="TearDown?edit&amp;redirectToReferer=true&amp;redirectAction=">(edit)</a></span>
                                                    <div class="collapsable" id="">teardown</div>
                                                </div>`;

    let pageData: PageData;
    let crawler: PageCrawlerImpl;
    let root: WikiPage;
    let testPage: WikiPage;

    const includeSuiteSetup = (b: boolean): boolean => {
        return b;
    }

    const addPage = (pageName: string, content: string): WikiPage => {
        return crawler.addPage(root, PathParser.parse(pageName), content);
    }


    beforeAll(() => {
        // crawler = root.getPageCrawler();
        // testPage = addPage("TestPage", "!define TEST_SYSTEM {slim}\n" + "the content");
        // addPage("SetUp", "setup");
        // addPage("TearDown", "teardown");
        // addPage("SuiteSetUp", "suiteSetUp");
        // addPage("SuiteTearDown", "suiteTearDown");

        // crawler.addPage(testPage, PathParser.parse("ScenarioLibrary"), "scenario library 2");

        // pageData = testPage.getData();
    });


    it("should return testPage", () => {
        const expectedResult: string = expectedResultForTestCase;
        let testableHtml: string = new FitnessExample().testableHtml(pageData, includeSuiteSetup(true));
        expect(testableHtml).toEqual(expectedResult);

        testableHtml = new FitnessExample().testableHtml(pageData, includeSuiteSetup(false));
        expect(testableHtml).toEqual(expectedResultForNonTestCase);
    });

});