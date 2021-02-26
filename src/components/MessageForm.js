import React,{useState} from 'react';
import {sendMessage, isTyping} from 'react-chat-engine';
import {SendOutlined, PictureOutlined} from '@ant-design/icons';
const MessageForm = ({cr, id}) => {
	const [value, setValue] = useState("");
	const chatId = id;
	const creds = cr;
	console.log("chatId, creds", chatId, creds)

	const handleSubmit = (event) => {
		event.preventDefault();
		const text = value.trim();
		
		if (text.length >0) sendMessage(creds, chatId, {text});
		setValue("")
	}
	const handleUpload = (event) => {
		sendMessage(creds,chatId, {files: event.target.files, text: '' })
	}
	const handleChange = (event) => {
		setValue(event.target.value)
		// isTyping(props, chatId)
		isTyping(creds, chatId)
		
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



export default MessageForm;