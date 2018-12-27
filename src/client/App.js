//import './app.css';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import ReactImage from './react.png';
import Home from './components/Home';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect('http://localhost:8080'),
      gameConnected: false
      // The member variable represents the user of this socket.
      // Every socket will have a different socket.
    };
    

    //this.emit = this.emit.bind(this);
  }


  componentDidMount() {
  // this.setState({socket:io.connect('http://localhost:8080')}); 

     this.state.socket.on('newGame', (data) => {
       console.log('wow '+data.room);
       this.setState({gameConnected:true}); 
     //  const message =
     //    `Hello, ${data.name}. Please ask your friend to enter Game ID: 
   //   ${data.room}. Waiting for player 2...`;
  
  //     // Create game for player 1
  //     game = new Game(data.room);
  //     game.displayBoard(message);
   });
    // fetch('/api/getUsername')
    //   .then(res => res.json())
    //   .then(user => this.setState({ username: user.username }));
  }

  render() {

    return (
      <Home socket={this.state.socket}>
      </Home>
    );
  }
}
