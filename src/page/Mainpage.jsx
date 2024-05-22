import React, {useEffect,useState} from 'react';
import ReactDom from 'react-dom';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import SpecificThread from './SpecificThread';
import SpecificUser from './SpecificUser';

//    const items = [1,2,3,4,5];

    function formatDate(dateArray){
        const [year,month,day,hour,minute,second] = dateArray;
        return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')} ${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:${String(second).padStart(2,'0')}`; 
    }

    

    

    function Items({currentItems}){
        const navigate = useNavigate();
        
        function goToThread(item){
    
            console.log(item.id); 
            navigate(`/thread/${item.id}`);

        }
    
        function goToUser(id){
            <SpecificUser id={id}/>
        }
        return(
            <>
            {
                currentItems &&
                currentItems.map((item) =>(
                    <div id={item.id} >
                        <h1 onClick={()=>goToThread(item)} style={{cursor:'pointer'}}>{item.title}</h1>
                        <p>{new Date(...item.createdDate).toLocaleString()}</p>
                        <p onClick={()=>goToUser(item.userName)} style={{cursor:'pointer'}}>{item.userName}</p>
                    </div>
                ))
            }
            </>
        )
    }



    function PaginatedItems({itemsPerPage}) {
        const [itemOffset,setItemOffset] = useState(0);
        const [items,setItems] = useState([]);

        const localhost = true;
        const url = localhost ? 'http://localhost:7070/api' : ""; 


        useEffect(() =>{
            const fetchData = async() => {
                try {
                    const response = await fetch(url+'/public/getAllThreads');
                    const data = await response.json();
                    console.log(data);
                    setItems(data);
                }catch(error){
                    console.error('fetching data error',error);
                }
            };
            fetchData();
        },[]);


        const endOffset = itemOffset + itemsPerPage;
        console.log("here is your slices: "+items);
        const currentItems = items.slice(itemOffset,endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            setItemOffset(newOffset);
    
        }
        return (
            <>
        
            <Items currentItems={currentItems}/>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<previous"
                renderOnZeroPageCount={null}
                />
            </>
        );
}
 
export const Mainpage = () => {
    return(
        <div>
        <PaginatedItems itemsPerPage={5}/>
    </div>
    )
    
};

//https://www.npmjs.com/package/react-paginate source is from here.

