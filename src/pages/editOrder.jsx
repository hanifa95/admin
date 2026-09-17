import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API =  "https://695ff14b7f037703a81543ad.mockapi.io/courier"

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [rating, setRating] = useState("");
    const [loading, setLoading] = useState(true);

    // Получение пользователя
    const getOrder = async () => {
        try {
            const response = await axios.get(`${API}/${id}`);

            setName(response.data.name || "");
            setPhone(response.data.phone || "");
            setRating(response.data.rating || "");

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
                    name,
                    phone,
                    rating
                }
            );


            // обновляем localStorage
            localStorage.setItem(
                "editOrder",
                JSON.stringify(response.data)
            );


            alert("Данные успешно изменены");

            navigate("/courierList");


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
                                Edit Courier
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
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />



                            <label className="fw-bold">
                                Phone Number
                            </label>

                            <input
                                className="form-control mb-3"
                                type="text"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                            />



                            <label className="fw-bold">
                                Rating
                            </label>

                            <input
                                className="form-control mb-4"
                                type="text"
                                value={rating}
                                onChange={(e)=>setRating(e.target.value)}
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
