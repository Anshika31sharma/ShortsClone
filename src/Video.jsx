// Video.jsx
import React, { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt, AiOutlineComment } from 'react-icons/ai';

const Video = React.forwardRef(({ url, title, liked, onLikeClick, onVideoEnd }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Assuming you're maintaining the same dimensions as before
  const videoHeight = "560"; // Height in pixels
  const videoWidth = "315"; // Width in pixels

  const opts = {
    height: videoHeight, 
    width: videoWidth,
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className="videoSection flex justify-center items-center mt-13 pb-0 h-[calc(100vh-70px)] scroll-snap-align-start relative"
      style={{ scrollSnapAlign: 'start', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <div className="relative" style={{ width: `${videoWidth}px`, height: `${videoHeight}px` }}>
        <YouTube videoId={url} opts={opts} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnd={onVideoEnd} />
        {showControls && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="flex flex-col items-center space-y-4 ml-64 mt-36">
              <button className={`text-4xl ${liked ? 'text-red-500' : 'text-white'}`} onClick={onLikeClick}>
                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
              <button className="text-4xl text-white"><AiOutlineShareAlt /></button>
              <button className="text-4xl text-white"><AiOutlineComment /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Video;
