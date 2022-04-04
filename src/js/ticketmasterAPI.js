class APIQuery {
  #keyword = ''; //приватная переменная класса
  #country = ''; //приватная переменная класса
  constructor() {
    this.API_KEY = 'RmnlUoo1ahrXxdghcRDQ1mLYffidaAYw';
    this.ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/';
    this.EvID = 'Z7r9jZ1AdaeGo';
    this.page = 0;
    this.size = 20;
  }
  async getEvents() {
    try {
      const projAPI = await fetch(
        `${this.ROOT_URL}events.json?apikey=${this.API_KEY}&size=${this.size}&page=${this.page}`,
      );
      const projAPI_JSONED = await projAPI.json();
      return projAPI_JSONED;
    } catch (error) {
      console.log(error);
    }
  }
  async getEventsID() {
    try {
      const projAPI = await fetch(
        `${this.ROOT_URL}events/${this.EvID}.json?apikey=${this.API_KEY}`,
      );
      const projAPI_JSONED = await projAPI.json();
      return projAPI_JSONED;
    } catch (error) {
      console.log(error);
    }
  }
  async search() {
    const res = await fetch(
      `${this.ROOT_URL}events.json?&size=${this.size}&page=${this.page}&keyword=${this.keyword}&countryCode=${this.country}&apikey=${this.API_KEY}`,
    );
    // console.log('res: ', res);
    if (!res.ok) {
      return Promise.reject(new Error('Not found'));
    }
    return res.json();
  }

  get eventID() {
    return this.EvID;
  }
  set eventID(newId) {
    this.EvID = newId;
  }
  get keyword() {
    return this.#keyword;
  }
  set keyword(newquery) {
    this.#keyword = newquery;
  }

  set currentPage(page) {
    this.page = page;
  }

  set currentSize(size) {
    this.size = size;
  }
  get country() {
    return this.#country;
  }
  set country(newCountry) {
    this.#country = newCountry;
  }
}
const apiQuery = new APIQuery();
export default apiQuery;
