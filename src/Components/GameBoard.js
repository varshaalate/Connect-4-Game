import React, { useEffect, useState } from "react";
import GameCircle from "./GameCircle";
import '../Game.css';
import Header from "./Header";
import Footer from "./Footer";
import { isWinner , isDraw , getRandomComputerMove} from "../Helper";
import { Player_1 ,  Player_2 , No_Circles , game_State_Playing ,  game_State_winner , No_player, game_State_Draw} from "../Constants";

const GameBoard = () => {

    // Hook For Gameboard
    const [gameBoard, setGameGoard] = useState(Array(16).fill(No_player));

    // Hook Usestate for currentplayer
    const [currentPlayer, setCurrentPlayer] = useState(Player_1)
    console.log(gameBoard)
    
    // For winning usestate
    const [gameState , setGameState] = useState(game_State_Playing)

    // Usestate for winning player
    const [winPlayer , setWInPlayer] =  useState(No_player)

    useEffect(() =>{
        initgame();
    } ,[])


    // To rest the game
    const initgame = () =>{
        console.log("initgame")
        setGameGoard(Array(16).fill(No_player))
        setCurrentPlayer(Player_1)
        setGameState(game_State_Playing)
    };


    // Function for intialize the board and repeat circle
    const initBoard = () => {
        const circles = []
        for (let i = 0; i < No_Circles; i++) {
            circles.push(renderCircle(i));
        }
        return circles
    }

    // To suggest move randomly
    const suggestMove = () =>{
        console.log("SuggestMove")
        circleClicked(getRandomComputerMove(gameBoard));
    }

    // Circlecliked fuction on click 
    const circleClicked = (id) => {
        console.log("clicked", + id)

        // For clicking on same circle
        if(gameBoard[id]!==No_player) return;

        // To stop the game working after winning one of the player
        if(gameState!== game_State_Playing) return;

        // const board = [...gameBoard]
        // board[id]=currentPlayer;
        // setGameGoard(board);
        console.log(gameBoard)


        // Setgameboard to change state of board
        setGameGoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            });
        });

        if (isWinner(gameBoard ,id , currentPlayer)) {
            // console.log("Winner");
            setGameState(game_State_winner)
            setWInPlayer(currentPlayer)
        }

        if (isDraw(gameBoard ,id , currentPlayer)) {
            // console.log("Winner");
            setGameState(game_State_Draw)
            setWInPlayer(No_player)
        }

        setCurrentPlayer(currentPlayer === Player_1 ? Player_2 : Player_1);
        console.log(currentPlayer)
    }

    // Render function for circle 
    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleCliked={circleClicked}></GameCircle>
    }

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer = {winPlayer}/>
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClickevent={initgame}  onSuggestClickEvent={suggestMove}/>
        </>

    )
}

export default GameBoard;