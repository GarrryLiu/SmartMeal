interface ShoppingSummaryProps {
  totalItems: number;
  checkedCount: number;
}

export default function ShoppingSummary({ totalItems, checkedCount }: ShoppingSummaryProps) {
  const isComplete = checkedCount === totalItems;
  const remaining = totalItems - checkedCount;

  return (
    <div className="mt-12 text-center">
      <div className="card max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Shopping Summary</h3>
        <div className="space-y-2 text-gray-700">
          <p>Total Items: {totalItems}</p>
          <p>Completed: {checkedCount}</p>
          <p>Remaining: {remaining}</p>
        </div>
        {isComplete && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-700 font-semibold">🎉 Shopping complete! Ready to cook!</p>
          </div>
        )}
      </div>
    </div>
  );
} 