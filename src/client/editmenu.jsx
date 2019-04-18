import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Chatroom} from './chatroom'
import {MenuBar} from './menubar'

export class EditMenu extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            dishes: [],
            menus: [],
            error: null
        }
    }

    getDishes = async () => {
        const response = await fetch("/dishes")
        const json = await response.json()
        this.setState({
            dishes: json
        })
    }

    async componentDidMount(){
        this.getDishes()
    }

    deleteDish = async (id) => {

        const url = "/dish/" + id;
        let response;
        response = await fetch(url, {method: "delete"});
        this.getDishes();
        return true;
    };

    render(){


        const {dishes, error} = this.state
        
        let table = <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {dishes.map(c =>
                    <tr key={"key_" + c.id}>
                        <td id="tdId">{c.id}</td>
                        <td id="tdName">{c.name}</td>
                        <td id="tdType">{c.type}</td>
                        <td><Link to={"/editDish?dish=" + c.id}><button className="btn">Edit</button></Link></td>
                        <td><button className="btn" onClick={() => this.deleteDish(c.id)}>Delete</button></td>
                        </tr>
                )}
            </tbody>
        </table>;


        return (
            <div className="container">
                <div>
                    <Link to={"/addDish"}><button id="addBtn" className="btn">New Dish</button></Link>
                </div>
                {table}
            </div>
        )
    }
}
