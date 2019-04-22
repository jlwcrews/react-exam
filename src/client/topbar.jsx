import React, {Component} from 'react'

export class TopBar extends Component{

    constructor(props){
        super(props)
        this.state = {
            userId: null,
            password: null,
            callback: null,
            error: null
        }
    }

    async componentDidMount(){
        this.setState({
            userId: this.props.userId,
            callback: this.props.callback 
        })
    }

    onUserIdChange = (event) => {
        this.setState({ userId: event.target.value });
      };
    
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    userLogin = async () => {
        const {userId, password} = this.state
        const payload = {userId: userId, password: password}
        const response = await fetch("/login", {
            method: "post",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if(response.status === 204){
            this.props.callback(this.state.userId)
            this.setState({error: null})
        }

        if(response.status === 401){
            this.setState({error: "Invalid username or password"})
        }
    }

    userLogout = async () => {
        const response = await fetch("/logout", { method: "post" })
        this.props.callback(null)
    }

    render(){
        if(this.props.userId == null){
            return(
                <div id = "menuBar">
                    <span id="username">
                        <input id = "usernameInput" type="text" name="username" placeholder="username" onChange={this.onUserIdChange} required/>
                    </span>
                    <span id="password">
                        <input id ="passwordInput" type="password" name="password" placeholder="password" onChange={this.onPasswordChange} required/>
                    </span>
                    <span id="login">
                        <button className="small blue button" id="loginButton" onClick={this.userLogin}>Login</button>
                    </span>
                    <span id="errorLogin">
                        {this.state.error}
                    </span>
                </div>
           )
        } else {
            return(
                <div id = "menuBar">
                    <span id="usernameLoggedIn">
                        {this.props.userId}
                    </span>
                    <span id="logout">
                        <button className="small blue button" id="logoutButton" onClick={this.userLogout}>Logout</button>
                    </span>
                    <span id="errorLogin">
                        {this.state.error}
                    </span>
                </div>
           )
        }

   }
}