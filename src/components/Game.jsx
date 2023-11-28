import React, { useEffect } from "react";
import { useState, useRef} from "react";
import { useGlobalContext } from "../context";
import Loading from "./Loading";
import Pagination from "./Pagination";
import {Link} from 'react-router-dom'

export default function Game()
{
    const {isFiltered, filteredGameList, isLoading, isLoadingFilter, setCurrentPage, currentPage} = useGlobalContext()
    const [gamesPerPage, setGamesPerPage] = useState(6)

    const lastGameIndex = currentPage * gamesPerPage;
    const firstGameIndex = lastGameIndex - gamesPerPage;

    useEffect(() => {
        setCurrentPage(currentPage)
    }, [filteredGameList.length])

    if(isLoading){
        return <Loading></Loading>
    }
    else{
        if(isFiltered){
            if(isLoadingFilter){
                return <Loading></Loading>
            }
            if(filteredGameList.length > 0)
            {
                return (
                <div className="game-pagination">
                    {filteredGameList.length > gamesPerPage && <Pagination totalPosts={filteredGameList.length} postsPerPage={gamesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}></Pagination>}
                    <div className="game-container">
                        {filteredGameList.slice(firstGameIndex, lastGameIndex).map((item) => {
                            const {id, title, platform, genre, thumbnail, shortDesc} = item;
                            return <div className="game" key={id}>
                                <img src={thumbnail} alt={title} />
                                <div className="title">
                                    <h2>{title}</h2>
                                    <p>{platform}</p>
                                    <p className="description">{shortDesc}</p>
                                </div>
                                
                                <div className="game-info-btn">
                                    <h3>{genre}</h3>
                                    <Link to={`/games/${id}`}><button>More details</button></Link>
                                </div>      
                            </div>   
                        })}
                    </div>
                    {filteredGameList.length > gamesPerPage && <Pagination totalPosts={filteredGameList.length} postsPerPage={gamesPerPage}></Pagination>}
                </div>)
            }
            else {
                return <div className="game-container-notfound">
                    <h2>No games matching the selected categories found </h2>
                </div>
            }
        }
    }
}