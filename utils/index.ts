import { surpriseMePrompts } from "@/constants";
import FileSaver from "file-saver";

export const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  return surpriseMePrompts[randomIndex] === prompt
    ? getRandomPrompt(prompt)
    : surpriseMePrompts[randomIndex];
};

export const downloadImage = (_id: string, photo: string) => {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
};
