import { Box, Text } from '@pedrolgcs-ignite-ui/react'
import { styled } from '@/styles/stitches'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('div', {
  '> strong': {
    lineHeight: '$base',
  },

  '> p': {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const Ul = styled('ul', {})

export const Li = styled('li', {
  all: 'unset',
  display: 'block',
  marginBottom: '$4',
  paddingTop: '$3',
  '& + &': {
    borderTop: '1px solid $gray700',
  },
})

export const Schedule = styled(Box, {
  marginTop: '$3',
  opacity: '0.7',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '$3',
})

export const ScheduleDescription = styled('div', {
  maxWidth: '75%',

  '> p': {
    color: '$gray100',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
})

export const ScheduleTime = styled(Text, {
  color: '$gray200',
})
