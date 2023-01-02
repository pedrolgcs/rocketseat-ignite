import { Box, Text } from '@pedrolgcs-ignite-ui/react'
import { styled } from '@/styles/stitches'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('div', {
  padding: '0 $6',

  '> strong': {
    lineHeight: '$base',
  },

  '> p': {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const Form = styled('form', {
  marginTop: '$5',
})

export const FormContent = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
