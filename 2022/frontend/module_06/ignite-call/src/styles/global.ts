import { globalCss } from './stitches'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    fontFamily: '$default',
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  button: {
    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  },
})
