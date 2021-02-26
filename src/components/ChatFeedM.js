import React from 'react';
import MessageFormM from './MessageFormM';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import {MenuOutlined, LogoutOutlined, SmileOutlined} from '@ant-design/icons';


const ChatFeedM = ({chats,activeChat,userName,messages, mobile}) => {
	
	//const {chats,activeChat,userName,messages} = props
	const authObject = {'Project-ID': 'cf441224-41e9-41cc-8614-a4f80364f2f7', 'User-Name': `${userName}`, 'User-Secret': `${localStorage.getItem('password')}`}
	const getChat = () => {
		for (let i = 0; i < chats.length; i++) {
  		if (chats[i]['id'] === activeChat) {
  			var chatt = chats[i];
  			
  			break;
  		}
		}
		return chatt;
	}
	const chat = getChat();
	//const chat  = chats && chats[activeChat]
	//console.log(chat, userName)
	// console.log("mobile >>>")
	// console.log("CHAT",chat)
	// console.log("cCHATS",chats)
	// console.log("active chat",activeChat)
	// console.log("username",userName)
	// console.log("messages",messages)
	const renderReadReceipts = (message, isMyMessage) => 
		chat.people.map((person, index) => person.last_read === message.id && (
    	<div
      		key={`read_${index}`}
      		className="read-receipt"
      		style={{
        		float: isMyMessage ? 'right' : 'left',
        		backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      		}}
    	/>
  		));
	
	const handleLogout = () => {

		localStorage.setItem('username','');
		localStorage.setItem("password", '');
	}
	const handleMenu = () => {
		// console.log("open menu")
	}
	// console.log(userName)
	const renderMessages = () => {
		const keys = Object.keys(messages);

		// console.log("keys",keys)
		return keys.map((key, index)=> {
			const message = messages[key];
			const lastMessageKey = index === 0 ? null : keys[index-1];
			const isMyMessage = userName === message.sender.username;

			return (
				<div key={`msg_${index}`} style = {{width: "100%"}}>
					<div className = "message-block">
						{
							isMyMessage 
							? <MyMessage message= {message}/>
							: <TheirMessage message= {message} lastMessage = {messages[lastMessageKey]}/>
						}
					</div>
					<div className = "read-receipts" style ={{marginRight: isMyMessage ? "18px" : "0px", 
																marginLeft: isMyMessage ? "0px" : "68px"}}>
					{renderReadReceipts(message, isMyMessage)}
					</div>
				</div>
				);
		})
	}
	
	if (!userName) return (
		<div className = "chat-title-container">
			<div className = "chat-title"> Loading... </div>
		</div>
		);
	if (!chat && userName) return (
		<div className = "chat-title-container">
			<div className = "chat-title"> Create Your First Chat! </div>
			
		</div>
		);
	return (
		<div className = "chat-feed"> 
			
			<div className = "chat-title-container">
				<div className = "chat-title"> {  chat.title} </div>
				<div className = " chat-subtitle"> {chat.people.map((person) => `${person.person.username}  `)} </div>
			</div>
			{renderMessages()}
			<div style = {{height: "100px"}}/>
			<div className = "message-form-container">
				<MessageFormM chatId = {activeChat} />
			</div>
		</div>
		);
}

export default ChatFeedM;