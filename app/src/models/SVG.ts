export class SVG {
  constructor(
    private el: SVGSVGElement
  ) {}

  public calcPoint(
    clientX: number,
    clientY: number
  ): {
    x: number;
    y: number;
  } {
    const screenPoint = this.el.createSVGPoint();
    screenPoint.x = clientX;
    screenPoint.y = clientY;

    const ctm = this.el.getScreenCTM();
    if (! ctm) {
      throw new Error();
    }
    const svgPoint = screenPoint.matrixTransform(ctm.inverse())

    return {
      x: svgPoint.x,
      y: svgPoint.y,
    };
  }
}
