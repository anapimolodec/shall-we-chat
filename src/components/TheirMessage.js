import React from 'react';

const TheirMessage = ({message, lastMessage}) => {

	const isFirstMessageByUser = !lastMessage || lastMessage.sender.username != message.sender.username;
	
	const random_rgba = () => {
	    let o = Math.round, r = Math.random, s = 255;
	    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
		}
	
	return (
		<div className = "message-row">
			{isFirstMessageByUser && (
				<div className = "message-avatar"
				style = {{backgroundImage: `url(${message?.sender?.avatar})`, backgroundColor: `${random_rgba()}`, color: "white"}} >
				<p className="message-avatar-letters"> 
				{message?.sender?.first_name.substring(0,2).toUpperCase()}
				</p>
				</div>
				)}
			{ message ?.attachments?.length > 0 ?
				(
					<img
					src = {message.attachments[0].file}
					alt = "message-attachment"
					className = "message-image"
					style ={{marginLeft : isFirstMessageByUser ? '4px' : '48px'}}
					/>
				) : (
					<div className = "message" style ={{float: "left", backgroundColor: "#bed3c3", marginLeft : isFirstMessageByUser ? '4px' : '48px'}}>
						{message.text}
					</div>
				)			
			}
		
		</div>

		);
}



export default TheirMessage;