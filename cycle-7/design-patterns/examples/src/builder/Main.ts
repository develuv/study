import TextBuilder from './TextBuilder';
import Director from './Director';
import HTMLBuilder from './HTMLBuilder';

import readline from 'readline';

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.question('What kind of ? (plain, html) : ', input => {

    if (input === 'plain') {

        let textbuilder = new TextBuilder();

        let director = new Director(textbuilder);
        director.construct();
        
        console.log(textbuilder.getResult());

    } else if (input === 'html') {

        let htmlbuilder = new HTMLBuilder();

        let director = new Director(htmlbuilder);
        director.construct();

        console.log(htmlbuilder.getResult());

    } else
        console.log('strike...');


    reader.close();
});
