// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import Video from './Video';

const App = () => {
  const videosData = [
    {
      id: 1,
      title: 'Video 1',
      url: 'rUzpB8q574Q', // Just the video ID
      liked: false,
    },
    {
      id: 2,
      title: 'Video 2',
      url: 'FjuX9cnfF3s', // Just the video ID
      liked: false,
    },
    {
      id: 3,
      title: 'Video 3',
      url: 'jlo4GftwF-4', // Just the video ID
      liked: false,
    },
    {
      id: 4,
      title: 'Video 4',
      url: 'sVCCVz0rDlo', // Just the video ID
      liked: false,
    },
  ];

  const [videos, setVideos] = useState(videosData);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLikeClick = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, liked: !video.liked } : video
      )
    );
  };

  const handleVideoEnd = (index) => {
    setActiveIndex(index + 1);

    if (index + 1 < videos.length) {
      videoRefs.current[index + 1].current.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const videoRefs = useRef(videos.map(() => React.createRef()));

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const activeIndex = Math.floor(window.scrollX / window.innerWidth);
        if (activeIndex < videos.length) {
          setActiveIndex(activeIndex); // Update activeIndex based on scroll position
          videoRefs.current[activeIndex].current.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      });
    };

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' && activeIndex < videos.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (event.key === 'ArrowLeft' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videos, activeIndex]);

  return (
    <div className="App  overflow-x-auto snap-type-mandatory">
      {videos.map((video, index) => (
        <Video
          key={video.id}
          ref={videoRefs.current[index]}
          url={video.url}
          title={video.title}
          liked={video.liked}
          onLikeClick={() => handleLikeClick(video.id)}
          onVideoEnd={() => handleVideoEnd(index)}
        />
      ))}
    </div>
  );
};

export default App;
