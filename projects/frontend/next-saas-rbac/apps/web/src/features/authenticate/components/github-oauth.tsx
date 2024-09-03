import Image from 'next/image'

import githubIcon from '@/assets/github.svg'
import { Button } from '@/components/ui/button'

import { signInWithGithubAction } from '../actions/sign-in-with-github'

type GithubButtonProps = {
  label: string
}

export function GithubOauth({ label }: GithubButtonProps) {
  return (
    <form action={signInWithGithubAction}>
      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
        {label}
      </Button>
    </form>
  )
}
