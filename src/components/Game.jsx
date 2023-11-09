import React from "react";
import { useGlobalContext } from "../context";

export default function Game()
{
    const {gameList} = useGlobalContext()
    console.log(gameList)

    return <div className="game-container">
        {gameList.slice(0, 6).map((item) => {
            const {id, title, platform, genre, thumbnail, shortDesc} = item;
            return <div className="game">
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