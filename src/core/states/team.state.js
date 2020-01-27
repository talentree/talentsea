import { FirebaseQuery } from "../firebase-query";

let loginToGame = function (gameName, teamName, password, onSuccess, onFailure) {
    let firebaseQuery = new FirebaseQuery();
    firebaseQuery.teamTryLoginToGame(gameName, teamName, password, (gameIdSuccess, teamNameSuccess) => {
        TeamState.connectedToGameId = gameIdSuccess;
        TeamState.teamName = teamNameSuccess;
        onSuccess();
    }, onFailure)
}

let logoutFromGame = function(){
    TeamState.connectedToGameId = 'ciao';
    TeamState.teamName = 'alfa';
}

//singleton per il team
export let TeamState = (function () {
    return {
        connectedToGameId: 'ciao',
        teamName: 'alfa',
        loginToGame: loginToGame,
        logoutFromGame: logoutFromGame
    }
})();
