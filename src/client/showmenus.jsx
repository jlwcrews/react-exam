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
        let table = <table>
            <thead>
                <tr>
                    <th>Day</th>
                </tr>
            </thead>
            <tbody>
                {menus.map(menu =>
                    <tr key={"key_" + menu.id}>
                        <td id="tdName">
                            {menu.dishes.day}
                            {/*<table>
                                <tbody>
                                    {menu.dishes.dishes.forEach(() => {
                                    <tr key={"key_" + menu.dishes.id}>
                                        <td>
                                            {menu.dishes.dishes.name}
                                        </td>
                                    </tr>
                                    })}
                                </tbody>
                                </table>*/}
                        </td>
                        <td>
                            {JSON.stringify(menu.dishes.dishes)}
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