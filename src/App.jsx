// src/App.js
import React from 'react';
import Video from './Video';

const App = () => {
  const videos = [
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
      title: 'Video 2',
      url: 'jlo4GftwF-4', // Just the video ID
      liked: false,
    },
    {
      id: 4,
      title: 'Video 2',
      url: 'sVCCVz0rDlo', // Just the video ID
      liked: false,
    },
  ];

  const handleLikeClick = (videoId) => {
    // Toggle the liked state for the clicked video
    videos.forEach((video) => {
      if (video.id === videoId) {
        video.liked = !video.liked;
      }
    });
  };

  return (
    <div className="App">
      {videos.map((video) => (
        <Video
          key={video.id}
          url={video.url} // Just the video ID
          title={video.title}
          liked={video.liked}
          onLikeClick={() => handleLikeClick(video.id)}
        />
      ))}
    </div>
  );
};

export default App;
