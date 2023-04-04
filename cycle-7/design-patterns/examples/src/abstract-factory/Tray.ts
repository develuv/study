import Item from './Item';

export default abstract class Tray extends Item {
    protected tray: Array<Item> = [];

    protected constructor(caption: string) {
        super(caption);
    }

    public add(item: Item): void {
        this.tray.push(item);
    }
}
