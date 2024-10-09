import { Slash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import { PendingInvitesPopover } from '@/modules/organization/pending-invites'
import { SelectProject } from '@/modules/organization/select-current-project'
import { ThemeSwitcher } from '@/modules/styles/theme'
import { ProfileButton } from '@/modules/users/authenticate'

import { Separator } from './ui/separator'

export async function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image
            height={24}
            width={24}
            src={rocketseatIcon}
            className="size-6 dark:invert"
            alt=""
          />
        </Link>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <SelectProject />
      </div>

      <div className="flex items-center gap-4">
        <PendingInvitesPopover />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
