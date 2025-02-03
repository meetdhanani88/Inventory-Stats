import React from 'react';
import { ShoppingCart, DollarSign, Package, Battery as Category } from 'lucide-react';

const icons = {
  products: ShoppingCart,
  value: DollarSign,
  outOfStock: Package,
  categories: Category,
};

export const StatsCard = ({ title, value, type }) => {
  const Icon = icons[type];

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center gap-4">
        <Icon className="w-8 h-8 text-green-400" />
        <div>
          <h3 className="text-gray-400 text-sm">{title}</h3>
          <p className="text-white text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};