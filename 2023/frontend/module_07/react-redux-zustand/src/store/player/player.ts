import { create } from 'zustand'
import { api } from '@/lib/axios'

type Lesson = {
  id: string
  title: string
  duration: string
}

type Course = {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<Lesson>
  }>
}

type State = {
  course: Course | null
  currentLessonIndex: number
  currentModuleIndex: number
  isLoading: boolean
}

type Actions = {
  load: () => Promise<void>
  play: (data: [number, number]) => void
  next: () => void
  reset: () => void
}

const initialState: State = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: false,
}

const usePlayer = create<State & Actions>((set, get) => {
  return {
    ...initialState,

    load: async () => {
      set({
        isLoading: true,
      })

      const response = await api.get<Course>('/courses/1')

      set({
        course: response.data,
        isLoading: false,
      })
    },

    play: (data: [number, number]) => {
      const [moduleIndex, lessonIndex] = data

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      })
    },

    next: () => {
      const { currentModuleIndex, currentLessonIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1

      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        })
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          })
        }
      }
    },

    reset: () => {
      set(initialState)
    },
  }
})

export { usePlayer }
