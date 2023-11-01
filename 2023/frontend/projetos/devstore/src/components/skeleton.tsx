import * as React from 'react'
import { cn } from '@/lib/tw-merge'

type SkeletonProps = React.ComponentProps<'div'>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-zinc-50/10', className)}
      {...props}
    />
  )
}
