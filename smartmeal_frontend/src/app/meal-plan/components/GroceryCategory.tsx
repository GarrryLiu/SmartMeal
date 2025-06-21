import { HiCheck, HiStar } from 'react-icons/hi';

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  essential?: boolean;
}

interface GroceryCategoryProps {
  name: string;
  icon: string;
  items: GroceryItem[];
  checkedItems: Set<string>;
  onItemCheck: (itemId: string) => void;
}

export default function GroceryCategory({ 
  name, 
  icon, 
  items, 
  checkedItems, 
  onItemCheck 
}: GroceryCategoryProps) {
  const checkedCount = items.filter(item => checkedItems.has(item.id)).length;

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl font-semibold text-white">{name}</h2>
        <span className="text-sm text-gray-400">
          ({checkedCount}/{items.length})
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => {
          const isChecked = checkedItems.has(item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => onItemCheck(item.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                isChecked
                  ? 'border-green-400 bg-green-900/20'
                  : 'border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isChecked
                    ? 'border-green-400 bg-green-400'
                    : 'border-zinc-600'
                }`}>
                  {isChecked && <HiCheck className="w-4 h-4 text-black" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-semibold ${
                      isChecked 
                        ? 'line-through text-gray-400' 
                        : 'text-white'
                    }`}>
                      {item.name}
                    </h3>
                    {item.essential && (
                      <HiStar className="w-4 h-4 text-yellow-400" title="Essential item" />
                    )}
                  </div>
                  <p className={`text-sm ${
                    isChecked ? 'line-through text-gray-500' : 'text-gray-300'
                  }`}>
                    {item.quantity}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
} 