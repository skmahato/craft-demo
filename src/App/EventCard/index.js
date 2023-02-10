import React from "react";
import { Grid } from "@mui/material";

import { getTimeRange } from "../../helpers";
import "./EventCard.css";

function EventCard({
  event,
  isDisabled,
  buttonText,
  isSelectedCard,
  handleButtonClick,
}) {
  return (
    <Grid item sm={isSelectedCard ? 12 : 4}>
      <div className={isDisabled ? "disabledEvent" : "availableEvent"}>
        <div className="eventAvatar">
          {event.event_category?.[0]?.toUpperCase()}
        </div>
        <div className="eventBody">
          <div className="eventHeading">{event.event_name}</div>
          <div>({event.event_category})</div>
          <div>{getTimeRange(event)}</div>

          <button
            disabled={isDisabled}
            onClick={handleButtonClick}
            className={isSelectedCard ? "removeButton" : "selectButton"}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Grid>
  );
}

export default EventCard;
