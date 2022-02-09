import {AddProxy} from './AddProxy';
import {Add} from './Add';

export class ProxyFactory {
    static create(): Add {
        return new AddProxy();
    }
}