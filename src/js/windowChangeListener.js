import apiQuery from './ticketmasterAPI';
export function displayWindowSize() {
  // Get width and height of the window excluding scrollbars
  const width = document.documentElement.clientWidth;
  //   console.log('w: ', w);
  if (width >= 768 && width <= 1024) {
    apiQuery.size = 21;
    // console.log('size = 21');
    return;
  }
  apiQuery.size = 20;
  //   console.log('size = 20');
}
