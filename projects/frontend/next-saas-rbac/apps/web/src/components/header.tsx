import { Slash } from 'lucide-react'
import Image from 'next/image'
import { Suspense } from 'react'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import { ProfileButton } from '@/features/authenticate'
import {
  SelectProject,
  SelectProjectSkeleton,
} from '@/features/select-current-project'
import { ThemeSwitcher } from '@/features/theme'

import { Separator } from './ui/separator'

export async function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        <Image
          height={24}
          width={24}
          src={rocketseatIcon}
          className="size-6 dark:invert"
          alt=""
        />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <Suspense fallback={<SelectProjectSkeleton />}>
          <SelectProject />
        </Suspense>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
