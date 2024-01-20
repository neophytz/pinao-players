import React, { useState } from 'react'
import piano_keys from "./keys.json";
import { PinaoKey, PinaoKeyColor, PinaoKeyProps } from './Key';

export const Keyboard: React.FC = () => {
  const keys = piano_keys as PinaoKeyProps[];
  const [trackPlayed, setTrackPlayed] = useState("");

  const addKeyToTrack = (key: string) => {
    setTrackPlayed(current => current + key);
  }

  return (
    <React.Fragment>
      <div className='p-10 bg-gray-800 rounded-lg text-center text-white'>
        {trackPlayed}
      </div>
      <div className='p-2 flex justify-center align-center'>
        {
          keys.map((keyConfig, index) => (
            <PinaoKey 
              key={index} 
              name={keyConfig.name} 
              soundFile={keyConfig.soundFile} 
              color={keyConfig.color as PinaoKeyColor} 
              trackRecord={addKeyToTrack} 
            />
          ))
        }
      </div>
    </React.Fragment>
  )
}
