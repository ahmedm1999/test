import { renderBlogsResult, renderUsersResult, renderTagsResult } from './render-search-result.js';

const search_input = document.getElementById("search-bar");
const search_input_label = document.getElementById('search-input-label');
var res_container = document.querySelector('.res-container');
const search_nav = document.getElementById('search-nav-bar') ;

// Search input onfocus
const searchFocusing = () => {
    search_input_label.classList.add('d-none');
    search_input.setAttribute('placeholder', "Search");
    search_input.classList.add('search-focus');
}

search_input.addEventListener('focus', searchFocusing);

// Search input onLosefocus

const searchLoseFocusing = () => {
    if (search_input.value === "") {
        search_input_label.classList.remove('d-none');
        search_input.setAttribute('placeholder', "");
        search_input.classList.remove('search-focus');
    }
}

search_input.addEventListener('focusout', searchLoseFocusing);

// Search auto complete process ...
const searchEvent = 'all';
const search_option_bt = document.getElementsByClassName('search-option-bt');
var allData = {};

const fetchData = () => {
    Promise.all([
        fetch('http://localhost:8000/blogs'),
        fetch('http://localhost:8000/users'),
        fetch('http://localhost:8000/tags')
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        // store the data to the allData Var
        allData['blog'] = data[0];
        allData['user'] = data[1];
        allData['tag'] = data[2];
    }).catch(function (error) {
        console.log(error);
    });
}
fetchData();
const filterSearchResult = (text, type) => {
    let matches = []
    if (text.length === 0) {
        res_container.classList.add('d-none');
        search_nav.classList.add('d-none');
        return [];
    }

    matches = allData[type].filter(result => {
        const regx = new RegExp(`^${text}`, 'gi'); // We must work to improve our regular expretion
        return result[`${type}_title`].match(regx);
    })
    return matches;
}
const search = (text, type) => {
    switch (type) {
        case 'all':
        case 'blog':
            renderBlogsResult(filterSearchResult(text, 'blog')); if (type !== 'all') break;
        case 'user':
            renderUsersResult(filterSearchResult(text, 'user')); if (type !== 'all') break;
        case 'tag':
            renderTagsResult(filterSearchResult(text, 'tag')); if (type !== 'all') break;
    }
}


search_input.addEventListener('input', () => {
    res_container.classList.remove('d-none');
    search_nav.classList.remove('d-none');
    res_container.innerHTML = '';
    search(search_input.value, searchEvent);
});

for (let i = 0; i < search_option_bt.length; i++) {
    search_option_bt[i].addEventListener('click', () => {
        search(search_input.value, search_option_bt[i].getAttribute('data-search'));
    });
}