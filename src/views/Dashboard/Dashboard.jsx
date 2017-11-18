import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import io from 'socket.io-client';
import Idea from './Idea/Idea';
import NewIdea from './NewIdea/NewIdea';
import { createBoard } from '../../actions/board';
import { Wrapper, Ideas, Panel, Middle, Header, Time, Button, End } from './Dashboard_styles';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.boardName = this.props.match.params.boardName;
    this.socket = io(__ROOT_URL__);

    this.state = {
      name: '',
      time: '',
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

  render() {
    return (
      <Wrapper>
        <Panel>
          <Middle>
            <Header>Czas do końca</Header>
            <Time>10:38</Time>
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
      </Wrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(Dashboard);
