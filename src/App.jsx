import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import {
  fetchInventory,
  toggleUserMode,
  deleteProduct,
  updateProduct,
  toggleProductStatus,
} from "./store/inventorySlice";
import { StatsCard } from "./components/StatsCard";
import { EditProductModal } from "./components/EditProductModal";

function App() {
  const dispatch = useDispatch();
  const { products, isAdmin, loading } = useSelector(
    (state) => state.inventory
  );
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce(
      (sum, product) =>
        sum + parseFloat(product.value.replace("$", "").replace(",", "")),
      0
    ),
    outOfStock: products.filter((p) => p.quantity === 0).length,
    categories: new Set(products.map((p) => p.category)).size,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Inventory Stats</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              {isAdmin ? "Admin" : "User"} Mode
            </span>
            <button
              onClick={() => dispatch(toggleUserMode())}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAdmin ? "bg-green-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAdmin ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            type="products"
          />
          <StatsCard
            title="Total Store Value"
            value={`$${stats.totalValue.toLocaleString()}`}
            type="value"
          />
          <StatsCard
            title="Out of Stock"
            value={stats.outOfStock}
            type="outOfStock"
          />
          <StatsCard
            title="Categories"
            value={stats.categories}
            type="categories"
          />
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products.map((product) => (
                  <tr
                    key={product.name}
                    className={`${
                      product.disabled ? "opacity-50 bg-gray-700" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {product.value}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      <div className="flex gap-4">
                        {isAdmin && !product.disabled && (
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        {isAdmin && (
                          <>
                            <button
                              onClick={() =>
                                dispatch(toggleProductStatus(product.name))
                              }
                              className="text-yellow-400 hover:text-yellow-300"
                            >
                              {product.disabled ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                dispatch(deleteProduct(product.name))
                              }
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={(product) => {
              dispatch(updateProduct(product));
              setEditingProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
