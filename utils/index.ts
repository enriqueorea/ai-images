import { surpriseMePrompts } from "@/constants";
export const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  return surpriseMePrompts[randomIndex] === prompt
    ? getRandomPrompt(prompt)
    : surpriseMePrompts[randomIndex];
};
