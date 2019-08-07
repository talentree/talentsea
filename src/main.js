import HomePage from './home.page'
import RouterComponent from './router.component'

let btn = document.querySelector("#btn");
btn.addEventListener('click', (e)=>{
    console.log('cliccato');
    document.location.pathname = '/console';
    router.pathName = document.location.pathname;
})

let router = document.querySelector("#router");
router.pathName = document.location.pathname;