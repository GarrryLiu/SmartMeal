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
        <h2 className="card-title text-gray-900">{name}</h2>
        <span className="text-sm text-gray-600 font-body">
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
                  ? 'bg-green-light'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
              style={isChecked ? { 
                borderColor: '#9cb481'
              } : {}}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isChecked
                    ? 'border-transparent'
                    : 'border-gray-300'
                }`}
                style={isChecked ? { 
                  backgroundColor: '#9cb481'
                } : {}}>
                  {isChecked && <HiCheck className="w-4 h-4 text-white" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`card-title text-sm ${
                      isChecked 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-900'
                    }`}>
                      {item.name}
                    </h3>
                    {item.essential && (
                      <HiStar className="w-4 h-4" style={{ color: '#f4a261' }} title="Essential item" />
                    )}
                  </div>
                  <p className={`text-sm font-body ${
                    isChecked ? 'line-through text-gray-400' : 'text-gray-600'
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