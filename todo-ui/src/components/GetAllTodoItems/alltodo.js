import React from 'react';
import './alltodo.scss';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default class AllTodo extends React.Component{

    /**
     * 
     * @param {*} props 
     * Adding state values
     */
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            edit:false,
            id: null,
            idCLass:null,
            showCLass:true,
            title:null,
            description:null,
            dueDate:null,
            time:null,
            statusID : null,
            statusToggle : true
        }
    }

    /**
     * 
     * @param {*} e 
     * toggle function
     */
    changeEditData=(e)=>{
        e.preventDefault(); 
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    /**
     * 
     * @param {*} id 
     * calling delete api
     */
    delete = (id) => {
        fetch(`http://localhost:5000/todolist/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
          .then(res => {
            alert("Element Deleted Successfully!");
            this.props.updateState();
          })
          .catch(err => {
            if (err) throw err
          })
    }
    display(id){
        this.setState({
            id : id,
            show : !this.state.show
        })
    }
    done(id){
        this.setState({
            showCLass:!this.state.showCLass,
            idCLass:id
        })
    }

    /**
     * 
     * @param {*} id 
     * adding put method 
     */
    edit(id){
        fetch(`http://localhost:5000/todolist/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                dueDate : this.state.dueDate,
                time : this.state.time
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
          .then(res => {
            alert("Element Updated Successfully!");
            this.props.updateState();
          })
          .catch(err => {
            if (err) throw err
          })
        
    }

    /**
     * 
     * @param {*} _id 
     * @param {*} title 
     * @param {*} dueDate 
     * @param {*} time 
     * @param {*} description 
     * @param {*} status 
     * 
     * changing status 
     */
    changeStatus(_id,title,dueDate,time,description,status){
        fetch(`http://localhost:5000/todolist/${_id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: title,
                description: description,
                dueDate: dueDate,
                time: time,
                status : !status
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
          .then(res => {
            alert("Task Completed");
            this.props.updateState();
          })
          .catch(err => {
            if (err) throw err
          })
    }
    openEdit(_id,title,dueDate,time,description){
        this.setState({
            showCLass:!this.state.showCLass,
            idCLass:_id,
            title:title,
            description:description,
            dueDate: dueDate,
            time: time
        })
    }

    render() {
        return (
            <div className="new-todo">
                {this.props.list && this.props.list.map((element,id) => {
                    const { _id,title, description, dueDate, time, status } = element;  
                    /**
                     * form for backend and display todos with toggle
                     */
                    return (
                        <div key={_id} className="fluid-container">
                            {
                                this.state.showCLass && this.state.idCLass === _id?
                                    <div className="wrap-form">
                                        
                                        <form className="wrap-inner-form">
                                            <fieldset className="f2">
                                                <label>Title : </label>
                                                <input type="text" name="title" className="ip2" onChange={this.changeEditData} value={this.state.title} required></input>
                                            </fieldset>
                                            <fieldset className="f2">
                                                <label>Description : </label>
                                                <input type="text" name="description" className="ip2" onChange={this.changeEditData} value={this.state.description} required></input>
                                            </fieldset>
                                            <fieldset className="f2">
                                                <label>Due Date : </label>
                                                <input type="text" name="dueDate" className="ip2" onChange={this.changeEditData} value={this.state.dueDate} required></input>
                                            </fieldset>
                                            <fieldset className="f2">
                                                <label>Time : </label>
                                                <input type="text" name="time" className="ip2" onChange={this.changeEditData} value={this.state.time} required></input>
                                            </fieldset>
                                            <div>
                                                <button className="submit-todo" onClick={()=>this.edit(_id)}>Edit</button>
                                                <button className="submit-todo-danger" onClick={()=>this.done(_id)}>Cancel</button>
                                            </div>
                                            
                                        </form>
                                    </div>
                                :
                                <div className={status ?"todo-element-wrap-done":"todo-element-wrap"}>
                                <div className="todo-element">
                                    <p>{title}</p>
                                    <div style={{display: "flex", justifyContent: "space-evenly" }}>
                                        <ExpandMoreRoundedIcon onClick={()=>this.setState({id:id,show:!this.state.show})}/>
                                            {this.state.show&& this.state.id===id?<i className="fas fa-chevron-up"></i>:<i className="fas fa-chevron-down"></i>}
                                        <DeleteRoundedIcon onClick={()=>this.delete(_id)}/>
                                        <CancelRoundedIcon onClick={()=>this.changeStatus(_id,title,dueDate,time,description,status)}/>
                                        <EditRoundedIcon onClick={()=>this.openEdit(_id,title,dueDate,time,description)}/>
                                    </div>
                                </div>
                                <div>
                                    {
                                        this.state.show && this.state.id===id?
                                            <div key={id} className="des">
                                                <p>Title: {title}</p>
                                                <p>Description: {description}</p>
                                                <p>Due Date: {dueDate}</p>
                                                <p>Time: {time}</p>
                                                <p>Status: {status?"Completed":"Pending"}</p>
                                            </div>
                                        :null
                                    }
                                </div>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}