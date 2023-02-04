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

export const IntervalForm = styled('form', {
  marginTop: '$6',
})

export const IntervalBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const IntervalContainer = styled('div', {
  border: '1px solid $gray600',
  borderRadius: '$md',
})

export const IntervalItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },
})

export const IntervalDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const IntervalInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(30%)',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
