import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { createBoard } from '../../actions/board';
import { Container, AppName, Middle, Header, Subheader, Input, Button } from './Home_styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
    };
  }

  createRoom = (e) => {
    e.preventDefault();
    console.log(this.state.roomName);
    this.props.createBoard(this.state.roomName);
  }

  render() {
    return [
      <AppName key="AppName">Brainstorm.io</AppName>,
      <Container key="Container">
        <Middle>
          <Header>Burze mózgów na zawołanie</Header>
          <Subheader>Wpisz nazwę pokoju i rozpocznij nawet w 30 sekund</Subheader>
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

export default connect(null, mapDispatchToProps)(Home);
