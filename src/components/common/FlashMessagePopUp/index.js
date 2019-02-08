import React from 'react';

import './index.scss';

const FlashMessagePopUp = ({flashMessage}) => {
  return (
    <div className={`flash-message ${flashMessage.type}`}>
      <ul className="flash-message__list">
        { flashMessage.messages.map((message, index) => <li key={index} className="flash-message__list__item">{message}</li>) }
      </ul>
    </div>
  )
}

export default FlashMessagePopUp;