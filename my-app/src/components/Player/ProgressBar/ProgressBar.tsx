import React, { useState } from 'react';

// Style
import './progressBar.css';

interface IProgressBar {
  video: HTMLVideoElement | null;
  isAd?: boolean;
}
export const ProgressBar = (props: IProgressBar) => {
  const [currentTime, setCurrentTime] = useState(0);
  const { video, isAd } = props;

  if (video) {
    video.addEventListener('timeupdate', ()=> {
      setCurrentTime(video.currentTime)
    })
  }
  const videoDuration = video?.duration || 100
  const porcentage = currentTime / videoDuration * 100

    return (
      <div style={{width: '100%'}}>
        <div
          className={isAd ? 'yellowProgressBar' : 'redProgressBar'}
          style={{ width: `${porcentage}%`}}
          />
      </div>
    )
}

