import React, {Component} from 'react'
import { withRouter } from 'react-router'

class Menu extends Component{

    constructor(props){
        super(props)
        this.state = {
            id: null,
            menu: null,
            allDishes: []
            }
    }

    componentDidMount(){
        this.getDishes()
    }

    componentWillReceiveProps(newProps){
        this.setState({
            id: newProps.id,
            menu: newProps.menu
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
        let currentDishes = this.state.dishes
        currentDishes.push(dish)
        this.setState({dishes: currentDishes})
    }

    removeDish = (dish) => {
        console.log("dish in removeDish: " + dish)
        let currentDishes = this.state.dishes
        currentDishes.map( (d, index) => {
            if(d.id === dish.id){
                currentDishes.splice(index, 1)
            }
        })
    }

    postMenuChanges = async () => {
        const {id, menu} = this.state
        const payload = {id, menu}
        const response = await fetch("/menu/" + id, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const tr = await fetch('/menus')
        const rt = await tr.json()
        console.log("in Menus: " + JSON.stringify(rt))

        this.props.history.push('/')
    }


    render(){
        const {allDishes, menu} = this.state

        let menuTable = <table>
            <thead>
                <tr>
                    <th>Dishes</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {menu.map((d, index) =>
                    <tr key={"key_" + index}>
                        <td>
                            {d.id}
                        </td>
                        <td>
                            {d.name}
                        </td>
                        <td>
                            {d.type}
                        </td>
                        <td>
                            <button onClick={() => this.removeDish(d)}>Remove</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

        let dishTable = <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {allDishes.map(d =>
                <tr key={"key_" + d.id}>
                    <td>
                        {d.id}
                    </td>
                    <td>
                        {d.name}
                    </td>
                    <td>
                        {d.type}
                    </td>
                    <td>
                        <button onClick={() => this.addDish(d)}>Add to menu</button>
                    </td>
                </tr>
            
            )}
        </tbody>
        </table>;

        return(
            <div>
                <div id="titleDiv">
                    {dishes.day}
                </div>
                {menuTable}
                <br/>
                <button onClick={() => this.postMenuChanges()}>Done</button>
                <br/>
                {dishTable}
            </div>
        )
    }
}

export default withRouter(Menu)