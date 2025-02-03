import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const EditProductModal = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  useEffect(() => {
    const price = parseFloat(editedProduct.price.replace('$', ''));
    const value = price * editedProduct.quantity;
    setEditedProduct(prev => ({
      ...prev,
      value: `$${value}`
    }));
  }, [editedProduct.price, editedProduct.quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-[400px]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl text-white font-semibold">Edit product</h2>
            <p className="text-gray-400 text-sm mt-1">{product.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Category</label>
              <input
                type="text"
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, category: e.target.value })
                }
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">price</label>
              <input
                type="text"
                value={editedProduct.price.replace('$', '')}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: `$${e.target.value}`,
                  })
                }
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">quantity</label>
              <input
                type="number"
                value={editedProduct.quantity}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">value</label>
              <input
                type="text"
                value={editedProduct.value}
                disabled
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 opacity-50 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-yellow-400 hover:text-yellow-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};