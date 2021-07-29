//import './app.css';
import Wrapper from './Wrapper';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { createGlobalStyle   } from "styled-components";
import Montserrat from './fonts/mario.woff';
import Player from './model/Player'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Montserrat;
    src: url(${Montserrat});
  }

  * {
  font-family: Montserrat;
}
`
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onClickNewGameButton = this.onClickNewGameButton.bind(this);
    this.onClickJoinGameButton = this.onClickJoinGameButton.bind(this);

    this.state = {
      id: "",
 };
  }

  onClickJoinGameButton(props){
  
  if (this.refs.gameIdRef == null && this.refs.secondPlayerNameRef == null) {
        alert('Please enter your name and game ID.'+this.refs.gameIdRef);
    return;
  }
  this.props.socket.emit('joinGame', { name, room: this.refs.gameIdRef.value });
 // this.player = new Player(name, P2);

  }

  onClickNewGameButton(props){

    if (this.refs.myInput !== null) {
    	var input = this.refs.myInput;
      var name = input.value;
      console.log("onClickNewGameButton: ");

      this.props.socket.emit('createGame', { name });
      this.player = new Player('foo','bar');

    }else{
      alert('Please enter your name.');
      return;
    }
  }

  componentDidMount(){

    this.props.socket.on('newGame', (data) => {

      console.log("onClickNewGameButton: ");

      // const message =
      //   `Hello, ${data.name}. Please ask your friend to enter Game ID: 
      //   ${data.room}. Waiting for player 2...`;
  this.state.id = data.room;
      console.log("player: "+this.state.id);
  });


  this.props.socket.on('marioOther', (data) => {

    console.log("listenToOtherPlayer: workk");
  
    //handleEvent(data.key);
  
  });
  
  
  }

  render() {
    return (
        <Wrapper>
                <GlobalStyles />
        <h1>Super Mario Bros Fight</h1>
        <h3>How To Play</h3>
        <ol>
            <li>Player 1 Create a new game by entering the username</li>
            <li>Player 2 Enter another username and the room id that is displayed on first window.</li>
            <li>Click on join game. </li>
        </ol>
        <h4>Create a new Game</h4>
				<input type="text" name="name" id="nameNew" placeholder="Enter your name" ref="myInput" required></input>
				<button id="new" onClick={this.onClickNewGameButton}>New Game</button>
				<br></br><br></br>
				<h4>Join an existing game</h4>
				<input type="text" name="name" id="nameJoin" placeholder="Enter your name" ref="secondPlayerNameRef" required></input>
				<input type="text" name="room" id="room" placeholder="Enter Game ID" ref="gameIdRef" required></input>
				<button id="join" onClick={this.onClickJoinGameButton}>Join Game</button>
    </Wrapper>
    );
  }
}
