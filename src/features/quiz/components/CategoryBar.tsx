interface CategoryBarProps {
  emoji: string
  label: string
  percentage: number
  score: number
  maxScore: number
}

export function CategoryBar({ emoji, label, percentage, score, maxScore }: CategoryBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2">
          <span>{emoji}</span>
          <span className="text-sm font-medium">{label}</span>
        </span>
        <span className="text-sm text-white/40">{score}/{maxScore}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
