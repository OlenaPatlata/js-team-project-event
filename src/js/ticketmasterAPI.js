export default class APIQuery {
  #keyword = ''; //приватная переменная класса
  constructor() {
    this.API_KEY = 'RmnlUoo1ahrXxdghcRDQ1mLYffidaAYw';
    this.ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/';
    this.EvID = 'Z7r9jZ1AdaeGo';
  }
  async GetEvents() {
    try {
      const projAPI = await fetch(`${this.ROOT_URL}events.json?apikey=${this.API_KEY}`);
      const projAPI_JSONED = await projAPI.json();
      return projAPI_JSONED;
    } catch (error) {
      console.log(error);
    }
  }
  async GetEventsID() {
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
  async testme() {
    const res = await fetch(
      `${this.ROOT_URL}events.json?keyword=${this.keyword}&apikey=${this.API_KEY}`,
    );
    console.log('res: ', res);
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
}
