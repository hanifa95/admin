import { useState } from "react";
import axios from "axios";
import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const API_URL =
  "https://6953a084a319a928023c1129.mockapi.io/pickupPoints";

const BISHKEK = [42.8746, 74.5698];

// Настройка маркера Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Обработка клика по карте
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

export default function PickupPoint() {
  const [pickupPoint, setPickupPoint] = useState({
    name: "",
    address: "",
    phone: "",
    schedule: "Пн–Сб: 09:00–20:00",
    status: "Открыт",
  });

  const [markerPosition, setMarkerPosition] = useState(BISHKEK);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setPickupPoint((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleMapClick(position) {
    setMarkerPosition(position);
    setMessage("");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !pickupPoint.name.trim() ||
      !pickupPoint.address.trim() ||
      !pickupPoint.phone.trim()
    ) {
      setError("Заполните название, адрес и телефон.");
      return;
    }

    const data = {
        name: pickupPoint.name.trim(),
        address: pickupPoint.address.trim(),
        phone: pickupPoint.phone.trim(),
        schedule: pickupPoint.schedule.trim(),
        status: pickupPoint.status,
        lat: String(markerPosition[0]),
        long: String(markerPosition[1]),
    };

    try {
      setSaving(true);

      const response = await axios.post(API_URL, data);

      setMessage(
        `Пункт выдачи успешно добавлен! ID: ${response.data.id}`
      );

      setPickupPoint({
        name: "",
        address: "",
        phone: "",
        schedule: "Пн–Сб: 09:00–20:00",
        status: "Открыт",
      });

      setMarkerPosition(BISHKEK);
    } catch (err) {
      console.error("Ошибка сохранения:", err);

      setError(
        err.response
          ? `Ошибка сервера: ${err.response.status}`
          : "Не удалось подключиться к MockAPI. Проверьте интернет и URL."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          📦 Пункты выдачи
        </h2>
        <p className="text-muted">
          Добавление пункта выдачи и выбор местоположения
        </p>
      </div>

      {message && (
        <div className="alert alert-success">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          ⚠ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Форма пункта выдачи */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">
                  🏪 Информация о пункте
                </h5>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Название *
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    value={pickupPoint.name}
                    onChange={handleChange}
                    placeholder="Пункт выдачи №1"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    📍 Адрес *
                  </label>
                  <input
                    className="form-control"
                    name="address"
                    value={pickupPoint.address}
                    onChange={handleChange}
                    placeholder="г. Бишкек, ул. Манаса, 25"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    ☎ Телефон *
                  </label>
                  <input
                    className="form-control"
                    name="phone"
                    value={pickupPoint.phone}
                    onChange={handleChange}
                    placeholder="+996 555 123 456"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    🕒 График работы
                  </label>
                  <input
                    className="form-control"
                    name="schedule"
                    value={pickupPoint.schedule}
                    onChange={handleChange}
                    placeholder="Пн–Сб: 09:00–20:00"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Статус
                  </label>
                  <select
                    className="form-select"
                    name="status"
                    value={pickupPoint.status}
                    onChange={handleChange}
                  >
                    <option value="Открыт">
                      🟢 Открыт
                    </option>
                    <option value="Закрыт">
                      🔴 Закрыт
                    </option>
                    <option value="Временно закрыт">
                      🟡 Временно закрыт
                    </option>
                  </select>
                </div>

                <div className="bg-light border rounded p-3 mb-3">
                  <div className="text-muted small mb-2">
                    🌐 Координаты выбранной точки
                  </div>

                  <div>
                    Широта: {markerPosition[0].toFixed(6)}
                  </div>

                  <div>
                    Долгота: {markerPosition[1].toFixed(6)}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={saving}
                >
                  {saving
                    ? "Сохранение..."
                    : "＋ Добавить пункт выдачи"}
                </button>
              </div>
            </div>
          </div>

          {/* Карта */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-3 p-md-4">
                <h5 className="fw-bold mb-2">
                  🗺 Местоположение
                </h5>

                <p className="text-muted small">
                  Нажмите на карту, чтобы установить маркер
                  в нужном месте.
                </p>

                <div
                  style={{
                    height: 520,
                    width: "100%",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <MapContainer
                    center={BISHKEK}
                    zoom={13}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <MapClickHandler
                      onMapClick={handleMapClick}
                    />

                    <Marker position={markerPosition}>
                      <Popup>
                        <strong>
                          {pickupPoint.name ||
                            "Новый пункт выдачи"}
                        </strong>

                        <br />

                        {pickupPoint.address ||
                          "Адрес не указан"}

                        <br />

                        {pickupPoint.phone}

                        <br />

                        <small>
                          {markerPosition[0].toFixed(6)},{" "}
                          {markerPosition[1].toFixed(6)}
                        </small>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className="alert alert-info mt-3 mb-0">
                  💡 Выберите место на карте, заполните форму
                  и нажмите «Добавить пункт выдачи».
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

