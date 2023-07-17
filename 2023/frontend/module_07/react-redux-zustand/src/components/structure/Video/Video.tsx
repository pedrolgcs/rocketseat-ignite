import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import { actions } from '@/store/player'

function Video() {
  const lesson = useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    const currentLesson =
      state.player.course.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ]

    return currentLesson
  })

  const dispatch = useDispatch()

  const handlePlayNext = () => {
    dispatch(actions.next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url={`https://www.youtube.com/watch?v=${lesson.id}`}
        onEnded={handlePlayNext}
      />
    </div>
  )
}

export { Video }
