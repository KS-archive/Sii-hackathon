import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import FlatButton from 'material-ui/FlatButton';
import io from 'socket.io-client';
import Idea from './Idea/Idea';
import NewIdea from './NewIdea/NewIdea';
import { inputStyle } from '../../utils/constants/styles';
import { createBoard } from '../../actions/board';
import { Wrapper, Ideas, Panel, Middle, Header, Time, Button, End, StyledDialog, Input } from './Dashboard_styles';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.boardName = this.props.match.params.boardName;
    this.socket = io(__ROOT_URL__);

    this.state = {
      time: '10:38',
      open: false,
      personText: '',
    };
  }

  componentWillMount() {
    this.socket.emit('loadRoom', this.boardName);
    this.socket.on('connection_response', () => {
    });
  }

  addMinute = () => {
    this.socket.emit('setTime', {
      name: this.boardName,
      time: 1000,
    });
  }

  endSession = () => {
    this.socket.emit('clear', this.boardName);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  submit = () => {
    console.log(this.state.personText);
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
      <Wrapper key="Wrapper">
        <Panel>
          <Middle>
            <Header>Czas do końca</Header>
            <Time>{this.state.time}</Time>
            <Button
              primary
              label="Dodaj minutę"
              onClick={this.addMinute}
            />
          </Middle>
          <End onClick={this.endSession}>Zakończ</End>
        </Panel>
        <Ideas>
          <NewIdea socket={this.socket} room={this.boardName} />
          <Idea text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et libero orci. Sed sit amet imperdiet orci. Donec ornare, felis eu sodales finibus, massa libero hendrerit cras amet." />
        </Ideas>
      </Wrapper>,
      <StyledDialog
        key="Dialog"
        title="Dodaj pomysł"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <Input
          floatingLabelText="Imię i nazwisko"
          value={this.state.personText}
          onChange={e => this.setState({ personText: e.target.value })}
          multiLine
          rows={3}
          rowsMax={3}
          {...inputStyle}
        />
      </StyledDialog>,
    ];
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(Dashboard);
