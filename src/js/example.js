//template
import apiQuery from './ticketmasterAPI';
var debounce = require('lodash.debounce');

async function TEST_API_FUNC() {
  // const test = await APIinstance.GetEvents();
  // console.log('test: ', test);
  // const testID = await APIinstance.GetEventsID();
  // console.log('testID: ', testID);
  // let changeID = APIinstance.eventID = 'vvG1YZpsud8PHH';
  // const testIDTWO = await APIinstance.GetEventsID();
  // console.log('testIDTWO: ', testIDTWO);
  // const adele = await APIinstance.testme();
  // console.log('adele: ', adele);
}
// TEST_API_FUNC();

let x = document.getElementById('searchbar_js');
x.addEventListener('input', debounce(listenToSearch, 250));
async function listenToSearch(a) {
  console.log(a.target.value);
  APIinstance.keyword = a.target.value.trim();
  try {
    const xx = await APIinstance.testme();
    if (!xx._embedded) {
      return;
      //здесь можно поставить свою заплатку в случае если ничего не найдено
    }
    console.log('xx: ', xx._embedded.events);
  } catch (error) {
    console.log(error.message);
  }
}
