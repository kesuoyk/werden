import { ComponentProps } from 'react';
import { SVGObject } from './SVGObject';

type Props = {
  objectPropsList: (ComponentProps<typeof SVGObject>)[];
};

export function SVGObjectLayer({ objectPropsList }: Props) {
  return (
    <g>
      {objectPropsList.map(({ as, attrs }) => (
        <SVGObject
          as={as}
          attrs={attrs}
        />
      ))}
    </g>
  );
}
