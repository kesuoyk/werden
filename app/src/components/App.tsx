import { useState, useRef, ComponentProps } from 'react';

import { SVG } from '../models/SVG';

import { Background } from './Background';
import { SVGObjectLayer } from './SVGObjectLayer';
import './App.css';

function App() {
  const svgElRef = useRef<SVGSVGElement | null>(null);
  const [objectPropsList, setObjectPropsList] = useState<
    ComponentProps<typeof SVGObjectLayer>['objectPropsList']
  >([]);

  function handleBackgroundClick(event: React.MouseEvent<SVGElement>) {
    if (! svgElRef.current) {
      throw new Error();
    }

    const svg = new SVG(svgElRef.current);
    const point = svg.calcPoint(event.clientX, event.clientY);

    setObjectPropsList((prev) => [...prev, {
      as: 'circle',
      attrs: {
        cx: point.x,
        cy: point.y,
        r: 20,
        fill: 'white',
      }
    }]);
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
       <Background handleClick={handleBackgroundClick}/>
       <SVGObjectLayer objectPropsList={objectPropsList}/>
    </svg>
  );
}

export default App;
