import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import style from './Messages.module.css';
import Views from '../../Assets/Images/Views.jpg'

interface Friend {
    id:number;
    username:string;
    profilePhoto:string;
}
export default function Messages(){
    const [friends, setFriends] = useState<Friend[]>([
        {
            id: 1,
            username: "Edi Krasniqi",
            profilePhoto: "../../Images/test.png"
        },
        {
            id: 2,
            username: "Flutra Krasniqi",
            profilePhoto: "../../Images/test.png"
        },
        {
            id: 3,
            username: "Yllka Krasniqi",
            profilePhoto: "../../Images/test.png"
        }
    ]);

    return (
        <div className={style.messages}>
            <div className={style.messageContainer}>
                <h2>Messages</h2>
                    <div className={style.innerDivs}>
                        <div className={style.friendsList}>
                            {friends.map(friend => (
                                <div key={friend.id} className={style.friendBox}>
                                    <NavLink to={`/messages/${friend.id}`} className={style.navLink}>
                                        <img src={Views}/>
                                        <h4>{friend.username}</h4>
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                        <div className={style.messageDisplay}>
                            <div className={style.chatDisplay}>
                                <div className={style.recievedMessage}>
                                    <img src={Views}/>
                                    <div className={style.recievedMessageText}>
                                        <p>Said something</p>
                                    </div>
                                </div>
                                <div className={style.sentMessage}>
                                    <div className={style.sentMessageText}>
                                        <p>Said something back</p>
                                    </div>
                                    <img src={Views}/>
                                </div>
                            </div>
                            <div className={style.chatBox}>
                                <input type="text" placeholder="Say something" className={style.chatInput}/>
                                <button className={style.sendButton}>Send</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}