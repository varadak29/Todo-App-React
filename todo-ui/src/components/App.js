import React from 'react';
import './App.scss';
import NewTodo from './AddNewTodoItem/todo.js';
import DisplayTodo from './GetAllTodoItems/alltodo.js';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      view: false
    }
  }
  /**
   * lifecycle method for get request
   */
  componentDidMount() {
    fetch('http://localhost:5000/todolist')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  updateState = () => {
    fetch('http://localhost:5000/todolist')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  postData = () => {
    alert("New Element Added Successfully!");
    this.setState({ edit: false })
  }
  /**
   * 
   * @returns void
   * using components for different funtionalities
   */
  render() {
    return (
      <div className="App">
        <div>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="heading">
                <h1>Create your own To Do List</h1>
                <h4>Manage your Plans and timings, your way!</h4>
              </div>
              <AddCircleRoundedIcon style={{ transform: "scale(1.5)" }} onClick={() => this.setState({ view: !this.state.view })} />
            </div>
            {this.state.view ?
              <NewTodo updateState={this.updateState}></NewTodo>
              : null
            }
          </div>

        </div>
        <div>
          <DisplayTodo list={this.state.data} updateState={this.updateState} />
        </div>
      </div>
    );
  }
}

export default App;