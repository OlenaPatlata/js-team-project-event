export default class APIQuery {
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
  get eventID() {
    return this.EvID;
  }
  set eventID(newId) {
    this.EvID = newId;
  }
}
