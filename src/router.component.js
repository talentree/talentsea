import { html } from '@polymer/lit-element';
import { NavElement } from './core/nav-element';

import HomePage from './home.page';
import JoinPage from './join.page';
import ConsolePage from './console.page';

export class RouterComponent extends HTMLElement {

    constructor(){
        super();
        this.routes = [
            {path: '/', element: 'home-page'},
            {path: '/join', element: 'join-page'},
            {path: '/console', element: 'console-page'}
        ];
        this.navigate(document.location.pathname);

    }

    navigate(path){
        let route = this.routes.find(item => item.path === path);
        if(route){
            const newElement = document.createElement(route.element);
            while(this.firstChild){
                this.removeChild(this.firstChild);
            }
            this.appendChild(newElement);
            setTimeout(()=>{
                let activeRoutes = Array.from(this.querySelectorAll('[route]'));
                activeRoutes.forEach(activeRoute => {
                    activeRoute.addEventListener('click', ()=>{
                        this.navigate(activeRoute.attributes.route.value);
                        console.log(activeRoute);
                    });
                })
            }, 0);
            
            history.pushState({}, '', route.path);
            
        }
    }
}

customElements.define('router-component', RouterComponent);