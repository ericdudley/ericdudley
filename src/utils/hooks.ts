import { useEffect, useState } from 'react';
import { invertPhrase } from './invert';

export function useRandomText(text: string) {
  const [newText, setNewText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        return;
      }
      const idx = Math.floor(Math.random() * text.length);
      const shouldInvertAll = Math.random() < 0.05;
      setNewText(
        shouldInvertAll
          ? invertPhrase(text)
          : `${text.slice(0, idx)}${invertPhrase(text[idx])}${text.slice(
            idx + 1,
            text.length,
          )}`,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [text]);

  return newText;
}
