import { COLOR_MODES } from '@/constants';
import { renderColor } from '@/utils';
import Color from 'colorjs.io';
import { defineStore } from 'pinia';
import { computed, ref, watch, type Ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const colors: Ref<Record<string, any>> = ref({});
  const colorMode: Ref<string> = ref(COLOR_MODES.OKLCH);

  const contrastColors = computed(() => {
    return colors.value.background && colors.value.foreground
      ? [
          renderColor(colors.value.background, colorMode.value),
          renderColor(colors.value.foreground, colorMode.value),
        ]
      : [];
  });

  function getContrastColor(colorText: string) {
    if (contrastColors.value.length < 2) return;

    const color = new Color(colorText);

    return color.contrastWCAG21((contrastColors.value as any)[0]) >=
      color.contrastWCAG21((contrastColors.value as any)[1])
      ? (contrastColors.value as any)[0]
      : (contrastColors.value as any)[1];
  }

  const themeCSS = computed(() => {
    let content = '';

    for (const key in colors.value) {
      const colorText = renderColor(colors.value[key], colorMode.value);

      content += `--color-${key}: ${colorText};\n`;
    }

    content += '\n';

    if (contrastColors.value.length === 2) {
      for (const key in colors.value) {
        if (['background', 'border'].includes(key)) continue;

        const colorText = renderColor(colors.value[key], colorMode.value);

        if (!colorText) continue;

        content += `--color-${key}-contrast: ${getContrastColor(colorText)};\n`;
      }
    }
    return content;
  });

  const rootStyle = computed(() => {
    return `${themeCSS.value}`;
  });

  watch(
    () => [rootStyle.value],
    () => {
      document.documentElement.setAttribute('style', rootStyle.value);
    },
  );

  return {
    colors,
    colorMode,

    themeCSS,

    getContrastColor,
  };
});
