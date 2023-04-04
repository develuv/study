import Item from './Item';

export default abstract class Page {
    protected title: string;
    protected author: string;
    protected content: Array<Item> = [];

    protected constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }

    public add(item: Item): void {
        this.content.push(item);
    }

    public output(): void {
        // 파일로 만들려고 했으나 console로 출력
        console.log(this.makeHTML());
    }

    public abstract makeHTML(): string;
}
