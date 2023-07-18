import { useAppSelector } from '@/store'

const useCurrentLesson = () => {
  const { currentLesson, currentModule } = useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return {
      currentModule,
      currentLesson,
    }
  })

  return {
    currentLesson,
    currentModule,
  }
}

export { useCurrentLesson }
