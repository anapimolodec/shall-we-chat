import React from 'react';

const MyMessage = ({message}) => {
	// console.log("props in MyMessage", message)
	if (message ?.attachments?.length > 0) {
		return (
				<img
					src = {message.attachments[0].file}
					alt = "message-attachment"
					className = "message-image"
					style ={{float: "right"}}
				/>
			);
	}
	return (
		<div className = "message" style ={{float: "right", marginRight: "18px", color: "white", backgroundColor: "#ebaca2"}}>
			{message.text}
		</div>

		);
}



export default MyMessage;