import Color from 'colorjs.io';
import { COLOR_MODES } from './constants';

export function renderColor(color: any, mode = COLOR_MODES.OKLCH) {
  const [l, c, h] = color;
  const textColor = `oklch(${Math.floor(l * 1000) / 10}% ${
    Math.floor(c * 1000) / 1000
  } ${Math.floor(h * 360 * 1000) / 1000})`;

  if (mode === COLOR_MODES.OKLCH) return textColor;

  const colorObject = new Color(textColor);
  const [r, g, b] = colorObject
    .to('srgb', { inGamut: true })
    .coords.map((x) => Math.round(x * 255));

  if (mode === COLOR_MODES.RGB) return `rgb(${r} ${g} ${b})`;

  if (mode === COLOR_MODES.HEX)
    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
