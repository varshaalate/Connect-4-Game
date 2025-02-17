import React from 'react'
import { game_State_Draw, game_State_Playing, game_State_winner } from "../Constants";


const Header = ({ gameState, currentPlayer, winPlayer }) => {
  const renderLabel = () => {
    switch (gameState) {
      case game_State_Playing:
        return <div>Player {currentPlayer} Turn</div>;
      case game_State_winner:
        return <div>Player {winPlayer} Wins</div>;
      case game_State_Draw:
        return <div>Game is Draw</div>;
      default: ;


    }
  }
  return (
    <div className="panel header">
      <div className='header-text'>
        {renderLabel()}
      </div>
    </div>
  )
};

export default Header;