'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Script from 'next/script'

export default function Component() {
  const [originalPrice, setOriginalPrice] = useState(80) // This should be passed from the previous page
  const [showPrize, setShowPrize] = useState(false)
  const [prize, setPrize] = useState(60) // This should be passed from the previous page
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false) // Track if the video is playing
  const playerRef = useRef(null)

  const videoIds = [
    'jrd-acToTsE', // Replace with your actual YouTube video IDs
    'ZvzKuqSDyG8',
    'K87aFjB7Ff0'
  ]

  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = initializeYouTubePlayer
  }, [])

  const initializeYouTubePlayer = () => {
    const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)]

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '360',
      width: '640',
      videoId: randomVideoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange, // Add this to track state changes
      }
    })
  }

  const onPlayerReady = (event) => {
    setVideoLoaded(true)
    event.target.playVideo()
  }

  // Track when the video is playing or paused
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true) // Video is playing
      setTimeout(() => {
        event.target.stopVideo()
        setShowPrize(true) // Show prize when video stops after 12 seconds
        setIsPlaying(false) // Stop showing the playing state
      }, 12000)
    } else {
      setIsPlaying(false) // Video is not playing (paused, ended, etc.)
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <Script src="https://www.youtube.com/iframe_api" />
      
      <motion.h2 
        className="text-3xl font-bold text-green-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ORIGINAL PRICE: ${originalPrice}
      </motion.h2>
      
      <motion.div 
        className="w-full max-w-xl aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div id="youtube-player" />
        {!videoLoaded && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-xl">Loading video...</div>
          </div>
        )}
      </motion.div>

      {/* Conditionally show the discounted price only if the video is playing or it has finished */}
      {showPrize && (
        <motion.div
          className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Congratulations!</h3>
          <p className="text-xl text-green-400">Now you've to pay :</p>
          <p className="text-4xl font-bold text-green-400 mt-2">${prize}</p>
        </motion.div>
      )}

      {/* If the video is playing, show this message */}
      {isPlaying && (
        <motion.div
          className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl font-bold text-green-400">
            The video is playing! Watch till the end to get the prize!
          </p>
        </motion.div>
      )}
    </div>
  )
}
