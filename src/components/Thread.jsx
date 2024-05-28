import Post from './Post';
import {Outlet} from "react-router-dom";

export default function Thread({threadData, loggedInUser}){
    return(
            <div>
                <div><strong>{threadData.title} by {threadData.userName} </strong></div>
                <br/>
                {threadData.content}
                <br/>
                <Post postData={threadData.posts} threadID={threadData.threadId} loggedInUser={loggedInUser}/>
                <Outlet/>
            </div>
    )
}