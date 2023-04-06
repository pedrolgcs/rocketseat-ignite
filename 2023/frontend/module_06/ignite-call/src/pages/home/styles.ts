import { styled } from '@/styles/stitches'

export const Container = styled('div', {
  height: '100vh',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$20',

  '@media(max-width: 600px)': {
    flexDirection: 'column',
    padding: '0 $10',
    gap: '$10',
  },
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  '> h1': {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  '> p': {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    paddingRight: '0',

    img: {
      width: '100%',
      height: '100%',
    },
  },
})
