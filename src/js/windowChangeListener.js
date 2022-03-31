import API from './ticketmasterAPI'; //испорт апишки
const APIinstance = new API(); //новый екземпляр класса
export function displayWindowSize() {
  // Get width and height of the window excluding scrollbars
  var w = document.documentElement.clientWidth;

  //   console.log('w: ', w);
  if (w > 720 && w < 1024) {
    APIinstance.size = 21;
    // console.log('size = 21');
    return;
  }
  APIinstance.size = 20;
  //   console.log('size = 20');
}
