export default class WikiPage {
    getPageCrawler() {
        return {
            getFullPath: (page: WikiPage) => new WikiPage()
        }
    }
}