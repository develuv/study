export default interface Builder {
    makeTitle(title: string);
    makeString(str: string);
    makeItems(items: Array<string>);
    close();
}
