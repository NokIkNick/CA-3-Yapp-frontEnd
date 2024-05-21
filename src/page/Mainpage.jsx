import React, {useEffect,useState} from 'react';
import ReactDom from 'react-dom';
import ReactPaginate from 'react-paginate';

    const items = [1,2,3,4,5];

    function Items({currentItems}){
        return(
            <>
            {
                currentItems &&
                currentItems.map((item) =>(
                    <div>
                        <h1>post #{item}</h1>
                    </div>
                ))
            }
            </>
        )
    }

    function PaginatedItems({itemsPerPage}) {
        const [itemOffset,setItemOffset] = useState(0);

        const endOffset = itemOffset + itemsPerPage;
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


/*export default function Mainpage(){
    return(
        <>
            <PaginatedItems itemsPerPage={5}/>
        </>
    );
}*/


