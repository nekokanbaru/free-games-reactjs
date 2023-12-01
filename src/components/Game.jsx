import React, { useEffect } from "react";
import { useState, useRef} from "react";
import { useGlobalContext } from "../context";
import Loading from "./Loading";
import Pagination from "./Pagination";
import {Link} from 'react-router-dom'
import GameSearch from "./GameSearch";

export default function Game()
{
    const {isFiltered, filteredGameList, isLoading, isLoadingFilter, setCurrentPage, currentPage, lastPage} = useGlobalContext()
    const [gamesPerPage, setGamesPerPage] = useState(6)

    const lastGameIndex = currentPage * gamesPerPage;
    const firstGameIndex = lastGameIndex - gamesPerPage;

    useEffect(() => {
        //if the page that was left when we went back to home is greater than the number on pages when we change the filters, set the page back to one   
        if(currentPage > lastPage){
            setCurrentPage(1)
        }
        else {
            setCurrentPage(currentPage)
        }
    }, [filteredGameList.length, lastPage])

    if(isLoading){
        return <Loading></Loading>
    }
    else{
        if(isFiltered){
            if(isLoadingFilter){
                return <Loading></Loading>
            }
            
                return (
                <div className="game-pagination">
                    {<GameSearch></GameSearch>}
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
                    {filteredGameList.length == 0 && <div className="game-container-notfound">
                     <h2>No games matching the selected categories found </h2></div>}
                 
                </div>)
           
        }
    }
}