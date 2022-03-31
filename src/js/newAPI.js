export default class newAPIQuery {
    constructor(){
        this.API_KEY = 'RmnlUoo1ahrXxdghcRDQ1mLYffidaAYw';
        this.ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/';
        this.EvID = 'Z7r9jZ1AdaeGo';

        this.KeyWord = 'adele';
    }
    
    async GetEventsByKeyWord(){
        try {
            const projAPI = await fetch(`${this.ROOT_URL}events.json?keyword=${this.KeyWord}&apikey=${this.API_KEY}`);
            const projAPI_JSONED = await projAPI.json();
            return projAPI_JSONED;
        }
        catch (error){
            console.log(error);
        }

    }
    get eventKeyWord(){
        return this.KeyWord;
    }
    set eventKeyWord(newKeyWord){
        this.KeyWord = newKeyWord;
    }
    
}
