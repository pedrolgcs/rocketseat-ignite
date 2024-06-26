import Image from 'next/image'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import { ProfileButton } from '@/features/authenticate'

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
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
