import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { orange400 } from 'material-ui/styles/colors';

import logo from './assets/img/logo/keksi_logo.svg';
import './App.css';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange400,
  },
  fontFamily: 'Work Sans, Roboto, sans-serif',
});

const pulseDuration = 0.3;

const anim = {
  pulse: {
    animation: `pulse ${pulseDuration}s`,
  },
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: Math.floor(Math.random() * 10) + 1,
      pulse: false,
    };
  }


  pulseLogo() {
    this.setState({
      pulse: true,
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState({
          count: this.state.count + 1,
          pulse: false,
        });
        resolve('Animation finished');
      }, pulseDuration * 1000);
    });
  }

  render() {
    const { pulse } = this.state;

    return (
      <MuiThemeProvider muiTheme={muiTheme} >
        <div className="App">
          <header className="App-header">
            <img
              src={logo}
              alt="Keksi Labs logo"
              className="App-logo"
              style={pulse ? anim.pulse : null}
            />
            <h1 className="App-title">Keksi Labs</h1>
          </header>
          <p>The place where cookies go to have fun.</p>
          <p>{this.state.count} {this.state.count === 1 ? 'cookie' : 'cookies'} currently partying!</p>
          <RaisedButton
            label={this.state.pulse ? 'Adding...' : 'Add a cookie'}
            primary={!this.state.pulse}
            disabled={this.state.pulse}
            onClick={() => {
              if (!this.state.pulse) {
                this.pulseLogo();
              }
            }}
            labelStyle={{ fontWeight: 'bold' }}
          />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
