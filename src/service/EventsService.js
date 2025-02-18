import ApiManager from "./Api/ApiManager";

const eventsEndpoint = "/ems/events"

class EventsService {
    getEventsList = async () => {
        return ApiManager.apiGet(eventsEndpoint);
    }

    createEvent = async (data) => {
        return ApiManager.apiPost(eventsEndpoint, data);
    }

    deleteEvent = async (id) => {
        return ApiManager.apiDelete(`${eventsEndpoint}/${id}`);
    }
    
    updateEvent = async (data) => {
        return ApiManager.apiPut(`${eventsEndpoint}/${data.id}`, data);
    }
}

export default new EventsService()