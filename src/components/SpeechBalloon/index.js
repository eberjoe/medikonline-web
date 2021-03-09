import React from 'react';
import './styles.css';

const SpeechBalloon = ({ isBroadcast = false, isSelfSpeech, timestamp, content, senderId }) => {
  
  return (
    <div className="container">
      <div className="balloon" style={{
        background: isBroadcast ? 'lightgrey' : isSelfSpeech ? '#dfa' : '#0ffa',
        float: isSelfSpeech ? 'left' : 'right'
      }}>
        <label className="timestamp">{timestamp} {isBroadcast ? `${senderId} emitiu um aviso geral` : `${senderId} escreveu`}</label>
        <label className="content">{content}</label>
      </div>
    </div>
  )
};

export default SpeechBalloon;