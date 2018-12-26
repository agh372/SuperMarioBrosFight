import './app.css';

import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import ReactImage from './react.png';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'disconnected',
      title: '',
      member: {},
      username: null
      // The member variable represents the user of this socket.
      // Every socket will have a different socket.
    };
    //this.emit = this.emit.bind(this);
  }


  componentDidMount() {
    this.socket = io('http://localhost:8080');


    this.socket.on('connect', () => {

    });

    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    console.log(this.state);
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
