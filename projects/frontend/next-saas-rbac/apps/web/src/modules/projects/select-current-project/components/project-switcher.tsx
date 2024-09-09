'use client'

import {
  AlertTriangleIcon,
  ChevronsUpDownIcon,
  PlusCircleIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useAbility } from '@/hooks/use-ability'
import { useGetProjectsQuery } from '@/http/hooks/use-get-projects'

export function ProjectSwitcherSkeleton() {
  return (
    <>
      <Skeleton className="size-5 rounded-full" />
      <Skeleton className="h-5 w-36" />
    </>
  )
}

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { ability } = useAbility()

  const { data, error } = useGetProjectsQuery({
    organizationSlug: orgSlug,
  })

  const selectedProject = data?.projects.find(
    (project) => project.slug === projectSlug,
  )

  const canCreateProjects = ability?.can('create', 'Project')

  if (error) {
    return (
      <div className="flex items-center">
        <AlertTriangleIcon className="size-4 text-rose-400 dark:text-rose-300" />
        <p className="ml-2 text-sm font-medium text-rose-400 dark:text-rose-300">
          Failed on fetching organizations
        </p>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {selectedProject ? (
          <>
            <Avatar className="size-4">
              {selectedProject.avatarUrl && (
                <AvatarImage src={selectedProject.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">{selectedProject.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Select projects</span>
        )}

        <ChevronsUpDownIcon className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="max-w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data?.projects.map((project) => (
            <DropdownMenuItem key={project.id} asChild>
              <Link href={`/org/${orgSlug}/project/${project.slug}`}>
                <Avatar className="mr-2 size-4">
                  {project.avatarUrl && <AvatarImage src={project.avatarUrl} />}
                  <AvatarFallback />
                </Avatar>
                <span className="line-clamp-1">{project.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          {canCreateProjects ? (
            <Link href={`/org/${orgSlug}/create-project`}>
              <PlusCircleIcon className="mr-2 size-4" />
              Create new
            </Link>
          ) : (
            <p className="text-xs font-medium text-muted-foreground">
              You don't have permission to create projects
            </p>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
