import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Canvas } from "./Canvas";
import { Terminal } from "./Terminal";
import { Examples } from "./Examples";
import { Machine } from "./Machine";

// This is an external dependency that is, as of October 2020, not part of
// react-logo-frontend.
//
// It can be copied from the build output of [elm-logo].
//
// [elm-logo]: https://github.com/cruessler/elm-logo
const worker = new Worker("/worker.js");

export const App = () => {
  const [prompt, setPrompt] = useState("");
  const [vm, setVm] = useState({
    stack: [],
    instructions: [],
    scopes: [],
    environment: {
      history: [],
      objects: [],
      turtle: { x: 0, y: 0, direction: 0 },
    },
    programCounter: 0,
  });

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onMessage = useCallback((event) => {
    event.data.environment.history.reverse();

    setVm(event.data);
  }, []);

  useEffect(() => {
    worker.addEventListener("message", onMessage);

    return () => worker.removeEventListener("messAge", onMessage);
  }, [onMessage]);

  const onResize = useCallback(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("message", onResize);
  }, [onResize]);

  const onCompile = () => {
    worker.postMessage({ type: "Compile", source: prompt });
  };

  const onStep = () => {
    worker.postMessage({ type: "Step" });
  };

  const onContinue = () => {
    worker.postMessage({ type: "Continue" });
  };

  return (
    <main id="app">
      <Canvas vm={vm} size={size} />
      <div id="overlay">
        <div id="overlay-left">
          <Terminal
            prompt={prompt}
            setPrompt={setPrompt}
            vm={vm}
            onCompile={onCompile}
            onStep={onStep}
            onContinue={onContinue}
          />

          <Examples setPrompt={setPrompt} />
        </div>
        <Machine vm={vm} />
      </div>
    </main>
  );
};
