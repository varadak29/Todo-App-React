import React from 'react';
import './todo.scss';

export default class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title : "",
            description : "",
            dueDate : "",
            time : ""
        }
    }

    /**
     * 
     * @param {*} e 
     * on change event handler
     */
    changeData = (e) => {
        e.preventDefault(); 
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    /**
     * adding new todo api call post
     */
    postData = () => {
        fetch("http://localhost:5000/todolist", {
            method: "POST",
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                dueDate: this.state.dueDate,
                time: this.state.time             
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
          .then(res => {
            alert("New todo element added successfully!");
            this.props.updateState();
          })
          .catch(err => {
            if (err) throw err
          })
      }
    render(){
        /**
         * add new todo item
         */
        return(
            <form>
                <fieldset className="f1">
                    <label>Title : </label>
                    <input type="text" name="title" className="ip1" onChange={this.changeData} required></input>
                </fieldset>
                <fieldset className="f1">
                    <label>Description : </label>
                    <input type="text" name="description" className="ip1" onChange={this.changeData} required></input>
                </fieldset>
                <fieldset className="f1">
                    <label>Due Date : </label>
                    <input type="text" name="dueDate" className="ip1" onChange={this.changeData} required></input>
                </fieldset>
                <fieldset className="f1">
                    <label>Time : </label>
                    <input type="text" name="time" className="ip1" onChange={this.changeData} required></input>
                </fieldset>
                <button className="submit-todo"onClick={this.postData}>Add</button>
            </form>
        )
    }
}
