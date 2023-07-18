import { usePlayer } from '@/store'

const useCurrentLesson = () => {
  const { currentLesson, currentModule } = usePlayer((state) => {
    const { currentModuleIndex, currentLessonIndex } = state

    const currentModule = state.course?.modules[currentModuleIndex]
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
