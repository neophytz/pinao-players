import { PinaoKeyProps } from "../pages/piano/Key";

export const playSound = (soundfile: string) => {
  const soundFile = new Audio(soundfile);
  soundFile.play();
}

export const findSoundFileUsingKey = (key: string, arr: PinaoKeyProps[]) => arr.find(singleNote => singleNote.name === key)