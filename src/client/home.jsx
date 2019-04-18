import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Chatroom} from './chatroom'
import {MenuBar} from './menubar'
import {Menu} from './menu'

export class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            userId: null
        }
    }

    componentDidUpdate = async () => {
        const response = await fetch('/user')
        console.log(response.status)
        if(response.status === 200){
            const payload = response.json()
            console.log("payload info: " + payload.userId)
        }
    }

    updateLoggedInUserId = (userId) => {
        this.setState({userId: userId});
        console.log("userId in home " + this.state.userId)
    };

    render(){
        return (
            <div className="container">
                <div id="topDiv">
                    <MenuBar 
                        userId={this.state.userId} 
                        callback={this.updateLoggedInUserId}/>
                </div>
                <div id="middleDiv">
                    <div id="menuDiv">
                        <Menu/>
                    </div>
                    <div id="chatroomDiv">
                        <Chatroom
                            userId={this.state.userId}/>
                    </div>
                </div>
                <div id="bottomDiv">
                    This is the basic restaurant info.  Possibly replace with additional components.
                </div>
            </div>
        )
    }
}