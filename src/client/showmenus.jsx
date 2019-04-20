import React, {Component} from 'react'
import ReactDOM from 'react-dom'
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
        const response = await fetch("/menus")
        const json = await response.json()
        this.setState({
            menus: json
        })
    }

    render(){
        const {userId, menus} = this.state
        menus.map(menu => {console.log(menu.dishes.dishes)})
        let table = 
        <table>
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
                            <table>
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
                        {this.props.userId !==null ? (<td><Link to={"/editMenu?menu=" + menu.id}><button className="btn">Edit</button></Link></td>) : null}
                    </tr>
                )}
            </tbody>
        </table>;


        return (
            <div className="container">
                <div id="titleDiv">
                    Menus for the week
                </div>
                {table}
            </div>
        )
    }
}