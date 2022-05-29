import React from "react";
import Ticket from "./Ticket";
import { v4 } from 'uuid';
import PropTypes from "prop-types";

const ticket = {};
ticket.id = v4()

function TicketList(props) {
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket, index) =>
        <Ticket names={ticket.names}
                location={ticket.location}
                issue={ticket.issue}
                key={index}/>
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array
};

export default TicketList;