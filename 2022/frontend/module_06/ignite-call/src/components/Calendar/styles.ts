import { Text } from '@pedrolgcs-ignite-ui/react'
import { styled } from '@/styles/stitches'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
})

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const Title = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',

  '> span': {
    color: '$gray200',
  },
})

export const Actions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  '> button': {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },

    svg: {
      with: '$5',
      height: '$5',
    },
  },
})

export const Body = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize: '$sm',
  },

  'tbody:before': {
    content: '.',
    lineHeight: '0.75rem',
    display: 'block',
    color: '$gray800',
  },

  'tbody th': {
    boxSizing: 'border-box',
  },
})

export const Day = styled('button', {
  all: 'unset',
  width: '100%',
  aspectRatio: '1/1',
  background: '$gray600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
