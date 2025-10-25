import React from 'react';

const AdminOrders = ({ bookstore }) => {
  const { orders, updateOrderStatus } = bookstore;

  const handleStatusChange = (orderId, e) => {
    updateOrderStatus(orderId, e.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-serif mb-4 text-rose-700">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-rose-100">
              <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Order ID</th>
              <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Date</th>
              <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Customer</th>
              <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Total</th>
              <th className="p-2 text-rose-500 uppercase text-xs tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-rose-100 hover:bg-rose-50">
                <td className="p-2 text-sm text-rose-600" title={order.id}>{order.id.substring(0, 15)}...</td>
                <td className="p-2 text-rose-700">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-2 text-rose-700">{order.customer.name}</td>
                <td className="p-2 font-medium text-rose-700">${order.total.toFixed(2)}</td>
                <td className="p-2">
                   <select value={order.status} onChange={(e) => handleStatusChange(order.id, e)} className="p-1 border border-rose-200 rounded-md text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400">
                        <option>Preparing</option>
                        <option>Ready</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                        <option>Pending</option>
                        <option>Shipped</option>
                   </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
