import React from "react";

//Components
import { ProgressBar } from "./ProgressBar/ProgressBar";
import ProgressCounter from "./ProgressCounter/ProgressCounter";
import ButtonPlay from "./Button/Button";

// Styles
import './player.css';

interface IPlayerProps {
  url: string;
  isAds?: boolean;
  notifyAdHasEnded?: () => void;
}

// Constants
const ADS_INTERVAL = 3;
const ONE_SECOND = 1000;

export const Player = ({ isAds = false, notifyAdHasEnded, url}: IPlayerProps) => {
  const [isMainVideoPlaying, setIsMainVideoPlaying] = React.useState(isAds);
  const [isAdsPlaying, setIsAdsPlaying] = React.useState(false);
  const [count, setCount] = React.useState(0);
  
  let timer: number| NodeJS.Timeout | undefined;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (isMainVideoPlaying) {
      videoRef?.current?.pause();
    } else {
      videoRef?.current?.play();
    }
    setIsMainVideoPlaying(!isMainVideoPlaying);
  };

  const onVideoFinish = () => {
    if(isAds && notifyAdHasEnded) {
      notifyAdHasEnded()
    } else {
      const hasVideoNotEndend = videoRef.current?.currentTime !== videoRef.current?.duration
      setTimeout(() => {
        if (hasVideoNotEndend) {
          videoRef.current?.play()
          setIsMainVideoPlaying(true)
        } else {
          setIsMainVideoPlaying(false)
        }
        setIsAdsPlaying(false)
        setCount(0)
      }, ONE_SECOND)
    }
  }

  const startAdsIntervalCount = () => {
    timer = setInterval(() => {
     setCount(prevCount => prevCount + 1);
    }, ONE_SECOND);
  }

  const handleAdsIntervalCountValidation = () => {
    if (count === ADS_INTERVAL && !isAds) {
      videoRef.current?.pause();
      setIsMainVideoPlaying(false);
      setIsAdsPlaying(true);
      setCount(0);
    }
  }

  React.useEffect(() => {
    handleAdsIntervalCountValidation();
    
    if (isMainVideoPlaying) {
        startAdsIntervalCount();
    } 
    return () => clearInterval(timer);

  }, [count, isMainVideoPlaying]);

  return (
    <>
      <div
        className="Player_wrapper center_wrapper"
        style={{opacity: (!isAds && isAdsPlaying) ? 0 : 1}}>
        <video
          onClick={togglePlay}
          ref={videoRef}
          width="100%"
          onEnded={onVideoFinish}
          autoPlay={isAds}
          onPause={() => clearInterval(timer)}>
            <source src={url} type="video/mp4" />
        </video>
        <div className="controls">
          <ProgressBar
            isAd={isAds}
            video={videoRef.current}/>
          <div className="rowContainer">
            <ButtonPlay isPlaying={isMainVideoPlaying} onClick={togglePlay} />
            <ProgressCounter video={videoRef.current}/>
          </div>
        </div>
      </div>
      <div
        className="center_wrapper"
        style={{opacity: !isAdsPlaying ? 0 : 1}}>
        {isAdsPlaying && (
          <Player
            isAds
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            notifyAdHasEnded={onVideoFinish}
          />
        )}
      </div>
    </>
  )
}