import { Box, Text } from '@pedrolgcs-ignite-ui/react'
import { styled } from '@/styles/stitches'

export const NotAuthenticatedBox = styled(Box, {
  margin: '$6 auto 0',
  maxWidth: 540,
  padding: '$8',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$6',
})

export const NotAuthenticatedError = styled(Text, {
  color: '$gray200',
})

export const FormBox = styled(Box, {
  margin: '$6 auto 0',
  maxWidth: 540,
})

export const ConfirmForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',

  '> p': {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray200',
      width: '$5',
      height: '$5',
    },
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})

export const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
  marginTop: '$2',
})
