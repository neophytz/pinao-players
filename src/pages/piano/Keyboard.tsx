import React, { useState } from 'react'
import piano_keys from "./keys.json";
import { PinaoKey, PinaoKeyColor, PinaoKeyProps } from './Key';
import { findSoundFileUsingKey, playSound } from '../../utils';

export const Keyboard: React.FC = () => {
  const keys = piano_keys as PinaoKeyProps[];
  const [trackPlayed, setTrackPlayed] = useState<string[]>([]);
  // const [singleKey, setSingleKey] = useState('')

  const addKeyToTrack = (key: string) => {
    setTrackPlayed(current => [...current, key]);
  }

  const playTrack = (trackArr: string[]) => {
    trackArr.map(singleNote => {
      const keyObjext = findSoundFileUsingKey(singleNote, keys) as PinaoKeyProps
      // setSingleKey(keyObjext.soundFile)
      // console.log(typeof keyObjext.soundFile, keyObjext.soundFile)
      playSound(keyObjext.soundFile)
    })
  }

  return (
    <React.Fragment>
      <div className={`px-10 ${trackPlayed.length !== 0 ? "py-4" : "py-10"} bg-gray-800 rounded-lg text-center text-white flex items-center justify-between`}>
        <div>
          {trackPlayed.map((singleNote, index) => <span key={index}>{singleNote}</span>)}
        </div>
        {trackPlayed.length !== 0 ? (
          <React.Fragment>
            <div className="w-1/2 flex justify-end">
              <span onClick={() => playTrack(trackPlayed)} className='px-3 bg-gray-50 text-black rounded-md cursor-pointer hover:bg-gray-200 flex justify-center items-center'>

                <svg stroke="currentColor" className='text-2xl' fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"></path></svg>

              </span>
              <span onClick={() => setTrackPlayed([])} className='mx-2 p-3 bg-gray-50 text-black rounded-md cursor-pointer hover:bg-gray-200'>Clear</span>
            </div>
          </React.Fragment>
        ) : ""}
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

