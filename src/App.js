import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ChatEngine, getChats, newChat} from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import ChatFeedM from './components/ChatFeedM';
import ChatTop from './components/ChatTop';
import {MenuOutlined, LogoutOutlined, SmileOutlined} from '@ant-design/icons';
import LoginForm from './components/LoginForm';
import './App.css';
const App = () =>  {
    const [prop, setProp] = useState({})
    const [chats,setChats] = useState([]);
    const [msgs, setMsgs] = useState([]);
    const [active, setActive]=useState('');
    const [showchats, setShow] = useState(false);
 
    const [mobile,setMobile] = useState(false);
	  if (!localStorage.getItem('username')) return <LoginForm />;
    
    const handleLogOut = () => {
      localStorage.clear();
      window.location.reload();
    }
    
    
    const authObject = {'Project-ID': 'cf441224-41e9-41cc-8614-a4f80364f2f7', 'User-Name': `${localStorage.getItem('username')}`, 'User-Secret': `${localStorage.getItem('password')}`}
    
    const handleGetChats = async (event) => {
      event.preventDefault();
      
      try {
        var got_chats = await axios.get("https://api.chatengine.io/chats", {headers: authObject});
    
      } catch(err) {
        console.log(err)
      }
      
      let arr_chats = got_chats.data;
      setMobile(true);
      setChats(arr_chats) 
      setShow(!showchats)
      
    }
    const handleGetMessages = async (id) => {
      try {
        var got_messages = await axios.get(`https://api.chatengine.io/chats/${id}/messages/`, {headers: authObject})
        setActive(id)
      } catch(err) {
        console.log("ERROR IN GETTING messages", err)
      }

      setMsgs(got_messages['data'])
      setActive(id)
  
    }
    const Chats = () => {
      
      return chats.map(chat => {
        let time = new Date(`${chat?.created}`)

        return (
        <div className="chatCard" onClick = {() => handleGetMessages(chat?.id)} key={chat?.id}>
          <div className ="chatCard-title" >
            {chat?.title}
          </div>
          <div className="chatCard-subtitle" >
            <div className="ce-chat-subtitle ce-chat-subtitle-message">
              {chat?.last_message?.text}
            </div>
            <div className="ce-chat-subtitle ce-chat-subtitle-date">
              {time.toDateString()}
            </div>
          </div>
        </div>
        );

      })
      
    }


  	return (
      <div>

        <div className="top-mobile">
          <div className = "top-mobile-icons">
            <MenuOutlined className = "menu-icon"  onClick = {handleGetChats}/>
            <LogoutOutlined className = "menu-icon" onClick={() => handleLogOut()} />
          </div>
          <div className = "additional-menu">
            { showchats && chats ? 
              <Chats /> 
              : <div className = "nothing"></div>}
          </div>
        </div>
        <ChatEngine 
                  height = "100vh"
                  projectID = "cf441224-41e9-41cc-8614-a4f80364f2f7"
                  userName = {localStorage.getItem('username')}
                  userSecret = {localStorage.getItem('password')}
                  renderChatFeed={ mobile ? 

                    () => <ChatFeedM chats = {chats}
                                    activeChat ={active}
                                    userName = {localStorage.getItem('username')}
                                    messages = {msgs}
                                    mobile = {mobile}  />
                  : (chatAppProps) => <ChatFeed {...chatAppProps} />
                  
                  }
                  renderChatSettingsTop={(props) => <ChatTop {...props} />}
                  // renderOptionsSettings={(creds, chat) => <Options props = {creds,chat} /> }
                  />
      </div>
);
}

export default App;
// (
      // chats={chatAppProps.chats}
      //                                           activeChat = {chatAppProps['activeChat']}
      //                                           userName={chatAppProps['userName']}
      //                                           messages={chatAppProps['messages']}
//           <Router>
//             <Switch>
//                <Route exact path = "/">
//                 <ChatEngine 
//                   height = "100vh"
//                   projectID = "cf441224-41e9-41cc-8614-a4f80364f2f7"
//                   userName = {localStorage.getItem('username')}
//                   userSecret = {localStorage.getItem('password')}
//                   renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
//                   //renderOptionsSettings={(props) => {<Options {...props} /> }}
//                   />
//                 </Route>
//                 <Route exact path="/login">
//                   <LoginForm setUsername={setUsername} setPassword = {setPassword} username = {username} password={password}/>
//                 </Route>
             
                
//                 <Route exact path= "/register">
//                   <Register setUsername={setUsername} setPassword = {setPassword}  username = {username} password={password}/>
//                 </Route>
//               </Switch>
//             </Router>
            


   
//   );