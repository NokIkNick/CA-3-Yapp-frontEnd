import { useParams } from "react-router-dom"

export default function SpecificThread(){
    let {id} = useParams();
    console.log("here is your id: ",id);
    return(
        <>
            <p>
                {id}
            </p>
        </>
    )


}