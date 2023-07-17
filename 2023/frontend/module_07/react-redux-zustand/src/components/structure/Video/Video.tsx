import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { useCurrentLesson } from '@/hooks/useCurrentLesson'
import { actions } from '@/store/player'

function Video() {
  const { currentLesson } = useCurrentLesson()

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
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        onEnded={handlePlayNext}
      />
    </div>
  )
}

export { Video }
