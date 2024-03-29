import * as Collapsible from '@radix-ui/react-collapsible'
import { FiChevronDown } from 'react-icons/fi'
import { useStore } from '@/store'
import { Lesson } from './Lesson/Lesson'

type ModuleProps = {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { currentModuleIndex, currentLessonIndex, course, play } = useStore(
    (store) => {
      return {
        currentModuleIndex: store.currentModuleIndex,
        currentLessonIndex: store.currentLessonIndex,
        course: store.course,
        play: store.play,
      }
    },
  )

  const lessons = course?.modules[moduleIndex].lessons

  const handlePlayLesson = (moduleIndex: number, lessonIndex: number) => {
    play([moduleIndex, lessonIndex])
  }

  return (
    <Collapsible.Root
      className="group overflow-hidden"
      defaultOpen={moduleIndex === currentModuleIndex}
    >
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong>{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <FiChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>

      <Collapsible.Content className="group-data-[state=closed]:animate-slideUp group-data-[state=open]:animate-slideDown">
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent =
                moduleIndex === currentModuleIndex &&
                lessonIndex === currentLessonIndex

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isCurrent={isCurrent}
                  onPlay={() => handlePlayLesson(moduleIndex, lessonIndex)}
                />
              )
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export { Module }
