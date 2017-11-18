import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddIdea from 'material-ui/svg-icons/content/add';
import { inputStyle } from '../../../utils/constants/styles';
import { IdeaWrapper, Text, Input } from './NewIdea_styles';

export default class NewIdea extends Component {
  state = {
    open: false,
    ideaText: '',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  submit = () => {
    const { socket, room } = this.props;
    console.log(this.state.ideaText);
    socket.emit('addIdea', {
      name: room,
      idea: this.state.ideaText,
    });
    this.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Anuluj"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Dodaj pomysł"
        primary
        keyboardFocused
        onClick={this.submit}
      />,
    ];

    return [
      <IdeaWrapper key="IdeaWrapper" onClick={this.handleOpen}>
        <AddIdea />
        <Text>Dodaj pomysł</Text>
      </IdeaWrapper>,
      <Dialog
        key="Dialog"
        title="Dialog With Actions"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <Input
          floatingLabelText="Nazwa pokoju"
          value={this.state.ideaText}
          onChange={e => this.setState({ ideaText: e.target.value })}
          {...inputStyle}
        />
      </Dialog>,
    ];
  }
}
