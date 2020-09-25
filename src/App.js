import React , {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// Context
const MyContext = React.createContext();

// Component
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

// HOC - Higher Order Component
const withBackground = (WrappedComponent) => {
  class WithBackground extends Component{
    render(){
      return (
        <MyContext.Provider value = {{startTime:"0"}}>
            <div className="App">
              <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <WrappedComponent/>
              </header>
            </div>
        </MyContext.Provider>
      );
    }
  }
  return WithBackground;
};

class App extends Component {
  render(){
    return (
      <MyContext.Consumer>
        { context => (<Timer startTime = {context.startTime}/>) }
      </MyContext.Consumer>
    );
  }
}

export default withBackground(App);
