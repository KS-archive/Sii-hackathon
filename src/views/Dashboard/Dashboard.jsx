import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import FlatButton from 'material-ui/FlatButton';
import io from 'socket.io-client';
import Idea from './Idea/Idea';
import NewIdea from './NewIdea/NewIdea';
import { getCookie } from '../../utils/cookies';
import { inputStyle } from '../../utils/constants/styles';
import { initializeBoard, phaseChange } from '../../actions/board';
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

      this.socket.on('phasechange', (data) => {
        this.props.phaseChange(data);
      });

      this.socket.on('changeIdeas', (data) => {
        console.log(data);
        this.props.addIdea(data);
      });
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.board.time !== this.state.time && !this.timeInitialized) {
      this.timeInitialized = true;
      this.setState({ time: nextProps.board.time }, () => {
        this.initializeClock(nextProps.board.time);
      });
    }
  }

  initializeClock = (endtime) => {
    const timeToEnd = new Date(Date.parse(new Date()) + endtime);
    const updateClock = () => {
      const t = this.getTimeRemaining(timeToEnd);
      const minutes = ('0' + t.minutes).slice(-2);
      const seconds = ('0' + t.seconds).slice(-2);
      this.setState({ timeString: `${minutes}:${seconds}` });

      if (t.total <= 0) {
        clearInterval(this.timeinterval);
      }
    }
    updateClock();
    this.timeinterval = setInterval(updateClock, 1000);
  }

  getTimeRemaining = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, minutes, seconds };
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
            <Time>{this.state.timeString}</Time>
            {this.props.board.phase === 2 &&
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
          <NewIdea socket={this.socket} room={this.boardName} />
          {this.props.ideas.map(idea => <Idea key={idea.id} text={idea.content} />)}
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
  return bindActionCreators({ initializeBoard, phaseChange, addIdea }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
