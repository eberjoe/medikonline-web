import React from 'react';

import * as S from './style';

const SpeechBalloon = ({ isBroadcast = false, isSelfSpeech, timestamp, content, senderId }) => {
  
  return (
    <S.BalloonRow>
      <S.BalloonContainer
        bg={isBroadcast ? 'lightgrey' : isSelfSpeech ? '#dfa' : '#0ffa'}
        f={isSelfSpeech ? 'left' : 'right'}
      >
        <S.Timestamp>{timestamp} {isBroadcast ? `${senderId} emitiu um aviso geral` : `${senderId} escreveu`}</S.Timestamp>
        <S.Message>{content}</S.Message>
      </S.BalloonContainer>
    </S.BalloonRow>
  )
};

export default SpeechBalloon;