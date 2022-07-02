import './App.css';
import { useState, useRef } from 'react';

function translateScreenPointToSvgPoint(
  viewPortSvg: SVGSVGElement,
  clientX: number,
  clientY: number
): {
  x: number;
  y: number;
} {
  const screenPoint = viewPortSvg.createSVGPoint();
  screenPoint.x = clientX;
  screenPoint.y = clientY;

  const ctm = viewPortSvg.getScreenCTM();
  if (! ctm) {
    throw new Error();
  }
  const svgPoint = screenPoint.matrixTransform(ctm.inverse())

  return {
    x: svgPoint.x,
    y: svgPoint.y,
  };
}

function Custom(props: { as: string, attrs: {} }) {
  const TagName = props.as || 'rect';

  return <TagName {...props.attrs}></TagName>
}

function App() {
  const svgElRef = useRef<SVGSVGElement | null>(null);
  const [svgElements, setSvgElements] = useState<JSX.Element[]>([]);

  function handleBackgroundClick(event: React.MouseEvent<SVGElement>) {
    if (! svgElRef.current) {
      throw new Error();
    }

    const point = translateScreenPointToSvgPoint(
      svgElRef.current,
      event.clientX,
      event.clientY
    );
    const svgElement = <Custom
      as="circle"
      attrs={{
        cx: point.x,
        cy: point.y,
        r: 20,
        fill: 'white',
      }}
    />;

    setSvgElements((prev) => [...prev, svgElement]);
  }

  return (
    <svg
      ref={svgElRef}
      version="1.1"
      width="800"
      height="800"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
     >
       <rect
         className="background"
         onClick={handleBackgroundClick}
       />
       {svgElements.map((element) => element)}
    </svg>
  );
}

export default App;
