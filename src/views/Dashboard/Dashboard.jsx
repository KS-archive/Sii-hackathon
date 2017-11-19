import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import FlatButton from 'material-ui/FlatButton';
import io from 'socket.io-client';
import Idea from './Idea/Idea';
import NewIdea from './NewIdea/NewIdea';
import { getCookie } from '../../utils/cookies';
import { inputStyle } from '../../utils/constants/styles';
import { initializeBoard, phaseChange, changeDeadline } from '../../actions/board';
import { addIdea } from '../../actions/ideas';
import { Wrapper, Ideas, Panel, Middle, Header, Time, Button, End, StyledDialog, Input } from './Dashboard_styles';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.boardName = this.props.match.params.boardName;
    this.socket = io(__ROOT_URL__);
    this.timeInitialized = false;

    this.state = {
      time: 0,
      open: false,
      personText: '',
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

      this.socket.emit('checkTime', this.boardName);

      this.socket.on('phasechange', (data) => {
        this.props.phaseChange(data);
      });

      this.socket.on('changeIdeas', (data) => {
        this.props.addIdea(data);
      });

      this.socket.on('deadline', (miliseconds) => {
        this.props.changeDeadline(miliseconds);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.board.time !== nextProps.board.time) {
      this.setState({ time: nextProps.board.time });
    }
    if (this.props.board.phase === 1 && nextProps.board.phase === 2) {
      this.interval = setInterval(() => {
        if (this.state.time === 0) {
          clearInterval(this.interval);
        } else {
          this.socket.emit('checkTime', this.boardName);
          this.setState({ time: this.state.time - 1000 });
        }
      }, 1000);
    }
    if (this.props.board.phase === 2 && nextProps.board.phase === 3) {
      clearInterval(this.interval);
      this.setState({ time: 0 });
    }
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
    this.socket.emit('addParticipant', {
      fullname,
      name: this.boardName,
    });
    this.setState({ open: false });
  }

  startSession = () => {
    this.socket.emit('startTime', {
      name: this.boardName,
      time: this.props.board.time,
    });
  }

  endSession = () => {
    this.socket.emit('goThirdPhase', this.boardName);
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

  parseTime = (miliseconds) => {
    let minutes = Math.floor((miliseconds / 1000 / 60) % 60);
    let seconds = Math.floor((miliseconds / 1000) % 60);
    minutes = ('0' + minutes).slice(-2);
    seconds = ('0' + seconds).slice(-2);
    return `${minutes}:${seconds}`;
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
            <Time>{this.parseTime(this.state.time)}</Time>
            {this.props.board.phase === 2 && false &&
              <Button
                primary
                label="Dodaj minutę"
                onClick={this.addMinute}
              />
            }
          </Middle>
          {this.phaseButton()}
        </Panel>
        <Ideas>
          {(this.props.board.phase === 2) &&
            <NewIdea socket={this.socket} room={this.boardName} />
          }
          {(this.props.board.phase !== 1) &&
            this.props.ideas.map(idea => (
              <Idea
                key={idea.id}
                text={idea.content}
                phase={this.props.board.phase}
              />
            ))}
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
  return bindActionCreators({ initializeBoard, phaseChange, addIdea, changeDeadline }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
