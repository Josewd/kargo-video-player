import React from 'react';

// Icons
import PauseIcon from '../../../Icons/PauseIcon';
import PlayIcon from '../../../Icons/PlayIcon';

// Style
import './button.css'

interface IButtonProps {
  isPlaying?: boolean;
  onClick(): void;
}
const ButtonPlay = ({ onClick, isPlaying}: IButtonProps) => {
  return (
    <button onClick={onClick}>
      {isPlaying ?  <PauseIcon height={35} width={35} /> : <PlayIcon height={35} width={35} />}
    </button>
  );
}

export default ButtonPlay;