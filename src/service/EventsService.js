import ApiManager from "./Api/ApiManager";

const eventsEndpoint = "/ems/events"

class EventsService {
    getEventsList = async () => {
        return ApiManager.apiGet(eventsEndpoint);
    }

    createEvent = async (data) => {
        return ApiManager.apiPost(eventsEndpoint, data);
    }
}

export default new EventsService()