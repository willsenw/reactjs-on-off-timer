import React , {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class Timer extends Component{
  constructor( props ){
    super(props);
    this.state = {
      time : props.startTime,
      toggleStatus : true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick( e ){
    this.setState((state)=>({
      toggleStatus : !state.toggleStatus,
    }));
  }

  componentDidMount(){
    this.addInterval = setInterval(()=> this.increaseTime(), 1000);
  }

  componentWillMount(){
    clearInterval(this.addInterval);
  }

  increaseTime(){
    if ( this.state.toggleStatus ){
      this.setState((state,props) => ({
        time : (parseInt(state.time) == 10) ? 0 : parseInt(state.time) + 1,
      }));
    }
  }

  render(){
    return(
      <div>
        <p> {this.state.time} Detik </p>
        <button onClick = {this.handleClick}> { (this.state.toggleStatus ) ? 'ON' : 'OFF' } </button>
      </div>
    );
  }
}

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Timer startTime = "0"/>
        </header>
      </div>
    );
  }
}

export default App;
