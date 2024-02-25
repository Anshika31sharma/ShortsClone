import React, { useRef, useState, useEffect } from "react";
import YouTube from "react-youtube";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineComment,
  AiFillPlayCircle,
  AiFillPauseCircle,
} from "react-icons/ai";

const Video = React.forwardRef(
  ({ url, title, liked, onLikeClick, onVideoEnd }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [player, setPlayer] = useState(null);

    const videoHeight = "610";
    const videoWidth = "315";

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

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !isPlaying) {
            setIsPlaying(true);
          } else if (!entry.isIntersecting && isPlaying) {
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
    }, [url]);

    const toggleControls = () => {
      setShowControls(!showControls);
    };

    const togglePlay = () => {
      if (player) {
        isPlaying ? player.pauseVideo() : player.playVideo();
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      }
    };

    const onPlayerReady = (event) => {
      setPlayer(event.target);
    };

    return (
      <div
      ref={ref}
      className="videoSection mt-10 relative ml-auto mr-auto"
      style={{
        position: "relative",
        width: `${videoWidth}px`,
        height: `${videoHeight}px`,
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <YouTube
        videoId={url}
        opts={opts}
        onEnd={onVideoEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onReady={onPlayerReady}
      />
      {showControls && (
        <div className="absolute inset-0 flex justify-between items-center">
          <div className="flex items-center ml-36">
            <button
              className="text-4xl text-white"
              onClick={togglePlay}
            >
              {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
            </button>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              className={`text-4xl ${
                liked ? "text-red-500" : "text-white"
              }`}
              onClick={onLikeClick}
            >
              {liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <button className="text-4xl text-white">
              <AiOutlineShareAlt />
            </button>
            <button className="text-4xl text-white">
              <AiOutlineComment />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
);

export default Video;