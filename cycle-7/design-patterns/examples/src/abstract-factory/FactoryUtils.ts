import {factories} from './FactoryName';
import Factory from './Factory';

export const getFactory = (className: string): Factory => {
    if (factories[className] === undefined || factories[className] === null) {
        console.log(`클래스 ${className}이 발견되지 않았습니다.`);
        throw new Error(`Class type of \'${className}\' is not in the factories`);
    }

    return new factories[className]();
}
