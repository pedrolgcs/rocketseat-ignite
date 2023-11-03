'use client'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { Size } from '@/data/types/product'
import { cn } from '@/lib/tw-merge'

type ProductSizesProps = {
  sizes: Array<Size>
}

export function ProductSizes({ sizes }: ProductSizesProps) {
  return (
    <RadioGroup.Root className="flex w-full flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <div className="flex items-center" key={size.value}>
          <RadioGroup.Item
            disabled={!size.available}
            className={cn(
              'flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-700',
              'data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-600 data-[state=checked]:hover:bg-emerald-700',
              'data-[disabled]:cursor-not-allowed data-[disabled]:border-zinc-800 data-[disabled]:bg-zinc-950 data-[disabled]:text-zinc-700',
            )}
            value={size.value}
            id={size.value}
          >
            {size.value}
          </RadioGroup.Item>
        </div>
      ))}
    </RadioGroup.Root>
  )
}
