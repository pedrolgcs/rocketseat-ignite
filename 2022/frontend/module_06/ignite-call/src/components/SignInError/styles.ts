import Link from 'next/link'
import { Text } from '@pedrolgcs-ignite-ui/react'
import { styled } from '@/styles/stitches'

export const Container = styled(Text, {
  color: '#f75a88',
  opacity: 0.8,
})

export const RedirectLink = styled(Link, {
  color: '$gray200',
  marginLeft: '0.25rem',
})
