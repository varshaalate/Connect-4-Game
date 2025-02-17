import React from 'react'

const Footer = ({onNewGameClickevent , onSuggestClickEvent}) => {
  return (
    <div className="panel footer">
           <button onClick={onNewGameClickevent}>New Game</button>
           <button onClick={onSuggestClickEvent}>Suggest</button>
    </div>
  )
};

export default Footer;