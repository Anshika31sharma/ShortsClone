// src/components/Video.js
import React, { useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import YouTube from 'react-youtube';

const Video = ({ url, title, liked, onLikeClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const opts = {
    height: '360',
    width: '100%', // Adjusted width for responsiveness
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: isPlaying ? 1 : 0,
    },
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative mb-6 overflow-hidden bg-black rounded-md mx-auto sm:w-2/3 lg:w-1/2 xl:w-1/3">
      <YouTube videoId={url} className="w-full h-auto" opts={opts} onPlay={handlePlay} onPause={handlePause} />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white flex justify-between">
        <p className="text-sm truncate">{title}</p>
        <button
          className={`text-2xl text-white ${liked ? 'text-red-500' : 'text-white'}`}
          onClick={onLikeClick}
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>
    </div>
  );
};

export default Video;
