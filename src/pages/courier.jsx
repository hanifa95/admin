import { useEffect, useState } from "react";
import axios from "axios";

const Courier = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://6a2fc982a7f8866418d5125a.mockapi.io/orders"
      );

      if (response.status === 200) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Удаление заказа
  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(
        `https://6a2fc982a7f8866418d5125a.mockapi.io/orders/${id}`
      );

      if (response.status === 200) {
        fetchOrders();
        alert("Заказ удален");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Изменение статуса
  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://6a2fc982a7f8866418d5125a.mockapi.io/orders/${id}`,
        {
          status,
        }
      );

      if (response.status === 200) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Цвет и название статуса
  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return {
          text: "🆕 Новый",
          className: "bg-danger",
        };

      case "processing":
        return {
          text: "🟡 В обработке",
          className: "bg-warning text-dark",
        };

      case "delivery":
        return {
          text: "🚚 Доставляется",
          className: "bg-primary",
        };

      case "completed":
        return {
          text: "✅ Доставлено",
          className: "bg-success",
        };

      case "cancelled":
        return {
          text: "❌ Отменён",
          className: "bg-secondary",
        };

      default:
        return {
          text: "🆕 Новый",
          className: "bg-danger",
        };
    }
  };

  const statuses = [
    {
      value: "new",
      label: "🆕 Новый",
    },
    {
      value: "processing",
      label: "🟡 В обработке",
    },
    {
      value: "delivery",
      label: "🚚 Доставляется",
    },
    {
      value: "completed",
      label: "✅ Доставлено",
    },
    {
      value: "cancelled",
      label: "❌ Отменён",
    },
  ];

  return (
    <div className="container py-4">
      <h2 className="text-center text-dark pt-3 fw-bold mb-4">
        <i className="fa-solid fa-user-shield me-2"></i>
        Список курьеров
      </h2>

      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="fa-solid fa-box-open me-2"></i>
          Заказы не найдены
        </div>
      ) : (
        <>
          <h4 className="mb-4">
            <i className="fa-solid fa-cart-shopping text-danger  me-2"></i>
            Заказы ({orders.length})
          </h4>

          <div className="row g-4">
            {orders.map((order) => (
              <div className="col-lg-6 col-xl-4" key={order.id}>
                <div className="card shadow border-0 h-100 rounded-4">
                  <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center rounded-top-4">
                    <span>
                      <i className="fa-solid fa-receipt  me-2"></i>
                      Заказ #{order.id}
                    </span>

                    <span
                      className={`badge ${
                        getStatusBadge(order.status).className
                      }`}
                    >
                      {getStatusBadge(order.status).text}
                    </span>
                  </div>

                  <div className="card-body">
                    <p className="mb-3">
                      <i className="fa-solid fa-user text-danger me-2"></i>
                      <strong>Клиент:</strong> {order.customerName}
                    </p>

                    <p className="mb-3">
                      <i className="fa-solid fa-phone text-danger me-2"></i>
                      <strong>Телефон:</strong> {order.customerPhone}
                    </p>

                    <p className="mb-3">
                      <i className="fa-solid fa-location-dot text-danger me-2"></i>
                      <strong>Адрес:</strong> {order.address}
                    </p>

                    {order.totalAmount && (
                      <p className="mb-0 fs-5 fw-bold text-success">
                        <i className="fa-solid fa-money-bill-wave me-2"></i>
                        {order.totalAmount} сом
                      </p>
                    )}
                  </div>

                  <div className="card-footer bg-white border-0">

                    <div className="d-flex justify-content-between mb-3">

                      <a href={`/editOrder/${order.id}`}>
                        <button className="btn btn-warning">
                          Edit
                        </button>
                      </a>

                      <select
                        className="form-select w-50"
                        value={order.status || "new"}
                        onChange={(e) =>
                          updateStatus(order.id, e.target.value)
                        }
                      >
                        {statuses.map((status) => (
                          <option
                            key={status.value}
                            value={status.value}
                          >
                            {status.label}
                          </option>
                        ))}
                      </select>

                    </div>

                    <button
                      className="btn btn-  w-100"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </button>
                    
                    <a href={`/orders/${order.id}`} className="">
                    <button className="btn btn-warning   form-control mt-2 mb-2">
                      View Details
                    </button>
                  </a>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Courier;