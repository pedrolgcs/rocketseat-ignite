'use client'

import { ArrowRightIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetProjectsQuery } from '@/http/hooks/use-get-projects'
import dayjs from '@/lib/day-js'

type ProjectsTableProps = {
  organization: string
}

export function ProjectsCards({ organization }: ProjectsTableProps) {
  const {
    data: projects,
    isLoading: isLoadingOnGetProjects,
    isError: isErrorOnGetProjects,
    error: errorOnGetProjects,
  } = useGetProjectsQuery({
    organizationSlug: organization,
  })

  if (isLoadingOnGetProjects) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse bg-zinc-900">
            <CardHeader>
              <CardTitle className="h-8 rounded-md bg-zinc-800" />
              <CardDescription className="h-16 rounded-md bg-zinc-800" />
            </CardHeader>

            <CardFooter>
              <div className="h-5 w-full rounded-md bg-zinc-800" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (isErrorOnGetProjects) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error on get projects</AlertTitle>
        <AlertDescription>{errorOnGetProjects.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {projects?.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="line-clamp-2 leading-relaxed">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-3">
              <Avatar className="size-4">
                <AvatarFallback />
                {project.avatarUrl && <AvatarImage src={project.avatarUrl} />}
              </Avatar>

              <span className="text-xs text-muted-foreground">
                Created by{' '}
                <span className="font-medium text-foreground">
                  {project.owner.name}
                </span>{' '}
                {dayjs().to(project.createdAt)}
              </span>
            </div>

            <Button size="xs" variant="outline">
              View <ArrowRightIcon className="ml-2 size-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
