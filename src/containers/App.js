import React,{Component} from 'react';
//import logo from './logo.svg';
//import './App.css';
import CardList from '../components/CardList';
import {robots} from '../robots';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import './App.css';

const state = {
  robots: robots,
  searchfield:''
}

class App extends Component{
  constructor(){
    super()
    this.state = {
      robots: [],
      searchfield:''
    }
    console.log('Constructor');
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users =>this.setState({robots:users}))

    //this.setState({robots:robots})
    console.log('Component Did Mount');
  }

  onSearchChange = (event) =>{
    this.setState({searchfield: event.target.value})
   // console.log(event.target.value);
  }

  render(){
    const {robots,searchfield}=this.state;

    const filteredRobots=this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if(!robots.length){ //instead of (robots.length===0) we are using other line which will give the same value only
      return <h1>Loading</h1>
    }
    //console.log('Rendering');
    else {
      return(
        <div className='tc'>
        <h1 className='f2'> RoboFriends </h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
          <CardList robots={filteredRobots}/>
          </ErrorBoundary>
        </Scroll>
        
        </div>
      );
    }
  }
}

export default App;
