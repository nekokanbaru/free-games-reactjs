export default function Pagination({totalPosts, postsPerPage, setCurrentPage, currentPage}) {

    let pages = []
    
    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }

    return <>
    <div className="pages-wrapper">
        {pages.map((page, index) => {
            return <button className={currentPage === page ? 'page-btn active':'page-btn'} onClick={() => setCurrentPage(page)} key={index}>{page}</button>
        })}
    </div>
    </>
}