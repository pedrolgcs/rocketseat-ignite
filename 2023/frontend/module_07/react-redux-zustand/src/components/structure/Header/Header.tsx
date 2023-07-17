import { useAppSelector } from '@/store'

function Header() {
  const { module, lesson } = useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    const module = state.player.course.modules[currentModuleIndex]
    const lesson = module.lessons[currentLessonIndex]

    return {
      module,
      lesson,
    }
  })

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <span className="text-sm text-zinc-400">Módulo - {module.title}</span>
    </div>
  )
}

export { Header }
