import { Turtle, Vm, Color, Line } from "./vm";
import { mat4, vec3 } from "gl-matrix";
import "./Canvas.css";

interface Size {
  width: number;
  height: number;
}

const getViewBox = ({ width, height }: Size) => {
  return [-Math.round(width / 2), -Math.round(height / 2), width, height].join(
    " "
  );
};

const getTurtlePoints = ({ x, y, direction }: Turtle) => {
  const point1 = vec3.fromValues(-15, 0, 0);
  const point2 = vec3.fromValues(15, 0, 0);
  const point3 = vec3.fromValues(0, -30, 0);

  const points = [point1, point2, point3];

  let transform: mat4 = mat4.create();

  mat4.fromTranslation(transform, vec3.fromValues(x, y, 0));
  mat4.rotate(transform, transform, direction, vec3.fromValues(0, 0, 1));
  mat4.translate(transform, transform, vec3.fromValues(0, 1, 0));

  const transformedPoints = points.map((point) =>
    vec3.transformMat4(point, point, transform)
  );

  return transformedPoints.map(([x, y]: any) => `${x},${y}`).join(" ");
};

const getRgba = ({ red, green, blue, alpha }: Color) => {
  return `rgba(${red * 255.0}, ${green * 255.0}, ${blue * 255.0}, ${alpha})`;
};

const renderObject = (object: Line) => {
  switch (object.type) {
    case "Line":
      return (
        <polyline
          key={object.id}
          fill="none"
          stroke={getRgba(object.color)}
          points={`${object.start.x},${object.start.y} ${object.end.x},${object.end.y}`}
        />
      );
  }
};

interface Props {
  size: Size;
  vm: Vm;
}

export const Canvas = ({ size, vm }: Props) => {
  return (
    <div id="canvas">
      <svg viewBox={getViewBox(size)}>
        {vm.environment.objects.map(renderObject)}
        <polygon id="turtle" points={getTurtlePoints(vm.environment.turtle)} />
      </svg>
    </div>
  );
};
