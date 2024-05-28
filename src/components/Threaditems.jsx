import styled from "styled-components";

const Container = styled.div`
    box-shadow:inset 0 0 0 2rem #f1f1e5;
    background-color: #f3f3e4;
    text-align: left;
    flex-direction: start;
    width: 65rem;
    margin: 1rem auto; 
    padding:2rem ;
    border-radius: 2rem;
    @media(max-width:400px){
        width:70%;   
    }
`

export default function ThreadItem({ items, goToThread, goToUser }) {
    const lengthChecker = 40;
    function lengthshortner(content) {
        if(content.length>lengthChecker){
            return content.slice(0,lengthChecker)+"...";
        }else{
            return content;
        }
    }


return (
    <>
        <br></br>
        {items && items.map((item) => (
            <Container id={item.id} key={item.id}>
                <p onClick={() => goToUser(item.userName)} style={{ cursor: 'pointer' }}> {item.userName}</p>
                <h1 onClick={() => goToThread(item)} style={{ cursor: 'pointer' }}>{item.title}</h1>
                <p>{lengthshortner(item.content)}</p>
                <p>date: {new Date(...item.createdDate).toLocaleString()}</p>
            </Container>
        ))}
    </>
);
}
