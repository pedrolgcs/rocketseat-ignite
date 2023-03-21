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

export const ScheduleList = styled('ul', {
  all: 'unset',
})

export const ScheduleItem = styled('li', {
  all: 'unset',
  display: 'block',
  paddingBottom: '1rem',
  borderBottom: '1px solid red',
})
