import { examples } from "./examples";
import "./Examples.css";

interface Props {
  setPrompt: (prompt: string) => void;
}

export const Examples = ({ setPrompt }: Props) => {
  return (
    <div id="examples">
      <h1>Examples</h1>
      <ul>
        {examples.map(([title, code]) => (
          <li key={title}>
            <button onClick={() => setPrompt(code)}>{title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
