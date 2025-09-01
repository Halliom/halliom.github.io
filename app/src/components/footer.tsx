import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="w-full py-16 h-16 bg-zinc-800 justify-center items-center flex flex-col md:flex-row gap-4">
      <span>Copyright 2025 Johan Wieslander</span>
      <a href="https://www.linkedin.com/in/johan-wieslander-080756113/" target="_blank" rel="noreferrer">Linkedin</a>
      <a href="https://github.com/Halliom" target="_blank" rel="noreferrer">Github</a>
    </div>
  );
};
