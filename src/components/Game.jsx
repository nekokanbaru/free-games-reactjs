import React from "react";
import { useGlobalContext } from "../context";
import Loading from "./Loading";

export default function Game()
{
    const {gameList, isFiltered, filteredGameList, isLoading, isLoadingFilter} = useGlobalContext()

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
                return <div className="game-container">
                    {filteredGameList.slice(0, 6).map((item) => {
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
                                <button>More details</button>
                            </div>      
                        </div>   
                    })}
                </div>
            }
            else {
                return <div className="game-container-notfound">
                    <h2>No games matching the selected categories found </h2>
                </div>
            }
        }

        else {
            return <div className="game-container">
                {gameList.slice(0, 6).map((item) => {
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
                            <button>More details</button>
                        </div>      
                    </div>
                })}
            </div>
        }
    }
}