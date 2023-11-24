import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import Game from "./Game";
import "../styles/game-store.css"

export default function Gamestore()
{
    return <div className="games-container">
        <Sidebar></Sidebar>

        <div className="games">
            <Game></Game>
        </div>
    </div>
}