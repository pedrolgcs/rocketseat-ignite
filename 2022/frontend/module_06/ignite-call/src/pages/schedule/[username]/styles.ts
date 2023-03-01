import { styled } from '@/styles/stitches'

export const Container = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  margin: '$20 auto $4',
})

export const UserHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> h2`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },

  [`> p`]: {
    color: '$gray200',
  },
})
