import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API =  "https://6a2fc982a7f8866418d5125a.mockapi.io/orders"

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);

    // Получение пользователя
    const getOrder = async () => {
        try {
            const response = await axios.get(`${API}/${id}`);

            setCustomerName(response.data.customerName || "");
            setCustomerPhone(response.data.customerPhone || "");
            setAddress(response.data.address || "");

        } catch (error) {
            console.log("Ошибка загрузки:", error);
        } finally {
            setLoading(false);
        }
    };


    // Обновление пользователя
    const updateOrder = async () => {
        try {
            const response = await axios.put(
                `${API}/${id}`,
                {
                    customerName,
                    customerPhone,
                    address
                }
            );


            // обновляем localStorage
            localStorage.setItem(
                "order",
                JSON.stringify(response.data)
            );


            alert("Данные успешно изменены");

            navigate("/orders");


        } catch (error) {
            console.log("Ошибка обновления:", error);
            alert("Ошибка при сохранении");
        }
    };


    useEffect(() => {
        getOrder();
    }, [id]);


    if (loading) {
        return (
            <h2 className="text-center mt-5">
                Загрузка...
            </h2>
        );
    }


    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow border-0 rounded-4">


                        <div className="card-header bg-success text-white text-center">
                            <h3>
                                Edit Order
                            </h3>
                        </div>


                        <div className="card-body">

{/* 
                            <div className="text-center mb-3">

                                <img
                                    src={avatar}
                                    alt="avatar"
                                    width="120"
                                    height="120"
                                    className="rounded-circle border"
                                />

                            </div> */}



                            <label className="fw-bold">
                                Name
                            </label>

                            <input
                                className="form-control mb-3"
                                type="text"
                                value={customerName}
                                onChange={(e)=>setCustomerName(e.target.value)}
                            />



                            <label className="fw-bold">
                                Phone Number
                            </label>

                            <input
                                className="form-control mb-3"
                                type="text"
                                value={customerPhone}
                                onChange={(e)=>setCustomerPhone(e.target.value)}
                            />



                            <label className="fw-bold">
                                Address
                            </label>

                            <input
                                className="form-control mb-4"
                                type="text"
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                            />



                            <button
                                className="btn btn-success w-100"
                                onClick={updateOrder}
                            >
                                💾 Save changes
                            </button>


                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
};


export default EditOrder;
