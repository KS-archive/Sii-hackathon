import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import FlatButton from 'material-ui/FlatButton';
import io from 'socket.io-client';
import Idea from './Idea/Idea';
import NewIdea from './NewIdea/NewIdea';
import { getCookie } from '../../utils/cookies';
import { inputStyle } from '../../utils/constants/styles';
import { initializeBoard } from '../../actions/board';
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
      activeUser: '',
    };
  }

  componentWillMount() {
    this.props.initializeBoard(this.boardName, () => {
      this.socket.emit('loadRoom', this.boardName);
      this.socket.on('connection_response', () => {
        const cookie = getCookie('admin');

        if (cookie) {
          this.submit(null, cookie);
        } else {
          this.setState({ open: true });
        }
      });
    });
  }

  addMinute = () => {
    this.socket.emit('setTime', {
      name: this.boardName,
      time: 1000,
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  submit = (e, admin = '') => {
    const fullname = admin || this.state.personText;
    console.log(fullname);
    this.socket.emit('addParticipant', {
      fullname,
      name: this.boardName,
    });
    this.setState({ activeUser: fullname, open: false });
  }

  startSession = () => {
    this.socket.emit('startTime', {
      name: this.boardName,
      time: this.props.board.time,
    });
  }

  endSession = () => {
    console.log('Zakończono sesję kreatywną');
  }

  restartSession = () => {
    this.socket.emit('clear', this.boardName);
  }

  phaseButton = () => {
    switch (this.props.board.phase) {
      case 1:
        return <End onClick={this.startSession}>Rozpocznij</End>;
      case 2:
        return <End onClick={this.endSession}>Zakończ</End>;
      case 3:
        return <End onClick={this.restartSession}>Restart</End>;
      default:
        return <End onClick={this.startSession}>Rozpocznij</End>;
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Dołącz"
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
              label="Dołącz"
              onClick={this.addMinute}
            />
          </Middle>
          {this.phaseButton()}
        </Panel>
        <Ideas>
          <NewIdea socket={this.socket} room={this.boardName} />
          {this.props.ideas.map(idea => <Idea text={idea} />)}
        </Ideas>
      </Wrapper>,
      <StyledDialog
        key="Dialog"
        title="Dołącz do burzy mózgów"
        actions={actions}
        modal
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <Input
          floatingLabelText="Imię i nazwisko"
          value={this.state.personText}
          onChange={e => this.setState({ personText: e.target.value })}
          {...inputStyle}
        />
      </StyledDialog>,
    ];
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
    people: state.people,
    ideas: state.ideas,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeBoard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
