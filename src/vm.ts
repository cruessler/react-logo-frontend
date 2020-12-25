type Binding = null | string;

export type Variables = Record<string, Binding>;

export type Scope =
  | { type: "Root"; variables: Variables }
  | { type: "Local"; address: number; variables: Variables }
  | { type: "Template"; current: Binding; rest: string }
  | { type: "Loop"; current: number };

export type Entry =
  | { type: "Input"; id: number; input: string }
  | { type: "Output"; id: number; output: string }
  | { type: "Error"; id: number; error: string };

export interface Turtle {
  x: number;
  y: number;
  direction: number;
}

interface Vec2 {
  x: number;
  y: number;
}

export interface Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface Line {
  type: "Line";
  id: number;
  start: Vec2;
  end: Vec2;
  color: Color;
}

interface Environment {
  history: Entry[];
  objects: Line[];
  turtle: Turtle;
}

export interface Vm {
  environment: Environment;
  stack: string[];
  instructions: string[];
  scopes: Scope[];
  programCounter: number;
}
