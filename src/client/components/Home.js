//import './app.css';
import Wrapper from './Wrapper';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { createGlobalStyle   } from "styled-components";
import Montserrat from './fonts/mario.woff';

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
				<input type="text" name="name" id="nameNew" placeholder="Enter your name" required></input>
				<button id="new">New Game</button>
				<br></br><br></br>
				<h4>Join an existing game</h4>
				<input type="text" name="name" id="nameJoin" placeholder="Enter your name" required></input>
				<input type="text" name="room" id="room" placeholder="Enter Game ID" required></input>
				<button id="join">Join Game</button>
    </Wrapper>
    );
  }
}
