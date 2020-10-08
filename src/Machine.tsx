import React from "react";
import { Variables, Vm, Scope } from "./vm";
import "./Machine.css";

interface Props {
  vm: Vm;
}

const renderVariables = (variables: Variables) => (
  <table>
    <tbody>
      {Object.entries(variables).map(([name, binding]) => (
        <tr>
          <td>{name}</td>
          <td>{binding ?? "_"}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const renderScope = (scope: Scope) => {
  switch (scope.type) {
    case "Root":
      return (
        <li>
          <h3>Root</h3>
          {renderVariables(scope.variables)}
        </li>
      );
    case "Local":
      return (
        <li>
          {" "}
          <h3>Local@{scope.address}</h3>
          {renderVariables(scope.variables)}
        </li>
      );
    case "Template":
      return (
        <li>
          <h3>Template</h3>
          <table>
            <tbody>
              <tr>
                <td>current</td>
                <td>{scope.current ?? "_"}</td>
              </tr>
              <tr>
                <td>rest</td>
                <td>{scope.rest}</td>
              </tr>
            </tbody>
          </table>
        </li>
      );
    case "Loop":
      return (
        <li>
          <h3>Loop@{scope.current}</h3>
        </li>
      );
  }
};

export const Machine = ({ vm }: Props) => {
  const currentInstruction = vm.instructions[vm.programCounter] ?? "none";

  return (
    <div id="machine">
      <div id="stack">
        <h2>Stack</h2>
        <ul>
          {vm.stack.map((entry) => (
            <li>{entry}</li>
          ))}
        </ul>
      </div>

      <div id="scopes">
        <h2>Scopes</h2>
        <ul>{vm.scopes.map(renderScope)}</ul>
      </div>

      <div id="instructions">
        <h2>Instructions</h2>
        <h3>Next</h3>
        <table>
          <tbody>
            <tr className="current">
              <td>{vm.programCounter}</td>
              <td>{currentInstruction}</td>
            </tr>
          </tbody>
        </table>
        <table id="program">
          <tbody>
            {vm.instructions.map((instruction, i) => {
              if (i === vm.programCounter) {
                return (
                  <tr className="current">
                    <td>{i}</td>
                    <td>{instruction}</td>
                  </tr>
                );
              } else {
                return (
                  <tr>
                    <td>{i}</td>
                    <td>{instruction}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
