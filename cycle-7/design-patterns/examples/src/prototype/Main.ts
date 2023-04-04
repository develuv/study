import Manager from './Manager';
import UnderlinePen from './UnderlinePen';
import MessageBox from './MessageBox';
import Product from './Product';

// 준비
const manager: Manager = new Manager();
const upen = new UnderlinePen('~');
const mbox = new MessageBox('*');
const sbox = new MessageBox('/');

manager.register('strong message', upen);
manager.register('waring box', mbox);
manager.register('slash box', sbox);

// 생성
const p1: Product = manager.create('strong message');
p1.use('Hello, world.');

const p2: Product = manager.create('waring box');
p2.use('Hello, world.');

const p3: Product = manager.create('slash box');
p3.use('Hello, world.');
