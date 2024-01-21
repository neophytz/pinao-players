import React, { useState } from 'react'
import piano_keys from "./keys.json";
import { PinaoKey, PinaoKeyColor, PinaoKeyProps } from './Key';

export const Keyboard: React.FC = () => {
  const keys = piano_keys as PinaoKeyProps[];
  const [trackPlayed, setTrackPlayed] = useState<string[]>([]);

  const addKeyToTrack = (key: string) => {
    setTrackPlayed(current => [...current, key]);
  }

  return (
    <React.Fragment>
      <div className='p-10 bg-gray-800 rounded-lg text-center text-white flex items-center justify-between'>
        <div>
          {trackPlayed.map((singleNote, index) => <span key={index}>{singleNote}</span>)}
        </div>
        {trackPlayed.length !== 0 ? <span onClick={() => setTrackPlayed([])} className='p-3 bg-gray-50 text-black rounded-md cursor-pointer hover:bg-gray-200'>Clear</span> : ""}
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
