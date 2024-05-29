import Post from './Post';
import {Outlet} from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 0.01rem; /* Optional: add padding to the top */
`;
const ThreadContenData = styled.div`
    display: flex;
    background:  var(--basewhite);
    min-height: 20vh;
    min-width: 100vh;
    align-items: center;
    flex-direction: column;
    margin: 16px;
    padding: 16px; /* Optional: add padding inside the container */
    border: 2px solid darkblue; /* Border with a different color */
    border-radius: 8px; /* Optional: add rounded corners */
`;

export default function Thread({ threadData, posts, setPosts, loggedInUser }) {
    return (
        <MainContainer>
            {threadData.id && (
                <>
                    <ThreadContenData>
                    <div><strong>{threadData.title} by {threadData.userName} </strong></div>
                    <br/>

                    {threadData.content}
                    </ThreadContenData>
                    <br/>
                    {console.log(threadData.id+"from thread.jsx")}
                    <Post posts={posts} setPosts={setPosts} threadId={threadData.id} loggedInUser={loggedInUser}/>
                </>
            )}
            <Outlet/>
        </MainContainer>
    );
}