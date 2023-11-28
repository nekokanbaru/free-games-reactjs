import { useRef, useEffect, memo } from "react"
import { FaAngleLeft, FaAngleDoubleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'
import { useGlobalContext } from "../context"

export default function Pagination ({totalPosts, postsPerPage}) {

    const {setCurrentPage, currentPage} = useGlobalContext()

    let pages = []
    const pageNumber = useRef()
    
    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }

    const nextPage = () => {
        if(currentPage < pages.length){
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }

    const changePage = () => {
        setCurrentPage(parseInt(pageNumber.current.value))
    }

    const setDefaultPage = () => { 
        if(pageNumber.current.value == "")//if the user deletes the page number and leaves the input
            setCurrentPage(1)
        else if(pageNumber.current.value > pages.length)
            setCurrentPage(pages.length)
    }

    useEffect(() => {
        pageNumber.current.value = currentPage
    }, [currentPage])

    return <>
    <div className="pages-wrapper">
        <button className="page-btn" onClick={() => setCurrentPage(1)}><FaAngleDoubleLeft/></button>
        <button className="page-btn" onClick={() => prevPage()}><FaAngleLeft/></button>
        <span><input type="number" name="pageNumber" className="pageNumber" onChange={changePage} onBlur={setDefaultPage} defaultValue={currentPage} min="1" max={pages.length} ref={pageNumber}/> of {pages.length}</span>
        <button className="page-btn" onClick={() => nextPage()}><FaAngleRight/></button>
        <button className="page-btn" onClick={() => setCurrentPage(pages.length)}><FaAngleDoubleRight/></button>
    </div>
    </>
}