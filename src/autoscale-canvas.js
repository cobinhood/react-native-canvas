const scale = ratio => item => {
  if (typeof item === 'number') {
    return item * ratio;
  }
  return item;
};

/**
 * Extracted from https://github.com/component/autoscale-canvas
 * @param {Canvas} canvas 
 * @return {Canvas}
 */
window.autoScaleCanvas = function autoScaleCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;
  if (ratio !== 1) {
    const width = canvas.layoutWidth || canvas.width;
    const height = canvas.layoutHeight || canvas.height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);
    ctx.isPointInPath = (...args) =>
      CanvasRenderingContext2D.prototype.isPointInPath.apply(ctx, args.map(scale(ratio)));
  }
  return canvas;
};
