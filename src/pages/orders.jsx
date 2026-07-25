import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="container py-4">
      <h2 className="text-center text-danger fw-bold mb-4">
        <i className="fa-solid fa-user-shield me-2"></i>
        Панель администратора
      </h2>
  
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="fa-solid fa-box-open me-2"></i>
          Заказы не найдены
        </div>
      ) : (
        <>
          <h4 className="mb-4">
            <i className="fa-solid fa-cart-shopping text-danger me-2"></i>
            Заказы ({orders.length})
          </h4>
  
          <div className="row g-4">
            {orders.map((order) => (
              <div className="col-lg-6 col-xl-4" key={order.id}>
                <div className="card shadow border-0 h-100 rounded-4">
                  <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center rounded-top-4">
                    <span>
                      <i className="fa-solid fa-receipt me-2"></i>
                      Заказ #{order.id}
                    </span>
  
                    <span className="badge bg-light text-danger">
                      Новый
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
  
                    {/* {order.note && (
                      <p className="mb-3">
                        <i className="fa-solid fa-note-sticky text-danger me-2"></i>
                        <strong>Комментарий:</strong> {order.note}
                      </p>
                    )} */}
  
                    {order.totalAmount && (
                      <p className="mb-0 fs-5 fw-bold text-success">
                        <i className="fa-solid fa-money-bill-wave me-2"></i>
                        {order.totalAmount} сом
                      </p>
                    )}
                  </div>
  
                
                  <div className="card-footer bg-white border-0 d-flex justify-content-between">
                    {/* <button className="btn btn-success col-5 btn-sm">
                      Edit
                    </button> */}
                     {/* <button className="btn btn-success col-5 text-light">
                          <a href={`/editOrder/${order.id}`} className=" ">
                            Edit
                          </a>
                        </button> */}

                        <a href={`/editOrder/${order.id}`}>
                          <button className="btn btn-success ps-5 pe-5">Edit</button>
                        </a>
  
                    <button className="btn btn-success btn-sm">
                      <i className="fa-solid fa-check me-1"></i>
                      Выполнен
                    </button>
                  </div>
                  <button className="btn btn-dark col-11 ms-3 mt-2 mb-3" onClick={() => deleteOrder(order.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
