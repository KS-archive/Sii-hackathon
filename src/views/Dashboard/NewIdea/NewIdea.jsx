import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddIdea from 'material-ui/svg-icons/content/add';
import { inputStyle } from '../../../utils/constants/styles';
import { ExtendedIdeaWrapper, StyledDialog, Text, Input } from './NewIdea_styles';

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
        onClick={this.submit}
      />,
    ];

    return [
      <ExtendedIdeaWrapper key="ExtendedIdeaWrapper" onClick={this.handleOpen}>
        <AddIdea />
        <Text>Dodaj pomysł</Text>
      </ExtendedIdeaWrapper>,
      <StyledDialog
        key="Dialog"
        title="Dodaj pomysł"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <Input
          floatingLabelText="Opis pomysłu"
          value={this.state.ideaText}
          onChange={e => this.setState({ ideaText: e.target.value })}
          multiLine
          rows={3}
          rowsMax={3}
          {...inputStyle}
        />
      </StyledDialog>,
    ];
  }
}
