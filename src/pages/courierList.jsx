import { useEffect, useState } from "react";
import axios from "axios";

const CourierList = () => {
  const [couriers, setCouriers] = useState([]);

  const fetchCouriers = async () => {
    try {
      const response = await fetch(
        "https://695ff14b7f037703a81543ad.mockapi.io/courier"
      );

      if (response.status === 200) {
        const data = await response.json();
        setCouriers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCouriers();
  }, []);

  // Удаление заказа
  const deleteCourier = async (id) => {
    try {
      const response = await axios.delete(
        `https://695ff14b7f037703a81543ad.mockapi.io/courier/${id}`
      );

      if (response.status === 200) {
        fetchCouriers();
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
        `https://695ff14b7f037703a81543ad.mockapi.io/courier/${id}`,
        {
          status,
        }
      );

      if (response.status === 200) {
        fetchCouriers();
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
      <h2 className="text-center text-danger pt-3 fw-bold mb-4">
        <i className="fa-solid fa-user-shield me-2"></i>
        Панель курьера
      </h2>

      {couriers.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="fa-solid fa-box-open me-2"></i>
          Заказы не найдены
        </div>
      ) : (
        <>
          <div className="text-end">
            <a href="/courierList">
              <button className="btn btn-warning">CourierList</button>
            </a>
          </div>

          <h4 className="mb-4">
            <i className="fa-solid fa-cart-shopping text-danger  me-2"></i>
            Заказы ({couriers.length})
          </h4>

          <div className="row g-4">
            {couriers.map((courier) => (
              <div className="col-lg-6 col-xl-4" key={courier.id}>
                <div className="card shadow border-0 h-100 rounded-4">
                  <div className="card-header bg-success text-white d-flex justify-content-between align-items-center rounded-top-4">
                    <span>
                      <i className="fa-solid fa-receipt  me-2"></i>
                      Заказ #{courier.id}
                    </span>

                    <span
                      className={`badge ${
                        getStatusBadge(courier.status).className
                      }`}
                    >
                      {getStatusBadge(courier.status).text}
                    </span>
                  </div>

                  <div className="card-body">
                    <p className="mb-3">
                      <i className="fa-solid fa-user text-danger me-2"></i>
                      <strong>Курьер:</strong> {courier.name}
                    </p>

                    <p className="mb-3">
                      <i className="fa-solid fa-phone text-danger me-2"></i>
                      <strong>Телефон:</strong> {courier.phone}
                    </p>

                    <p className="mb-3">
                    <i class="fa-solid fa-star text-danger pe-4"></i>
                      <strong>Рейтинг:</strong> {courier.rating}
                    </p>

                    <p className="mb-3">
                    <i class="fa-solid fa-envelope text-danger pe-4 "></i>
                      <strong>Email:</strong> {courier.email}
                    </p>

                    {/* {courier.totalAmount && (
                      <p className="mb-0 fs-5 fw-bold text-success">
                        <i className="fa-solid fa-money-bill-wave me-2"></i>
                        {courier.totalAmount} сом
                      </p>
                    )} */}
                  </div>

                  <div className="card-footer bg-white border-0">
                    <div className="d-flex justify-content-between mb-3">
                      <a href={`/editOrder/${courier.id}`}>
                        <button className="btn btn-warning">Edit</button>
                      </a>

                      <select
                        className="form-select w-50"
                        value={courier.status || "new"}
                        onChange={(e) => updateStatus(courier.id, e.target.value)}
                      >
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="btn btn-success w-100 "
                      onClick={() => deleteCourier(courier.id)}
                     >
                      Delete
                    </button>

                    <a href={`/orders/${courier.id}`} className="">
                      <button className="btn btn-danger  form-control mt-2 mb-2">
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

export default CourierList;

