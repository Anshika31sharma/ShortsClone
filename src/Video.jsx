// Video.jsx
import React, { useRef, useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import YouTube from 'react-youtube';
import { useSwipeable } from 'react-swipeable';

const Video = React.forwardRef(({ url, title, liked, onLikeClick, onVideoEnd }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const opts = {
    height: '700',
    width: '100%',
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
    },
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      // Handle swipe up event (move to the next video, for example)
      onVideoEnd();
    },
    onSwipedDown: () => {
      // Handle swipe down event (move to the previous video, for example)
      // You might need to implement logic to go to the previous video
    },
  });

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
    <div ref={ref} className="relative mb-6 overflow-hidden bg-black rounded-md mx-auto sm:w-2/3 lg:w-1/2 xl:w-1/3 scroll-snap-align-start" {...swipeHandlers}>
      <div className="w-full h-auto" style={{ scrollSnapAlign: 'start' }}>
        <YouTube videoId={url} className="w-full h-auto" opts={opts} onPlay={handlePlay} onPause={handlePause} onEnd={onVideoEnd} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white flex justify-between">
        <p className="text-sm truncate">{title}</p>
        <button
          className={`text-2xl text-red-500 ${liked ? 'text-red-500' : 'text-white'}`}
          onClick={onLikeClick}
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>
    </div>
  );
});

export default Video;
