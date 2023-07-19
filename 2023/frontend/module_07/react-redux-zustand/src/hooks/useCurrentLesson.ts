import { useStore } from '@/store'

const useCurrentLesson = () => {
  const { currentLesson, currentModule } = useStore((store) => {
    const { currentModuleIndex, currentLessonIndex } = store

    const currentModule = store.course?.modules[currentModuleIndex]
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
