export default abstract class Item {
    protected caption: string;

    protected constructor(caption: string) {
        this.caption = caption
    }

    public abstract makeHTML(): string;
}
