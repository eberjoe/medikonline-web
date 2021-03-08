import React from 'react';
import './styles.css';

const SpeechBalloon = ({ isSelfSpeech, timestamp, content }) => {
  
  return (
    <div className="container">
      <div className="balloon" style={{
        background: isSelfSpeech ? '#dfa' : '#0ffa',
        float: isSelfSpeech ? 'left' : 'right'
      }}>
        <label className="content">{content}</label>
        <label className="timestamp">{timestamp}</label>
      </div>
    </div>
  )
};

export default SpeechBalloon;