import React from "react";
import ReactTypingEffect from "react-typing-effect";
export const TypeEffect = (props) => {
  return (
    <>
      <ReactTypingEffect typingDelay={500} text={["Amazingly!", "Beautifully!", "Wisely!"]} />
    </>
  );
};
