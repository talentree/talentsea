import './pages/home.page';
import './pages/admin-login.page';
import './pages/admin-new-game.page';
import './pages/admin-console.page';
import './pages/team-login.page';
import './pages/team-console.page';

import './samples/engine-sample.page';
import './samples/console-sample.page';
import { adminGuard } from './core/admin.guard';

export class RouterComponent extends HTMLElement {

    constructor() {
        super();
        this.routes = [
            { path: '/', element: 'home-page' },
            { path: '/admin-login', element: 'admin-login-page' },
            { path: '/admin-newgame', element: 'admin-new-game-page', guard: adminGuard },
            { path: '/admin-console', element: 'admin-console-page', guard: adminGuard },
            { path: '/team-login', element: 'team-login-page' },
            { path: '/team-console', element: 'team-console-page' },

            { path: '/engine-sample', element: 'engine-sample-page' },
            { path: '/console-sample', element: 'console-sample-page' }
        ];
        window.addEventListener('popstate', () => this.navigate(document.location.pathname, false));
        this.navigate(document.location.pathname, true);

    }

    /*
    navigate(path) {
        console.log('cerco il path ', path);
        let route = this.routes.find(item => item.path === path);
        if (route) {
            if (route.guard) {
                this.navigate(route.guard);
            }
            else {
                const newElement = document.createElement(route.element);
                while (this.firstChild) {
                    this.removeChild(this.firstChild);
                }
                this.appendChild(newElement);
                setTimeout(() => {
                    
                    let activeRoutes = Array.from(this.querySelectorAll('[route]'));
                    activeRoutes.forEach(activeRoute => {
                        activeRoute.addEventListener('click', () => {
                            this.navigate(activeRoute.attributes.route.value);
                            console.log(activeRoute);
                        });
                    })
                    
                }, 0);

                console.log(route.path);
                document.title = 'Navigator ' + route.path;
                history.pushState({}, '', route.path);
            }
        }
    }
    */


    setListenerToActiveRoutes() {
        let activeRoutes = Array.from(this.querySelectorAll('[route]'));
        activeRoutes.forEach(activeRoute => {
            activeRoute.addEventListener('click', () => {
                this.navigate(activeRoute.attributes.route.value, true);
                console.log(activeRoute);
            });
        })
    }

    navigate(path, pushState) {
        let route = this.routes.find(item => item.path === path);
        if (route) {
            if (route.guard) {
                this.navigate(route.guard);
            }
            else {
                const newElement = document.createElement(route.element);
                while (this.firstChild) {
                    this.removeChild(this.firstChild);
                }
                this.appendChild(newElement);
                setTimeout(() => {
                    this.setListenerToActiveRoutes();
                }, 0);
                document.title = 'Talentsea ' + route.path;
                if (pushState) {
                    history.pushState({}, '', route.path);
                }
            }
        }
    }

}

customElements.define('router-component', RouterComponent);