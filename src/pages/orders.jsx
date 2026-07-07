import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://6a2fc982a7f8866418d5125a.mockapi.io/orders"
      );
      if (response.status === 200) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="pt-4 text-danger">Панель администратора</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="">
          <h3 className="">Заказы</h3>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p><i class="fa-solid fa-user m-1 text-danger"></i>{order.customerName}</p>
              <p><i class="fa-solid fa-phone text-danger m-1"></i> {order.customerPhone}</p>
              <p><i class="fa-solid fa-location-arrow m-1 text-danger"></i> {order.address}</p>
              <p></p>
              {/* <p>Total Amount: {order.totalAmount}</p> */}
              {/* <p>Status: {order.status}</p>
                            <p>Note: {order.note}</p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
