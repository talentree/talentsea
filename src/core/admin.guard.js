import { AdminState } from "./admin.state";

//ritorna il path a cui reindirizzare l'utente oppure ''
export function adminGuard() {
    if (!AdminState.uid) { return '/admin-login'; }
    else { return ''; }
}