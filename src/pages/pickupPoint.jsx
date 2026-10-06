import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Фикс иконки маркера Leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Координаты Бишкека по умолчанию
const BISHKEK = [42.8746, 74.5698];

// Компонент для выбора точки на карте
function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });

    return null;
}

const PickupPoint = () => {
    const [markerLat, setMarkerLat] = useState(BISHKEK[0]);
    const [markerLng, setMarkerLng] = useState(BISHKEK[1]);

    const [pickupPoint, setPickupPoint] = useState({
        name: "Пункт выдачи №1",
        address: "г. Бишкек, ул. Манаса, 25",
        phone: "+996 555 123 456",
        schedule: "Пн–Сб: 09:00–20:00",
        status: "Открыт",
    });

    const handleMapClick = (latlng) => {
        setMarkerLat(latlng.lat);
        setMarkerLng(latlng.lng);
    };

    const handleChange = (e) => {
        setPickupPoint({
            ...pickupPoint,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div
            className="container-fluid py-4"
            style={{ backgroundColor: "#f5f7fb", minHeight: "100vh" }}
        >
            {/* Заголовок страницы */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">
                        Пункт выдачи
                    </h2>
    
                    <p className="text-muted mb-0">
                        Управление информацией и местоположением пункта
                    </p>
                </div>
    
                <div>
                    <span
                        className={`badge rounded-pill px-3 py-2 ${
                            pickupPoint.status === "Открыт"
                                ? "bg-success"
                                : pickupPoint.status === "Закрыт"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                        }`}
                        style={{ fontSize: "14px" }}
                    >
                        <i className="bi bi-circle-fill me-2"></i>
                        {pickupPoint.status}
                    </span>
                </div>
            </div>
    
            <div className="row g-4">
                {/* Левая часть */}
                <div className="col-lg-4">
                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{ borderRadius: "16px" }}
                    >
                        <div className="card-body p-4">
    
                            {/* Заголовок карточки */}
                            <div className="d-flex align-items-center mb-4">
                                <div
                                    className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-3 me-3"
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                    }}
                                >
                                    <i className="bi bi-shop fs-4"></i>
                                </div>
    
                                <div>
                                    <h5 className="fw-bold mb-0">
                                        Информация
                                    </h5>
    
                                    <small className="text-muted">
                                        Данные пункта выдачи
                                    </small>
                                </div>
                            </div>
    
                            {/* Название */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    <i className="bi bi-shop me-2 text-primary"></i>
                                    Название
                                </label>
    
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control form-control-lg"
                                    placeholder="Введите название"
                                    value={pickupPoint.name}
                                    onChange={handleChange}
                                />
                            </div>
    
                            {/* Адрес */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    <i className="bi bi-geo-alt me-2 text-danger"></i>
                                    Адрес
                                </label>
    
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control form-control-lg"
                                    placeholder="Введите адрес"
                                    value={pickupPoint.address}
                                    onChange={handleChange}
                                />
                            </div>
    
                            {/* Телефон */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    <i className="bi bi-telephone me-2 text-success"></i>
                                    Телефон
                                </label>
    
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control form-control-lg"
                                    placeholder="+996 XXX XXX XXX"
                                    value={pickupPoint.phone}
                                    onChange={handleChange}
                                />
                            </div>
    
                            {/* График */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    <i className="bi bi-clock me-2 text-warning"></i>
                                    График работы
                                </label>
    
                                <input
                                    type="text"
                                    name="schedule"
                                    className="form-control form-control-lg"
                                    placeholder="Пн–Сб: 09:00–20:00"
                                    value={pickupPoint.schedule}
                                    onChange={handleChange}
                                />
                            </div>
    
                            {/* Статус */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    <i className="bi bi-toggle-on me-2 text-primary"></i>
                                    Статус
                                </label>
    
                                <select
                                    name="status"
                                    className="form-select form-select-lg"
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
    
                            {/* Кнопка */}
                            <button
                                className="btn btn-primary btn-lg w-100 shadow-sm"
                                style={{
                                    borderRadius: "10px",
                                }}
                            >
                                <i className="bi bi-check2-circle me-2"></i>
                                Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
    
                {/* Правая часть - карта */}
                <div className="col-lg-8">
                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{ borderRadius: "16px" }}
                    >
                        <div className="card-body p-4">
    
                            {/* Заголовок карты */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex align-items-center">
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-danger bg-opacity-10 text-danger rounded-3 me-3"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                        }}
                                    >
                                        <i className="bi bi-map fs-4"></i>
                                    </div>
    
                                    <div>
                                        <h5 className="fw-bold mb-0">
                                            Местоположение
                                        </h5>
    
                                        <small className="text-muted">
                                            Выберите точку на карте
                                        </small>
                                    </div>
                                </div>
    
                                <span className="badge bg-light text-dark border px-3 py-2">
                                    <i className="bi bi-cursor me-1"></i>
                                    Кликните по карте
                                </span>
                            </div>
    
                            {/* Карта */}
                            <div
                                className="overflow-hidden shadow-sm"
                                style={{
                                    height: "500px",
                                    borderRadius: "14px",
                                    border: "1px solid #e5e7eb",
                                }}
                            >
                                <MapContainer
                                    center={[markerLat, markerLng]}
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
    
                                    <Marker
                                        position={[
                                            markerLat,
                                            markerLng,
                                        ]}
                                    >
                                        <Popup>
                                            <div style={{ minWidth: "180px" }}>
                                                <h6 className="fw-bold mb-2">
                                                    <i className="bi bi-shop me-2 text-primary"></i>
                                                    {pickupPoint.name}
                                                </h6>
    
                                                <div className="small">
                                                    <i className="bi bi-geo-alt me-2 text-danger"></i>
                                                    {pickupPoint.address}
                                                </div>
    
                                                <div className="small mt-1">
                                                    <i className="bi bi-telephone me-2 text-success"></i>
                                                    {pickupPoint.phone}
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
    
                                    <MapClickHandler
                                        onMapClick={handleMapClick}
                                    />
                                </MapContainer>
                            </div>
    
                            {/* Координаты */}
                            <div className="row g-3 mt-1">
                                <div className="col-md-6">
                                    <div
                                        className="p-3 bg-light rounded-3"
                                        style={{
                                            border: "1px solid #e9ecef",
                                        }}
                                    >
                                        <div className="text-muted small mb-1">
                                            <i className="bi bi-arrows-vertical me-2"></i>
                                            Широта
                                        </div>
    
                                        <div className="fw-bold">
                                            {markerLat.toFixed(6)}
                                        </div>
                                    </div>
                                </div>
    
                                <div className="col-md-6">
                                    <div
                                        className="p-3 bg-light rounded-3"
                                        style={{
                                            border: "1px solid #e9ecef",
                                        }}
                                    >
                                        <div className="text-muted small mb-1">
                                            <i className="bi bi-arrows-horizontal me-2"></i>
                                            Долгота
                                        </div>
    
                                        <div className="fw-bold">
                                            {markerLng.toFixed(6)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PickupPoint;
