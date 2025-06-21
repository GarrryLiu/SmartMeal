interface ProgressBarProps {
  checkedCount: number;
  totalCount: number;
}

export default function ProgressBar({ checkedCount, totalCount }: ProgressBarProps) {
  const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Shopping Progress</span>
        <span className="text-sm text-gray-400">
          {percentage}% Complete
        </span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-2">
        <div
          className="bg-green-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
} 