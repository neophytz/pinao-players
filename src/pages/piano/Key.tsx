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
export const PinaoKey: React.FC<PinaoKeyProps> = ({ name, soundFile, color, trackRecord }) => {
  color ||= "white";


  useEffect(() => {
    const player = (e: KeyboardEvent) => {
      if (e.key === name.toLowerCase()) {
        playSound(soundFile)
        trackRecord(name);
      }
    }

    window.addEventListener("keypress", player);
    return () => {
      // ---- here is the bug --- it should be "keypress" not "keydown"
      window.removeEventListener("keypress", player)
    }
  }, [name, soundFile, trackRecord])

  return (
    <div
      onClick={() => playSound(soundFile)}
      className={
        `w-20 inline pt-10 text-center 
        rounded-lg m-1 outline outline-1 outline-white 
        transition duration-100
        shadow-md hover:shadow-none
        ${color === "black" ? "bg-gray-700 hover:bg-gray-950 text-white h-60" : "bg-white h-96"}`
      }
    >
      <span className='uppercase'>{name}</span>
    </div>

  )
}
