import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import io from 'socket.io-client';
import { createBoard } from '../../actions/board';
import { Container } from './Dashboard_styles';

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
    return (
      <Container>
        Hello World!
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(Dashboard);
