import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from './EditTicketForm';
import { connect } from "react-redux";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedTicket: null,
      editing: false 
    };
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: "ADD_TICKET",
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.state({editing: true});
  }

  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
      this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: "ADD_TICKET",
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({ 
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  render() {
    let currentVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
     } else if (this.state.selectedTicket != null) {
        currentVisibleState = 
          <TicketDetail
          ticket = {this.state.selectedTicket}
          onClickingDelete = {this.handleDeletingTicket}
          onClickingEdit = {this.handleEditClick} />
        buttonText = "Return to Ticket List";
      } else if (this.state.formVisibleOnPage) {
          currentVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
          buttonText = "Return to Ticket List";
        } else {
          currentVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
          buttonText = "Add Ticket";
        }
    return (
      <React.Fragment>
        {currentVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl = connect()(TicketControl);

export default TicketControl;