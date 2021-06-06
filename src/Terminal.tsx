import { Vm, Entry } from "./vm";
import "./Terminal.css";

interface Props {
  prompt: string;
  setPrompt: (prompt: string) => void;

  vm: Vm;

  onCompile: () => void;
  onStep: () => void;
  onContinue: () => void;
}

const renderEntry = (entry: Entry) => {
  switch (entry.type) {
    case "Input":
      return (
        <li key={entry.id} className="input">
          {entry.input}
        </li>
      );
    case "Output":
      return (
        <li key={entry.id} className="output">
          {entry.output}
        </li>
      );
    case "Error":
      return (
        <li key={entry.id} className="error">
          {entry.error}
        </li>
      );
  }
};

export const Terminal = ({
  prompt,
  setPrompt,
  vm,
  onCompile,
  onStep,
  onContinue,
}: Props) => {
  return (
    <div id="terminal">
      <div id="history">
        <ul id="entries">{vm.environment.history.map(renderEntry)}</ul>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
      </div>
      <div id="controls">
        <button onClick={onCompile}>Compile</button>
        <button onClick={onStep}>Step</button>
        <button onClick={onContinue}>Continue</button>
      </div>
    </div>
  );
};
