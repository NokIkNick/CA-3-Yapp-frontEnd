import { useParams } from "react-router-dom"
import {useEffect, useState} from "react";
import styled from "styled-components";
import Thread from "../components/Thread";

const Container = styled.div`{
          height: 100vh;
          overflow-y: auto;
          background-color: white;
          scrollbar-width: none;
          -ms-overflow-style: none;
          
          @media(max-width:400px){
                width:70%;
          }
     
     }`
export default function SpecificThread({loggedInUser}){

    let {id} = useParams();
    const [threadData, setThreadData] = useState([]);
    const localhost = true;
    const url = localhost ? 'http://localhost:7080/api' : "";

    const fetchData = async () => {
        try {
            const response = await fetch(url + `/public/getThreadById/${id}`)
            const data = await response.json();
            console.log(data);
            setThreadData(data);
        } catch (error) {
            console.error('fetching data error', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    console.log("here is your id: ",id);
    return(
        <Container>
            <Thread threadData={threadData} loggedInUser={loggedInUser}/>
        </Container>
    )


}