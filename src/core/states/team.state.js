import { FirebaseQuery } from "../firebase-query";

let loginToGame = function (gameName, teamName, password, onSuccess, onFailure) {
    let firebaseQuery = new FirebaseQuery();
    firebaseQuery.teamTryLoginToGame(gameName, teamName, password, (gameIdSuccess, teamNameSuccess) => {
        TeamState.connectedToGameId = gameIdSuccess;
        TeamState.teamName = teamNameSuccess;
        onSuccess();
    }, onFailure)
}

let logoutFromGame = function () {
    let firebaseQuery = new FirebaseQuery();
    firebaseQuery.teamLogoutFromGame(TeamState.connectedToGameId, TeamState.teamName, () => {
        TeamState.connectedToGameId = '';
        TeamState.teamName = '';
    })
}

//singleton per il team
export let TeamState = (function () {
    return {
        connectedToGameId: 'ciao',
        teamName: 's1',
        loginToGame: loginToGame,
        logoutFromGame: logoutFromGame
    }
})();
