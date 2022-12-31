import { Heading, Text, styled } from '@ignite-ui/react'

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

  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
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
