

function modal(actives,target){
    actives.addEventListener('click', function(){
        target.classList.toggle('open');
    });

}
const modal01 = document.getElementById('modal01');
const click01 = document.querySelector('.newBtn');

modal(click01,modal01);
modal(document.querySelector('.modal01-close_btn'),modal01);
modal(document.querySelector('.modal_close'),modal01);

