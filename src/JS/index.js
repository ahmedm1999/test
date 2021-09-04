
// left side menu 

const close_mob_left_menu = () => {
    menu_[0].classList.remove('showSideNav');
    menu_[0].classList.add('closeSideNav');
    setTimeout(() => {
        menu_[0].classList.remove('closeSideNav');
        menu_conteiner[0].style.display = 'none';
        window.overflowY = 'scroll';
    }, 400)

}

const open_menu_btn = document.querySelectorAll('#open_left_side_menu');
const close_menu_btn = document.querySelectorAll('#close-menu-btn');
const menu_ = document.getElementsByClassName('mob-left-menu-content');
const menu_conteiner = document.querySelectorAll('#mob-left-menu-container');
const navbar = document.getElementsByClassName('nav_bar_lg');


for (let index = 0; index < open_menu_btn.length; index++) {
    open_menu_btn[index].addEventListener('click', () => {
        menu_[0].classList.add('showSideNav');
        menu_conteiner[0].style.display = 'flex';
        window.overflowY = 'hidden';
    });
}


close_menu_btn[0].addEventListener('click', close_mob_left_menu);


// Dark/Light Mode toggler script 

var theme_toggler = document.querySelectorAll('img[data-name=theme]');
document.documentElement.setAttribute('data-theme', localStorage.getItem('data-theme'));
const modeTogglerIcon = () => {
    for (let i = 0; i < theme_toggler.length; i++) {
        if (localStorage.getItem('data-theme') === 'dark') {
            theme_toggler[i].setAttribute('src', 'sun.svg');
            console.log('sun')
        } else {
            theme_toggler[i].setAttribute('src', 'night-mode.svg');
            console.log('moon')
        }
    }
}
modeTogglerIcon();
const toDark = () => {
    localStorage.setItem('data-theme', 'dark')
    document.documentElement.setAttribute('data-theme', 'dark');
}
const toLight = () => {
    localStorage.setItem('data-theme', 'light')
    document.documentElement.setAttribute('data-theme', 'light');
}

Array.from(theme_toggler).map(toggler => {
    toggler.addEventListener('click', function () {
        if (toggler.getAttribute('data-check') === 'checked') {
            toggler.setAttribute('data-check', 'un');
            toDark();
        } else {
            toggler.setAttribute('data-check', 'checked');
            toLight();
        }
        modeTogglerIcon();
        trans()
    })
})


let trans = (img) => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000);
}

// Resizing procces ...

const makeResp = () => {
    document.documentElement.setAttribute('data-screen', 'res-mob');
}

if (window.innerWidth <= 767) {
    makeResp();
    close_mob_left_menu();
}
let screen_size = 0
window.addEventListener('resize', () => {
    screen_size = window.innerWidth;
    if (screen_size <= 767) {
        makeResp();
    } else {
        document.documentElement.setAttribute('data-screen', 'big');
    }
    if (screen_size >= 767) {
        close_mob_left_menu();
    }
});


// Tags Search 

const tags_cards = document.getElementsByClassName('tag-card') ;
const tags = ['javascript', 'angular', 'react', 'c++'] ;
const tags_search_input = document.getElementById('tags-search') ;
const searchValue = document.getElementById('search-value') ;
const noMatch = document.getElementById('no-match') ;

const hideTags = (hideCards) => {
    if(hideCards.length === tags_cards.length) {
        noMatch.classList.remove('d-none') ;
    } else {
        noMatch.classList.add('d-none')
    }
    for (const card of tags_cards) {
        if(hideCards.length === 0) {
            card.classList.remove('d-none')
        }
        else if (!hideCards.includes(card)) {
            card.classList.remove('d-none')
        } else {
            card.classList.add('d-none')
        }
    }
}

const searchTags = (value) => {
    let hide = [] ;
    const regx = new RegExp(`^${value}`, 'gi');

    for (const card of tags_cards) {
        if(!card.getAttribute('data-tagname').match(regx)) {
            hide.push(card) ;
        }
    }
    searchValue.innerText = value ;
    hideTags(hide) ;
}

tags_search_input.addEventListener('input', (e) => {
    searchTags(e.target.value) ;
}) ;