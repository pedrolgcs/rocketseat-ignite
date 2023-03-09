import { Box, Text } from '@pedrolgcs-ignite-ui/react'
import Skeleton from 'react-loading-skeleton'
import { styled } from '@/styles/stitches'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  width: 280,
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'scroll',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  '> span': {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media(max-width: 900px)': {
    gridTemplateColumns: '2fr',
  },
})

export const TimePickerItem = styled('button', {
  border: 0,
  backgroundColor: '$gray600',
  padding: '$2 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },
})

export const TimePickerListSkeleton = styled('div', {
  marginTop: '$3',
})

export const TimePickerItemSkeleton = styled(Skeleton, {
  padding: '0.6875rem 0',
  marginBottom: '0.5rem',
  opacity: 0.1,
})
