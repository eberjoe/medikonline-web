import React from 'react';
import './styles.css';

const SpeechBalloon = ({ isBroadcast = false, isSelfSpeech, timestamp, content }) => {
  
  return (
    <div className="container">
      <div className="balloon" style={{
        background: isBroadcast ? 'lightgrey' : isSelfSpeech ? '#dfa' : '#0ffa',
        float: isSelfSpeech ? 'left' : 'right'
      }}>
        <label className="content">{content}</label>
        <label className="timestamp">{timestamp} {isBroadcast && 'mensagem publicitária'}</label>
      </div>
    </div>
  )
};

export default SpeechBalloon;