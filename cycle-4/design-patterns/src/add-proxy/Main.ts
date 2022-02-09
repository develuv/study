import {Add} from './Add';
import {ProxyFactory} from './ProxyFactory';
import {callCount} from './AddHelper';

const add = ProxyFactory.create();

let sum = add.add(1, 2);
sum = add.add(sum, 2);
sum = add.add(sum, 2);
sum = add.add(sum, 2);
sum = add.add(sum, 2);

console.log("최종 합은 얼마야? : ", sum);
console.log("몇번 연산 했나? : ", callCount(add));