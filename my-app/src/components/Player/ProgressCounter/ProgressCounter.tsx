import React from "react";

// Style
import './progressCounter.css';

interface IProgressCounterProps {
  video: HTMLVideoElement | null
};

const ProgressCounter = ({ video }: IProgressCounterProps) => {
  const [currentTime, setCurrentTime] = React.useState(0);

  const videoDuration = video?.duration || 0;
  const [ minutes, seconds ] = parseSecondsToTimerMinutesAndSeconds(videoDuration);
  const [ minPlayed, secPlayed ] = parseSecondsToTimerMinutesAndSeconds(currentTime);

  React.useEffect(() => {
    if (video) {
      video.addEventListener('timeupdate', ()=> {
        setCurrentTime(video.currentTime)
      })
    }

    return video?.removeEventListener('timeupdate', () => {});
  }, [video]);
  
  return (
    <div className="ProgressCounter">
      <span className="Timer">{minPlayed}:{secPlayed}</span>/
      <span className="Timer">{minutes}:{seconds}</span>
    </div>
  )
}

export default ProgressCounter;

const parseSecondsToTimerMinutesAndSeconds = (duration: number) => {
  const minutes =  Math.floor(duration / 60);
  const seconds =  Math.ceil(minutes * 60 - duration) * -1;

  return [ minutes || '00', seconds < 10 ? '0'+ seconds : seconds ];
}