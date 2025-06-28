import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

interface Episode {
  id: number;
  title: string;
  episode: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

interface VideoPlayerProps {
  episodes?: Episode[];
  currentEpisode?: number;
  onEpisodeSelect?: (episodeId: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  episodes = [], 
  currentEpisode = 1,
  onEpisodeSelect 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultEpisodes: Episode[] = [
    {
      id: 1,
      title: "The Final Battle Begins",
      episode: "EP 28",
      duration: "24:15",
      thumbnail: "photo-1526374965328-7f61d4dc18c5",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 2,
      title: "Eren's Decision", 
      episode: "EP 29",
      duration: "23:45",
      thumbnail: "photo-1578662996442-48f60103fc96",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 3,
      title: "The Rumbling",
      episode: "EP 30", 
      duration: "24:30",
      thumbnail: "photo-1488590528505-98d2b5aba04b",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    }
  ];

  const episodeList = episodes.length > 0 ? episodes : defaultEpisodes;
  const currentEpisodeData = episodeList.find(ep => ep.id === currentEpisode) || episodeList[0];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0] / 100;
      videoRef.current.volume = newVolume;
      setVolume(value[0]);
      setIsMuted(value[0] === 0);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEpisodeChange = (episodeId: number) => {
    onEpisodeSelect?.(episodeId);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    handlePlayPause();
  };

  const toggleMute = () => {
    handleMute();
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const percentage = (x / width) * 100;
      handleSeek([percentage]);
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={`https://images.unsplash.com/${currentEpisodeData.thumbnail}?w=1920&h=1080&fit=crop`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        <source src={currentEpisodeData.videoUrl} type="video/mp4" />
        თქვენი ბრაუზერი არ უჭერს მხარს ვიდეო ელემენტს.
      </video>

      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={togglePlay}
      >
        {/* Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-black/70 hover:bg-black/90 text-white rounded-full p-4 tv:p-8 transition-all duration-300 transform hover:scale-110"
            >
              <Play className="h-8 w-8 tv:h-16 tv:w-16" />
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 tv:p-8 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Progress Bar */}
        <div className="mb-4 tv:mb-8">
          <div 
            className="w-full h-2 tv:h-4 bg-gray-600 rounded-full cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-purple-600 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 tv:w-6 tv:h-6 bg-purple-600 rounded-full border-2 border-white shadow-lg"
              style={{ left: `${progress}%`, marginLeft: '-8px' }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 tv:gap-8">
            <button
              onClick={togglePlay}
              className="text-white hover:text-purple-400 transition-colors tv:p-2"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 tv:h-8 tv:w-8" />
              ) : (
                <Play className="h-6 w-6 tv:h-8 tv:w-8" />
              )}
            </button>
            
            <button
              onClick={toggleMute}
              className="text-white hover:text-purple-400 transition-colors tv:p-2"
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6 tv:h-8 tv:w-8" />
              ) : (
                <Volume2 className="h-6 w-6 tv:h-8 tv:w-8" />
              )}
            </button>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 tv:gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange([parseInt(e.target.value)])}
                className="w-20 tv:w-32 h-2 tv:h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-white text-sm tv:text-lg min-w-[3rem] tv:min-w-[4rem]">
                {Math.round(volume)}%
              </span>
            </div>

            {/* Time Display */}
            <div className="text-white text-sm tv:text-lg">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4 tv:gap-8">
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-purple-400 transition-colors tv:p-2"
            >
              <Maximize className="h-6 w-6 tv:h-8 tv:w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 tv:h-16 tv:w-16 border-b-2 border-purple-600"></div>
        </div>
      )}

      {/* Episode List */}
      {showEpisodes && (
        <Card className="bg-gray-800 border-gray-700 glow-effect">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">ეპიზოდები</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {episodeList.map((episode) => (
                <div
                  key={episode.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    episode.id === currentEpisode
                      ? 'bg-purple-600/30 border border-purple-500 glow-effect'
                      : 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
                  }`}
                  onClick={() => handleEpisodeChange(episode.id)}
                >
                  <img
                    src={`https://images.unsplash.com/${episode.thumbnail}?w=120&h=68&fit=crop`}
                    alt={episode.title}
                    className="w-16 h-9 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{episode.episode}</h4>
                    <p className="text-gray-300 text-xs line-clamp-1">{episode.title}</p>
                    <p className="text-gray-400 text-xs">{episode.duration}</p>
                  </div>
                  {episode.id === currentEpisode && (
                    <div className="text-purple-400">
                      <Play className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoPlayer;
