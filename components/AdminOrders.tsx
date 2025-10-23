import React from 'react';

const AdminOrders = ({ bookstore }) => {
  const { orders, updateOrderStatus } = bookstore;

  const handleStatusChange = (orderId, e) => {
    updateOrderStatus(orderId, e.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-serif mb-4">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Order ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-stone-50">
                <td className="p-2 text-sm text-stone-600" title={order.id}>{order.id.substring(0, 15)}...</td>
                <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-2">{order.customer.name}</td>
                <td className="p-2 font-medium">${order.total.toFixed(2)}</td>
                <td className="p-2">
                   <select value={order.status} onChange={(e) => handleStatusChange(order.id, e)} className="p-1 border rounded-md">
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
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
