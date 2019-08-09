import './home.page';
import './samples/engine-sample.page';
import './samples/console-sample.page';

export class RouterComponent extends HTMLElement {

    constructor(){
        super();
        this.routes = [
            {path: '/', element: 'home-page'},
            {path: '/engine-sample', element: 'engine-sample-page'},
            {path: '/console-sample', element: 'console-sample-page'}
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