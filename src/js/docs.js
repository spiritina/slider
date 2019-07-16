let sideMenu = document.getElementsByClassName('side-menu')[0];


sideMenu.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.classList.contains('side-menu-item')){ 
        deactivetePreviousActive();
        e.target.classList.add('active');}
});
function deactivetePreviousActive(){
    let items = document.querySelector('.side-menu-item.active');
    items.classList.remove('active');
}

window.addEventListener('scroll', (e) => {
    let articles = document.querySelectorAll('article');
    for(let i=0; i < articles.length; i++){
        let articleTop = articles[i].getClientRects()[0].top;
       if(articleTop >145 && articleTop <195){
           let id = articles[i].getAttribute('id');
           let menuItem = document.querySelector(`[href='#${id}']`);
           deactivetePreviousActive();
           menuItem.classList.add('active');
       }
        
    }
});