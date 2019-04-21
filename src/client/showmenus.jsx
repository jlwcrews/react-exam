import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class ShowMenus extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            userId: null,
            menus: []
        }
    }

    async componentDidMount(){
        this.getMenus()
    }

    getMenus = async () => {
        const response = await fetch("/menus", {method: "GET"})
        const json = await response.json()
        this.setState({
            menus: json
        })
    }

    render(){
        const {menus} = this.state
        let table = 
        <table id="menuTable">
            <thead>
                <tr>
                    <th>Day</th>
                </tr>
            </thead>
            <tbody>
                {menus.map((menu,index) =>
                    <tr key={"key_" + menu.id + index}>
                        <td id="tdName">
                            {menu.dishes.day}
                            <table id="dishesTable">
                                <tbody>
                                    {menu.dishes.dishes.map(dish => 
                                        <tr key={"key_" + dish.id}>
                                            <td>
                                                {dish.name}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </td>
                        {this.props.userId !==null ? (<td><Link to={"/editMenu?menu=" + menu.id}><button className="small green button">Edit</button></Link></td>) : null}
                    </tr>
                )}
            </tbody>
        </table>;


        return (
            <div>
                <div id="titleDiv">
                    Menus for the week
                </div>
                {table}
            </div>
        )
    }
}