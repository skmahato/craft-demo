import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import EventCard from "./EventCard";
import { API_ENDPOINT } from "../constants";
import { eventOverlap } from "../helpers";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((data) => data.json())
      .then((res) => setEvents(res));
  }, []);

  const handleSelect = (event) => {
    if (selectedEvents.length === 3) {
      return;
    }

    setEvents((prevState) => prevState.filter((elm) => elm.id !== event.id));
    setSelectedEvents((prevState) => [...prevState, event]);
  };

  const handleRemove = (event) => {
    setSelectedEvents((prevState) =>
      prevState.filter((elm) => elm.id !== event.id)
    );
    setEvents((prevState) => [...prevState, event]);
  };

  const isValidEvent = (event) => {
    if (selectedEvents.length === 0) {
      return true;
    }

    if (selectedEvents.length === 3) {
      return false;
    }

    return !eventOverlap(event, selectedEvents);
  };

  return (
    <div className="pageLayout">
      <Grid container spacing={2}>
        <Grid item sm={9}>
          <h2 className="eventsHeading">All Events</h2>

          <Grid container spacing={2}>
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isDisabled={!isValidEvent(event)}
                buttonText="Select"
                handleButtonClick={() => handleSelect(event)}
              />
            ))}
          </Grid>
        </Grid>

        <Grid item sm={3}>
          <h2 className="eventsHeading">Selected Events</h2>

          <Grid container spacing={2}>
            {selectedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                buttonText="Remove"
                handleButtonClick={() => handleRemove(event)}
                isSelectedCard
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
