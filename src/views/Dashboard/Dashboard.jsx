import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import io from 'socket.io-client';
import { createBoard } from '../../actions/board';
import { Container, AppName, Middle, Header, Subheader, Input, Button } from './Dashboard_styles';

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

    this.socket.on('connection_response', (connectionResult) => {
      console.log(connectionResult);
    });
  }

  render() {
    return [
      <AppName key="AppName">Brainstorm.io</AppName>,
      <Container key="Container">
        <Middle>
          <Input
            type="text"
            value={this.state.roomName}
            onChange={e => this.setState({ roomName: e.target.value })}
          />
          <Button onClick={this.createRoom}>Utwórz pokój</Button>
        </Middle>
      </Container>,
    ];
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(Dashboard);
