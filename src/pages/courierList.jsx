import { useEffect, useState } from "react";

function CourierList() {
  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    fetch("https://695ff14b7f037703a81543ad.mockapi.io/courier")
      .then((res) => res.json())
      .then((data) => {
        setCouriers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container py-5">

      {/* Заголовок */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">Курьеры</h1>
          <p className="text-muted mb-0">
            Список всех курьеров
          </p>
        </div>

        <span className="badge bg-primary fs-6 px-3 py-2">
          Всего: {couriers.length}
        </span>
      </div>

      {/* Список курьеров */}
      <div className="row g-4">

        {couriers.map((courier) => (
          <div className="col-12 col-md-6 col-lg-4" key={courier.id}>

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                {/* Верхняя часть */}
                <div className="d-flex align-items-center mb-3">

                  <div
                    className="bg-primary text-white rounded-circle
                    d-flex align-items-center justify-content-center
                    fw-bold fs-4"
                    style={{
                      width: "55px",
                      height: "55px",
                    }}
                  >
                    {courier.name
                      ? courier.name.charAt(0).toUpperCase()
                      : "?"}
                  </div>

                  <div className="ms-3">
                    <h5 className="fw-bold mb-1">
                      {courier.name || "Без имени"}
                    </h5>

                    <small className="text-muted">
                      ID: #{courier.id}
                    </small>
                  </div>

                </div>

                <hr />

                {/* Телефон */}
                <div className="d-flex align-items-center mb-3">
                  <span className="fs-5 me-3">📞</span>

                  <div>
                    <small className="text-muted d-block">
                      Телефон
                    </small>

                    <span>
                      {courier.phone || "Не указан"}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="d-flex align-items-center mb-3">
                  <span className="fs-5 me-3">✉️</span>

                  <div>
                    <small className="text-muted d-block">
                      Email
                    </small>

                    <span>
                      {courier.email || "Не указан"}
                    </span>
                  </div>
                </div>

                {/* Статус */}
                <div className="d-flex justify-content-between align-items-center">

                  <span className="text-muted">
                    Статус
                  </span>

                  {courier.status === "available" && (
                    <span className="badge bg-success">
                      🟢 Доступен
                    </span>
                  )}

                  {courier.status === "busy" && (
                    <span className="badge bg-warning text-dark">
                      🟡 Занят
                    </span>
                  )}

                  {courier.status === "offline" && (
                    <span className="badge bg-secondary">
                      ⚫ Не в сети
                    </span>
                  )}

                  {!["available", "busy", "offline"].includes(
                    courier.status
                  ) && (
                    <span className="badge bg-secondary">
                      {courier.status || "Не указан"}
                    </span>
                  )}

                </div>

              </div>

              {/* Footer карточки */}
              <div className="card-footer bg-white border-0 px-4 pb-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <small className="text-muted d-block">
                      Рейтинг
                    </small>

                    <strong>
                      ⭐ {courier.rating || "0.0"}
                    </strong>
                  </div>

                  <button className="btn btn-outline-primary btn-sm">
                    Подробнее
                  </button>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Если курьеров нет */}
      {couriers.length === 0 && (
        <div className="text-center py-5">

          <div className="display-4 mb-3">
            👤
          </div>

          <h4>Курьеров пока нет</h4>

          <p className="text-muted">
            Добавьте курьера в MockAPI
          </p>

        </div>
      )}

    </div>
  );
}

export default CourierList;

