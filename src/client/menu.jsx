import React, {Component} from 'react'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'

class Menu extends Component{

    constructor(props){
        super(props)
        this.state = {
            id: "",
            menu: {dishes: []},
            allDishes: []
            }
    }

    componentDidMount(){
        this.getDishes()
        this.setState({
            id: this.props.id,
            menu: this.props.menu
        })
    }

    getDishes = async () => {
        const response = await fetch('/dishes')
        const body = await response.json()
        this.setState({
            allDishes: body
        })
    }

    addDish = (dish) => {
        let currentMenu = this.state.menu
        currentMenu.dishes.push(dish)
        this.setState({menu: currentMenu})
    }

    removeDish = (dish) => {
        let currentMenu = this.state.menu
        currentMenu.dishes.map( (d, index) => {
            if(d.id === dish.id){
                currentMenu.dishes.splice(index, 1)
            }
            this.setState({menu: currentMenu})
        })
    }

    deleteDish = async (dish) => {
        const url = "/dish/" + dish.id;
        const response = await fetch(url, {method: "delete"});
        this.removeDish(dish)
        this.getDishes();
};

    postMenuChanges = async () => {
        const {id, menu} = this.state
        const dishes = menu
        const payload = {id, dishes}
        const response = await fetch("/menu/" + id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        this.props.history.push('/')
    }

    render(){
        const {allDishes, menu} = this.state
        let menuTable = <table id="menuTable">
            <thead>
                <tr>
                    <th></th>
                    <th>Dishes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {menu.dishes.map((d) =>
                    <tr key={"key_" + d.id}>
                        <td>
                            {d.name}
                        </td>
                        <td>
                            {d.type}
                        </td>
                        <td>
                            <button className="small green button"onClick={() => this.removeDish(d)}>Remove</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

        let dishTable = <table>
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {allDishes.map(d =>
                <tr key={"key_" + d.id}>
                    <td>
                        <Link to={"/editDish?dish=" + d.id}><button className="small green button">Edit</button></Link>
                        <button className="small green button" onClick={() => this.deleteDish(d)}>Delete</button>
                    </td>
                    <td>
                        {d.name}
                    </td>
                    <td>
                        {d.type}
                    </td>
                    <td>
                        <button className="small green button" onClick={() => this.addDish(d)}>Add to menu</button>
                    </td>
                </tr>
            
            )}
        </tbody>
        </table>;

        return(
            <div id="menuDiv">
                <div id="titleDiv">
                    {menu.day}
                </div>
                {menuTable}
                <div id="availableDishes">
                    <Link to={"/addDish"}><button className="small red button">Create new dish</button></Link>
                    {dishTable}
                    </div>
                 <button className="small red button" onClick={() => this.postMenuChanges()}>Done</button>
            </div>
        )
    }
}

export default withRouter(Menu)