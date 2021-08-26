import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}
class App extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: []
  //     // searchfield: ''
  //   }
  // }
  // const [robots, setRobots] = useState([])
  // const [searchfield, setSearchfield] = useState('')
  // const [count, setCount] = useState(0)

  componentDidMount() {
    this.props.onRequestRobots()
  }

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response => response.json())
  //   .then(users => {setRobots(users)})
  //   // console.log(count)
  // },[]) // if you add count, only run if count changes.

  // onSearchChange = (event) => {
  //   this.setState({ searchfield: event.target.value })
  // }

  render() {
    // const { robots } = this.state
    const { searchField, onSearchChange, robots, isPending } = this.props
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    
    return isPending ? 
      <h1>Loading</h1> : 
      (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          {/* <button onClick={() => setCount(count+1)}>Click me!</button> */}
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);