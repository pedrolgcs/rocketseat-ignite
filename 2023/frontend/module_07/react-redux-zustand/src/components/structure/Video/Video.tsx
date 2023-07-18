import { FiLoader } from 'react-icons/fi'
import ReactPlayer from 'react-player'
import { useCurrentLesson } from '@/hooks/useCurrentLesson'
import { usePlayer } from '@/store'

function Video() {
  const { isLoading, next } = usePlayer()

  const { currentLesson } = useCurrentLesson()

  const handlePlayNext = () => {
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
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
