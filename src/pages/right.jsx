import { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
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

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Перемещение карты к выбранному месту
function MapMove({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, { duration: 1.2 });
    }
  }, [position, map]);

  return null;
}

// Выбор координат кликом по карте
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
  const [points, setPoints] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Поиск на карте по названию или адресу
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Загрузка пунктов из MockAPI
  async function loadPoints() {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);
      setPoints(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Ошибка загрузки пунктов:", err);
      setError("Не удалось загрузить пункты выдачи из MockAPI.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPoints();
  }, []);

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

  // Поиск географических мест по названию или адресу
  async function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      setSearchError("Введите название места или адрес.");
      setResults([]);
      setShowResults(false);
      return;
    }

    setSearching(true);
    setSearchError("");
    setResults([]);
    setShowResults(false);

    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "jsonv2",
            limit: 6,
            countrycodes: "kg",
            "accept-language": "ru",
          },
          headers: {
            "Accept-Language": "ru",
          },
        }
      );

      if (!response.data.length) {
        setSearchError(
          "Место не найдено. Попробуйте изменить запрос."
        );
        return;
      }

      setResults(response.data);
      setShowResults(true);
    } catch (err) {
      console.error("Ошибка поиска:", err);
      setSearchError(
        "Не удалось выполнить поиск. Проверьте интернет и попробуйте позже."
      );
    } finally {
      setSearching(false);
    }
  }

  // Выбор найденного места
  function selectPlace(place) {
    const lat = Number(place.lat);
    const lng = Number(place.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      setSearchError("Не удалось определить координаты места.");
      return;
    }

    setMarkerPosition([lat, lng]);

    setPickupPoint((prev) => ({
      ...prev,
      address: place.display_name || prev.address,
    }));

    setSearch(place.display_name || "");
    setResults([]);
    setShowResults(false);
    setSearchError("");
    setMessage("");
    setError("");
  }

  // Добавление пункта выдачи в MockAPI
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
        `Пункт выдачи «${response.data.name}» успешно добавлен!`
      );

      setPickupPoint({
        name: "",
        address: "",
        phone: "",
        schedule: "Пн–Сб: 09:00–20:00",
        status: "Открыт",
      });

      setMarkerPosition(BISHKEK);
      setSearch("");
      await loadPoints();
    } catch (err) {
      console.error("Ошибка сохранения:", err.response?.data || err);

      setError(
        err.response
          ? `Ошибка сервера ${err.response.status}. Проверьте поля коллекции MockAPI.`
          : "Не удалось подключиться к MockAPI."
      );
    } finally {
      setSaving(false);
    }
  }

  // Перейти к уже добавленному пункту
  function showPoint(point) {
    const lat = Number(point.lat);
    const lng = Number(point.long);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      setError(
        `У пункта «${point.name}» отсутствуют корректные координаты.`
      );
      return;
    }

    setMarkerPosition([lat, lng]);
  }

  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#f4f7fb", minHeight: "100vh" }}
    >
      <div className="mb-4">
        <h2 className="fw-bold mb-1">📦 Пункты выдачи</h2>
        <p className="text-muted mb-0">
          Добавляйте пункты и ищите места на карте по названию или адресу.
        </p>
      </div>

      {message && (
        <div className="alert alert-success">{message}</div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="row g-4">
        {/* Форма добавления */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">
                Информация о пункте
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Название *</label>
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
                  <label className="form-label">Адрес *</label>
                  <input
                    className="form-control"
                    name="address"
                    value={pickupPoint.address}
                    onChange={handleChange}
                    placeholder="Бишкек, улица Манаса, 25"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Телефон *</label>
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
                  <label className="form-label">График работы</label>
                  <input
                    className="form-control"
                    name="schedule"
                    value={pickupPoint.schedule}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Статус</label>
                  <select
                    className="form-select"
                    name="status"
                    value={pickupPoint.status}
                    onChange={handleChange}
                  >
                    <option value="Открыт">Открыт</option>
                    <option value="Закрыт">Закрыт</option>
                    <option value="Временно закрыт">
                      Временно закрыт
                    </option>
                  </select>
                </div>

                <div className="alert alert-primary small">
                  <strong>Координаты выбранной точки</strong>
                  <div>
                    Широта: {markerPosition[0].toFixed(6)}
                  </div>
                  <div>
                    Долгота: {markerPosition[1].toFixed(6)}
                  </div>
                  <hr />
                  Нажмите на карту или найдите адрес, чтобы выбрать место.
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={saving}
                >
                  {saving ? "Сохранение..." : "+ Добавить пункт выдачи"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Карта и поиск */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3 p-md-4">
              <h5 className="fw-bold mb-3">🗺 Карта и поиск мест</h5>

              <form onSubmit={handleSearch} className="mb-3">
                <div className="input-group">
                  <input
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Название места или адрес..."
                  />

                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={searching}
                  >
                    {searching ? "Поиск..." : "⌕ Найти"}
                  </button>
                </div>
              </form>

              {searchError && (
                <div className="alert alert-warning py-2">
                  {searchError}
                </div>
              )}

              {showResults && results.length > 0 && (
                <div className="list-group mb-3">
                  {results.map((place) => (
                    <button
                      key={place.place_id}
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={() => selectPlace(place)}
                    >
                      <strong className="d-block">
                        {place.name ||
                          place.display_name.split(",")[0]}
                      </strong>
                      <small className="text-muted">
                        {place.display_name}
                      </small>
                    </button>
                  ))}
                </div>
              )}

              <p className="text-muted small">
                Введите название или адрес, выберите результат, и карта
                покажет найденное место. Можно также нажать на карту.
              </p>

              <div
                style={{
                  height: 500,
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 12,
                  border: "1px solid #dee2e6",
                }}
              >
                <MapContainer
                  center={BISHKEK}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />

                  <MapMove position={markerPosition} />

                  <MapClickHandler onMapClick={handleMapClick} />

                  <Marker position={markerPosition}>
                    <Popup>
                      <strong>
                        {pickupPoint.name || "Выбранное место"}
                      </strong>
                      <br />
                      {pickupPoint.address || "Адрес не указан"}
                      <br />
                      {pickupPoint.phone}
                    </Popup>
                  </Marker>

                  {/* Все сохранённые пункты выдачи */}
                  {points.map((point) => {
                    const lat = Number(point.lat);
                    const lng = Number(point.long);

                    if (
                      !Number.isFinite(lat) ||
                      !Number.isFinite(lng)
                    ) {
                      return null;
                    }

                    return (
                      <Marker
                        key={point.id}
                        position={[lat, lng]}
                      >
                        <Popup>
                          <strong>{point.name}</strong>
                          <br />
                          {point.address}
                          <br />
                          Телефон: {point.phone}
                          <br />
                          График: {point.schedule}
                          <br />
                          Статус: {point.status}
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>

              <div className="mt-3 small text-muted">
                {loading
                  ? "Загрузка пунктов выдачи..."
                  : `Загружено пунктов из MockAPI: ${points.length}`}
              </div>
            </div>
          </div>

          {/* Список сохранённых пунктов */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body p-3 p-md-4">
              <h5 className="fw-bold mb-3">
                Существующие пункты выдачи
              </h5>

              {points.length === 0 && !loading ? (
                <p className="text-muted mb-0">
                  Пока нет добавленных пунктов.
                </p>
              ) : (
                <div className="list-group">
                  {points.map((point) => (
                    <div
                      key={point.id}
                      className="list-group-item d-flex justify-content-between align-items-center gap-3 flex-wrap"
                    >
                      <div>
                        <strong>{point.name}</strong>
                        <div className="small text-muted">
                          {point.address}
                        </div>
                        <div className="small">
                          {point.phone} · {point.status}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => showPoint(point)}
                      >
                        Показать на карте
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}