import {MenuOutlined, LogoutOutlined, SmileOutlined} from '@ant-design/icons';
const ChatTop = (props) => {
	console.log(props)
	const activechat_id = props.activeChat;
	const handleLogOut = () => {
      localStorage.clear();
      window.location.reload();
    }
    const people = props.chats[activechat_id].people
    const renderAvatars = () => {
    	const keys = Object.keys(people);

    	 return keys.map((key, index) => {
    		const persona = people[key];
    		const urll = persona["person"].avatar;

    		return (
    			
    				<div className = "ce-avatar" style ={{backgroundImage:`url(${urll})` }}></div>
    			);
    	})


    }
    renderAvatars();
    //console.log(people)
   
	return (
		<div className = "ce-chat-settings-container">
			<div className="top-icons">
	            <LogoutOutlined className = "menu-icon" onClick={() => handleLogOut()} />
	        </div>   

			<div>
				<h3> current chat: </h3>
				<h1 className = "chat-title">{props.chats[activechat_id].title}</h1>
			</div>
		</div>
		);
}

export default ChatTop;