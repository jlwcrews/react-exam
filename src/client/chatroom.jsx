import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export class Chatroom extends Component{

    constructor(props){
        super(props)
        this.state = {
            name: "Anonymous",
            text: "",
            messages: null
        };
    }

    async componentDidMount(){
        this.socket = new WebSocket("ws://" + window.location.host);
        this.socket.onmessage = ( event => {
            const msgList = JSON.parse(event.data);
            this.setState(
                prev => {
                    if(prev.messages === null){
                        return {messages: msgList};
                    } else {
                        return {messages: [...prev.messages, ...msgList]};
                    }
                }
            );
        });
    };

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onTextChange = (event) => {
        this.setState({text: event.target.value});
    };

    sendMsg = () => {
        const payload = JSON.stringify({author: this.state.name, text: this.state.text});
        this.socket.send(payload);
        this.setState({text: ""});
    };

    render() {

        let messages = <div></div>;
        if(this.state.messages !== null){
            messages = <div>
                {this.state.messages.map(m =>
                    <p key={"msg_key_" + m.id}> {m.author + ": " + m.text}</p>
                )}
            </div>;
        }

        if(this.props.userId == null){
            return (
                <div>
                    <div>
                    <p className="inputName">Your name:</p>
                    <input type="text"
                        className="inputName"
                        value={this.state.name}
                        onChange={this.onNameChange}/>
                    </div>
                    <br/>
                    {messages}
                    <br/>
                    <div>
                        <p>Your message:</p>
                        <textarea  cols="50"
                                rows="2"
                                value={this.state.text}
                                onChange={this.onTextChange} />
                    </div>
                    <br/>

                    <div id="sendId" className="btn" onClick={this.sendMsg}>Send</div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        {this.props.userId}
                    </div>
                    <br/>
                    {messages}
                    <br/>
                    <div>
                        <p>Your message:</p>
                        <textarea  cols="50"
                                rows="2"
                                value={this.state.text}
                                onChange={this.onTextChange} />
                    </div>
                    <br/>

                    <div id="sendId" className="btn" onClick={this.sendMsg}>Send</div>
                </div>
            );
        }
    }
}