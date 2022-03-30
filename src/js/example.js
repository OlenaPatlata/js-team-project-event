//template
import API from './ticketmasterAPI';
const APIinstance = new API();
// -----------------------------
import newAPIQuery from './newAPI';
const newA = new newAPIQuery();
newA.eventKeyWord = 'sting';

async function TEST_API_FUNC() {
    const test = await APIinstance.GetEvents();
    console.log('test: ', test);
    // const testID = await APIinstance.GetEventsID();
    // console.log('testID: ', testID);
    // let changeID = APIinstance.eventID = 'vvG1YZpsud8PHH';
    // const testIDTWO = await APIinstance.GetEventsID();
    // console.log('testIDTWO: ', testIDTWO);
    // ---------------------------------------
    const testA = await newA.GetEventsByKeyWord()
    console.log('testA:', testA);
}
// TEST_API_FUNC();



