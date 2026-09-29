"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const delay = done ? 1800 : cleared ? 250 : deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className="text-fg">
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] bg-accent" />
    </span>
  );
}
