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
        <h3 className="card-title text-gray-900 mb-4">Shopping Summary</h3>
        <div className="space-y-2 text-gray-700 font-body">
          <p>Total Items: {totalItems}</p>
          <p>Completed: {checkedCount}</p>
          <p>Remaining: {remaining}</p>
        </div>
        {isComplete && (
          <div className="mt-4 p-3 rounded-lg bg-green-light" style={{ borderColor: '#9cb481', border: '1px solid' }}>
            <p className="font-semibold font-body" style={{ color: '#7a9365' }}>🎉 Shopping complete! Ready to cook!</p>
          </div>
        )}
      </div>
    </div>
  );
} 