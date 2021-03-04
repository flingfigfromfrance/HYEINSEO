/* mouse */
var cursorBGEl = document.querySelector('#cursor-bg'),
    progressEl = document.querySelector('#progress');
    overMenu = document.querySelector('.side-menu>ul');
    overDot = document.querySelector('.btn-menu')
    
/* enter */
function mouseEnter(e){
    cursorBGEl.style.width = '40px';
    cursorBGEl.style.height = '40px';
    cursorBGEl.style.backgroundColor = '#fff';
    cursorBGEl.style.mixBlendMode = 'difference';
}

/* leave */
function mouseLeave(){
    cursorBGEl.style.width = '40px';
    cursorBGEl.style.height = '40px';
    cursorBGEl.style.backgroundColor = 'transparent';
    cursorBGEl.style.mixBlendMode = 'none';
}

function onMouseMove(e){
    var posX = e.clientX, 
        posY = e.clientY;

    gsap.killTweensOf(cursorBGEl);
    gsap.killTweensOf(progressEl);

    gsap.to(cursorBGEl, { top: posY, left: posX, duration: 0.4, ease: 'sine.out' });
    gsap.to(progressEl, { top: posY, left: posX, duration: 0.25, ease: 'sine.out' });
}
overMenu.addEventListener('mouseenter', mouseEnter);
overMenu.addEventListener('mouseleave', mouseLeave);
overDot.addEventListener('mouseenter', mouseEnter);
overDot.addEventListener('mouseleave', mouseLeave);
window.addEventListener('mousemove', onMouseMove); 

/* menu */
var btnMenuEl = document.querySelector("#btn-menu"),
    sideMenuEl = document.querySelector("#side-menu"),
    btnCloseEl = document.querySelector("#btn-close"),
    sideMenuItemEl = sideMenuEl.querySelectorAll("li"),
    _isOpen = false,
    _isAni = false;

function onClickBtnMenu(e){
    e.preventDefault();
    if(_isOpen || _isAni) return;
    if(!_isOpen){
        _isOpen = true;
        _isAni = true;
        sideMenuEl.classList.add("open");
        setTimeout(function(){
            _isAni = false;
            for(var i = 0; i < sideMenuItemEl.length; i++){
                addAni(i);
            }
        }, 380);
    }
}
function onClickBtnClose(e){
    e.preventDefault();
    if(!_isOpen || _isAni) return;
    if(_isOpen){
        _isOpen = false;
        _isAni = true;
        sideMenuEl.classList.remove("open");
        setTimeout(function(){
            _isAni = false;
            for(var i = 0; i < sideMenuItemEl.length; i++){
            sideMenuItemEl[i].classList.remove("ani");
            }
        }, 400);
    }
}
function addAni(id){
    setTimeout(function(){
        sideMenuItemEl[id].classList.add("ani");
    }, 40 * id);
}
function addEvent() {
    btnMenuEl.addEventListener("click", onClickBtnMenu);
    btnCloseEl.addEventListener("click", onClickBtnClose);
}
function init() {
    addEvent();
}
init();
