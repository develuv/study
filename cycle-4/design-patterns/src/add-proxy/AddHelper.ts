import {Add} from './Add';
import {AddProxy} from './AddProxy';

export const callCount = (add: Add): number => {
    try{
        return (add as AddProxy).callCount();
    }catch (e) {
        console.error('type mismatch...');
        throw e;
    }
}