import './pages/home.page';
import './pages/admin-login/admin-login.page';
import './pages/admin-console/admin-console.page';
import './pages/team-login/team-login.page';
import './pages/team-console/team-console.page';

import './samples/engine-sample.page';
import './samples/console-sample.page';

import { adminGuard } from './core/guards/admin.guard';
import { teamGuard } from './core/guards/team.guard';


export class RouterComponent extends HTMLElement {

    constructor() {
        super();
        this.routes = [
            { path: '/', element: 'home-page' , description: "Home"},
            { path: '/admin-login', element: 'admin-login-page', description: "Login Amministratore" },
            { path: '/admin-console', element: 'admin-console-page' , description: "Console Amministratore", guard: adminGuard },
            { path: '/team-login', element: 'team-login-page' , description: "Login Squadra" },
            { path: '/team-console', element: 'team-console-page' , description: "Console Squadra" , guard : teamGuard},

            { path: '/engine-sample', element: 'engine-sample-page' },
            { path: '/console-sample', element: 'console-sample-page' }
        ];

        //aggiungo un listener per quando si preme i tasti avanti e indietro nel browser
        window.addEventListener('popstate', () => this.navigate(document.location.pathname, false));
        window.addEventListener('navigate', (e) => this.navigate(e.detail, true))
        //chiamo navigate anche al primo avvio della pagina
        this.navigate(document.location.pathname, true);
    }

    //imposta a tutti i pulsanti con l'attributo route un listener a navigate
    setListenerToActiveRoutes() {
        let activeRoutes = Array.from(this.querySelectorAll('[route]'));
        activeRoutes.forEach(activeRoute => {
            activeRoute.addEventListener('click', () => {
                this.navigate(activeRoute.attributes.route.value, true);
            });
        })
    }

    /*path è il percorso a cui si vuole andare, pushState indica se si deve fare il push nella history
    pushState = false nel listener a popstate altrimenti tasto back non funziona*/
    navigate(path, pushState) {
        //ottengo la rotta corretta
        let route = this.routes.find(item => item.path === path);
        if (route) {
            //controllo la relativa guardia se esiste
            let routeGuardResponse = route.guard && route.guard();
            if (routeGuardResponse) {
                //nel caso non possa accedere a quella pagina vengo reindirizzato
                this.navigate(routeGuardResponse, true);
            }
            else {
                //cambio la pagina a seconda del path
                const newElement = document.createElement(route.element);
                while (this.firstChild) {
                    this.removeChild(this.firstChild);
                }
                this.appendChild(newElement);

                /*chiamo la funzione setListener solo dopo timeout di 0 ms,
                in caso contario non si rilevano <button>, perchè appendChild() asincrona                
                */
                setTimeout(() => {
                    this.setListenerToActiveRoutes();
                }, 0);
                document.title = 'Talentsea - ' + route.description;
                if (pushState) {
                    history.pushState({}, '', route.path);
                }
            }
        }
        else{
            console.log ("ERROR 404 PAGE NOT FOUND");
            this.navigate('/', true);
        }
    }
}

customElements.define('router-component', RouterComponent);