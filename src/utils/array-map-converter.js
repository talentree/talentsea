import { teamClassStandardProperties, teamClassKeyProperty } from '../core/classes/team.class';
import { Game } from '../core/classes/game.class';

//singleton
export let ArrayMapConverter = (function () {
    return {
        fromFirebaseDocToClassGame : fromFirebaseDocToClassGame,
        fromClassGameToFirebaseDoc : fromClassGameToFirebaseDoc
    };
})();

function teamsFromArrayToMap(myArray) {
    let map = {};
    //per ogni elemento dell'array
    myArray.forEach((element, index) => {
        /*devo assegnarlo ad una proprietà dell'oggetto.
        Di default il nome della proprietà è l'index dell'elemento nell'array*/
        let objectProperty = index;
        //se l'oggetto contiene la proprietà chiave
        if (Object.keys(element).find(key => key == teamClassKeyProperty)) {
            //mi salvo il valore di tale proprietà che verrà poi usato come valore nel nuovo oggetto
            objectProperty = element[teamClassKeyProperty];
            //la cancello
            delete element[teamClassKeyProperty];
        }
        //aggiungo l'elemento nella mappa
        map[objectProperty] = element;
    });

    return map;
}

function teamsFromMapToArray(myMap) {
    let myArray = [];
    //per ogni proprietà dell'oggetto
    Object.keys(myMap).forEach((key, index) => {
        //estraggo il valore di ogni proprietà
        let element = myMap[key];
        //se tale proprietà non è una di quelle standard significa che è il nome di una squadra
        if (!teamClassStandardProperties.find(prop => prop === key)) {
            //va quindi aggiunto all'elemento da inserire nell'array per conservarla
            element[teamClassKeyProperty] = key;
        }
        //pusho il nuovo elemento
        myArray.push(element);
    })
    return myArray;
}

function fromFirebaseDocToClassGame(game){
    let newGame = new Game();
    newGame.info = game.info;
    newGame.teams = teamsFromMapToArray(game.teams);
    return newGame;
}

function fromClassGameToFirebaseDoc(game){
    let newGame = {};
    newGame.info = game.info;
    newGame.teams = teamsFromArrayToMap(game.teams);
    return newGame;
}