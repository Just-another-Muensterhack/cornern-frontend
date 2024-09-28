import {defineConfig} from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwind from '@twind/preset-tailwind'
import presetTailwindForms from '@twind/preset-tailwind-forms'
import presetTypography from '@twind/preset-typography'

export const primary = "#F89D15"
export const danger = "#FF5757"
export const background = "#111111"

export const positive = "#32dc32"
export const neutral = "#f0f01e"
export const negative = "#dc1414"

/**
 * The tailwind configuration used by the application
 */
const twindConfig = defineConfig({
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary,
        danger,
        background,
        positive,
        neutral,
        negative
      },
      textDecorationThickness: {
        3: '3px',
        5: '5px',
        6: '6px',
        7: '7px'
      },
      textUnderlineOffset: {
        3: '3px',
        5: '5px',
        6: '6px',
        7: '7px'
      },
      boxShadow: {
        'around': '0 2px 2px 0 rgba(0, 0, 0, 0.02), 0 -2px 2px 0 rgba(0, 0, 0, 0.02), 2px 0 2px 0 rgba(0, 0, 0, 0.02), -2px 0 2px 0 rgba(0, 0, 0, 0.02)',
        'around-md': '0 5px 5px 0 rgba(0, 0, 0, 0.02), 0 -5px 5px 0 rgba(0, 0, 0, 0.02), 5px 0 5px 0 rgba(0, 0, 0, 0.02), -5px 0 5px 0 rgba(0, 0, 0, 0.02)',
        'around-lg': '0 10px 10px 0 rgba(0, 0, 0, 0.02), 0 -10px 10px 0 rgba(0, 0, 0, 0.02), 10px 0 10px 0 rgba(0, 0, 0, 0.02), -10px 0 10px 0 rgba(0, 0, 0, 0.02)',
        'around-xl': '0 20px 20px 0 rgba(0, 0, 0, 0.02), 0 -20px 20px 0 rgba(0, 0, 0, 0.02), 20px 0 20px 0 rgba(0, 0, 0, 0.02), -20px 0 20px 0 rgba(0, 0, 0, 0.02)',
      }
    },
    screens: {
      mobileSmall: {
        max: '480px',
      },
      mobileBig: {
        min: '480px',
        max: '768px'
      },
      mobile: {max: '768px'},
      tablet: {min: '768px', max: '1024px'},
      desktop: {min: '1024px'},
    },
  },
  ignorelist: ['no-spin', /^lucide/, /^leaflet/],
  presets: [presetAutoprefix(), presetTailwind(), presetTailwindForms(), presetTypography()]
})

export default twindConfig
