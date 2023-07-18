import { FiLoader } from 'react-icons/fi'
import ReactPlayer from 'react-player'
import { useCurrentLesson } from '@/hooks/useCurrentLesson'
import { useAppDispatch, useAppSelector } from '@/store'
import { actions } from '@/store/player'

function Video() {
  const isCouseLoading = useAppSelector((state) => state.player.isLoading)

  const { currentLesson } = useCurrentLesson()

  const dispatch = useAppDispatch()

  const handlePlayNext = () => {
    dispatch(actions.next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCouseLoading ? (
        <div className="flex h-full items-center justify-center">
          <FiLoader className="w-8 h-8 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={handlePlayNext}
        />
      )}
    </div>
  )
}

export { Video }
