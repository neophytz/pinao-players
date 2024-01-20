import React, { useEffect } from 'react'

export type PinaoKeyColor = "black" | "white";

export interface PinaoKeyProps {
    name: string;
    soundFile: string;
    color?: PinaoKeyColor;
    trackRecord: (key: string) => void
}

const playSound = (soundfile: string) => {
  const soundFile = new Audio(soundfile);
  soundFile.play();
}

export const PinaoKey: React.FC<PinaoKeyProps> = ({name, soundFile, color, trackRecord}) => {
  color ||= "white";


  useEffect(() => {
    const player = (e: KeyboardEvent) => {
      if(e.key === name.toLowerCase()){
        playSound(soundFile)
        trackRecord(name);
      }
    }

    window.addEventListener("keypress", player);
    return () => {
      window.removeEventListener("keydown", player)
      // trackRecord(name)
    }
  }, [name, soundFile])

  return (
    <div 
      onClick={() => playSound(soundFile)}
      className={
        `w-20 inline pt-10 text-center 
        h-96 rounded-lg m-1 outline outline-1 outline-white 
        transition duration-100
        shadow-md hover:shadow-none
        ${color === "black" ? "bg-gray-700 hover:bg-gray-950 text-white" : "bg-white"}
        `
      }
    >
      <span className='uppercase'>{name}</span>
    </div>
  )
}
