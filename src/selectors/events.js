export const findEventById = (state, id) => {
    let event = state.events.filteredEvents.filter(ev => ev.id === id);
    if(!event.length) event = state.events.events.filter(ev => ev.id === id);
    return event;
};