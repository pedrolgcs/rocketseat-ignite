import { Slash } from 'lucide-react'
import Image from 'next/image'
import { Suspense } from 'react'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import { ProfileButton } from '@/features/authenticate'
import {
  OrganizationSwitcher,
  OrganizationSwitcherSkeleton,
} from '@/features/select-project'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          height={24}
          width={24}
          src={rocketseatIcon}
          className="size-6 dark:invert"
          alt=""
        />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <Suspense fallback={<OrganizationSwitcherSkeleton />}>
          <OrganizationSwitcher />
        </Suspense>
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
