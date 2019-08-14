import { teamClassStandardProperties } from '../core/classes/team.class';

export let ArrayMapConverter = (function () {
    return {
        fromArrayToMap: fromArrayToMap,
        fromMapToArray: fromMapToArray
    };
})();

function fromArrayToMap(myArray) {
    let map = {};
    myArray.forEach((element, index) => {
        let objectProperty = index;
        if (element.name) {
            objectProperty = element.name;
            delete element.name;
        }

        map[objectProperty] = element;
    });

    return map;
}

function fromMapToArray(myMap) {
    let myArray = [];
    Object.keys(myMap).forEach((key, index) => {
        let element = myMap[key];
        if (!teamClassStandardProperties.find(prop => prop === key)) {
            element['name'] = key;
        }

        myArray.push(element);
    })
    return myArray;
}