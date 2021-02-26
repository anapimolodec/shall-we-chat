import React,{useState} from 'react';
import axios from 'axios';
import {sendMessage, isTyping} from 'react-chat-engine';
import {SendOutlined, PictureOutlined} from '@ant-design/icons';
const MessageFormM = ({ chatId}) => {
	const [value, setValue] = useState("");
	
	const authObject = {'Project-ID': 'cf441224-41e9-41cc-8614-a4f80364f2f7', 'User-Name': `${localStorage.getItem('username')}`, 'User-Secret': `${localStorage.getItem('password')}`}
	//console.log("chatId, creds", chatId, creds)
	const sendMessage = async (msg) => {
		
		//event.preventDefault();
		try {
			await axios.post(`https://api.chatengine.io/chats/${chatId}/messages/`,{ msg },{headers: authObject})
			
		} catch(err) {
			console.log(err)
			
		}
	
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const text = value.trim();
		
		if (text.length >0) sendMessage({text})
		setValue("")
	}
	const handleUpload = (event) => {
		sendMessage( {files: event.target.files, text: '' })
	}
	const handleChange = (event) => {
		setValue(event.target.value)
		// isTyping(props, chatId)
		isTyping(authObject, chatId)
		
	}
	return (
		<form className = "message-form" onSubmit = {handleSubmit} >
			<input 
				className = "message-input"
				placeholder = "Send a message .. "
				value = {value}
				onChange = {handleChange}
				onSubmit= {handleSubmit}
			/>
			<label htmlFor="upload-button" style ={{float: "right"}}>
				<span className = "image-button" > 
					<PictureOutlined className = "picture-icon"/>
				</span>
				<input
					type= "file"
					multiple={false}
					id = "upload-button"
					style = {{display: 'none'}}
					onChange = {handleUpload}

				/>
				<button type = "submit" className = "send-button">
					<SendOutlined className = "send-icon"/>
				</button>
			</label>
		</form>

		);
}



export default MessageFormM;