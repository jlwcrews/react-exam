import React, {Component} from 'react'
import {Chatroom} from './chatroom'
import {TopBar} from './topbar'
import {ShowMenus} from './showmenus'

export class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            userId: null
        }
    }

    componentDidMount() {
        this.fetchUser()
    }

    fetchUser = async () => {
        const response = await fetch('/user', {
            method: 'GET',
            credentials: 'include',
          })
        if(response.status === 200){
            const payload = await response.json()
            this.updateLoggedInUserId(payload.userId)
        }
    }

    updateLoggedInUserId = (userId) => {
        this.setState({userId: userId});
    };

    render(){
        return (
            <div className="container">
                <div id="topDiv">
                    <TopBar 
                        userId={this.state.userId} 
                        callback={this.updateLoggedInUserId}/>
                </div>
                <div id="middleDiv">
                    <div id="menuDiv">
                        <ShowMenus
                            userId={this.state.userId}/>
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