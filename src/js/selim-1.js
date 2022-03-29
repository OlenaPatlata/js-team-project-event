import APIQuery from './ticketmasterAPI';
import newAPIQuery from './newAPI';

const APIeventsByKey = new newAPIQuery();

const moreBtn = document.querySelector('.more-btn');

const name = '';

moreBtn.addEventListener('click', callback);

function callback() {
    APIeventsByKey.eventKeyWord = name;
    APIeventsByKey
}