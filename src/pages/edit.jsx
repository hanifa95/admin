import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    const getProduct = async () => {
        try {
            const response = await axios.get(
                `https://6a2fc982a7f8866418d5125a.mockapi.io/products/${id}`
            );

            setTitle(response.data.title || "");
            setPrice(response.data.price || "");
            setDescription(response.data.description || "");
        } catch (error) {
            console.error("Ошибка загрузки:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        try {
            await axios.put(
                `https://6a2fc982a7f8866418d5125a.mockapi.io/products/${id}`,
                {
                    title,
                    price,
                    description,
                }
            );

            alert("Товар успешно обновлён");
            navigate("/products");
        } catch (error) {
            console.error("Ошибка обновления:", error);
            alert("Не удалось обновить товар");
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    if (loading) {
        return <h2>Загрузка...</h2>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h3 className="mb-0">Edit product</h3>
                        </div>
    
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label ps-2 fw-bold pt-3">
                                    Name product
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter name"
                                />
                            </div>
    
                            <div className="mb-3">
                                <label className="form-label ps-2 fw-bold pt-3">
                                    Price
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter price"
                                />
                            </div>
    
                            <div className="mb-3">
                                <label className="form-label ps-2 ps-2 fw-bold pt-3">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Enter description"
                                />
                            </div>
    
                            <div className="d-grid">
                                <button
                                    className="btn btn-primary btn-lg mt-2"
                                    onClick={updateProduct}
                                >
                                    💾 Save
                                </button>
                            </div>
                        </div>
    
                        <div className="card-footer text-center text-muted">
                            Product Edit Page
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    
};

export default Edit;
