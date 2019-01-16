//import './app.css';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import ReactImage from './react.png';
import Home from './components/Home';
import Game from './components/game/Game';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect('http://localhost:8080'),
      gameConnected: false,
      id: "",
      secondPlayerConnected:false

    };
  }

  componentDidMount() {

    this.state.socket.on('player2', (data) => {
      this.state.id = data.room;
      this.setState({secondPlayerConnected:true}); 
         this.setState({gameConnected:true}); 
  
  });

     this.state.socket.on('newGame', (data) => {
       this.state.id = data.room;
       this.setState({gameConnected:true}); 
   });


 
  }

  render() {
    return (
      <div>
     {this.state.gameConnected? <Game secondPlayerConnected={this.state.secondPlayerConnected} id={this.state.id} socket={this.state.socket}></Game>:
      <Home socket={this.state.socket}>
  </Home> }
  </div>
    );
  }
}
