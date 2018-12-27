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

    // fetch('/api/getUsername')
    //   .then(res => res.json())
    //   .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <Home>
      </Home>
    );
  }
}
