export default abstract class Factory {

    public abstract createLink(caption: string, url: string);

    public abstract createTray(caption: string);

    public abstract createPage(title: string, author: string);
}

