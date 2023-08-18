import { FiVideo, FiPlay } from 'react-icons/fi'

type LessonProps = {
  title: string
  duration: string
  isCurrent: boolean
  onPlay: () => void
}

function Lesson({ title, duration, isCurrent, onPlay }: LessonProps) {
  const handlePlayLesson = () => {
    onPlay()
  }

  return (
    <button
      onClick={handlePlayLesson}
      data-active={isCurrent}
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 enabled:hover:text-zinc-300 transition data-[active=true]:text-emerald-400"
    >
      {isCurrent ? (
        <FiPlay className="w-4 h-4 text-emerald-400" />
      ) : (
        <FiVideo className="w-4 h-4 text-zinc-500" />
      )}

      <span>{title}</span>

      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  )
}

export { Lesson }
