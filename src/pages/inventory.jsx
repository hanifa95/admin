import axios from "axios";
import { useEffect, useState } from "react";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(
      "https://6a2fc982a7f8866418d5125a.mockapi.io/products"
    );

    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const updateProduct = async (product) => {
    await axios.put(
      `https://6a2fc982a7f8866418d5125a.mockapi.io/products/${product.id}`,
      product
    );
  };

  const increase = (product) => {
    const updated = {
      ...product,
      quantity: (product.quantity || 0) + 1,
      inStock: true,
    };

    setProducts(products.map((p) => (p.id === product.id ? updated : p)));
    updateProduct(updated);
  };

  const decrease = (product) => {
    let qty = (product.quantity || 0) - 1;

    if (qty < 0) qty = 0;

    const updated = {
      ...product,
      quantity: qty,
      inStock: qty > 0,
    };

    setProducts(products.map((p) => (p.id === product.id ? updated : p)));
    updateProduct(updated);
  };

  const toggleStock = (product) => {
    const updated = {
      ...product,
      inStock: !product.inStock,
    };

    setProducts(products.map((p) => (p.id === product.id ? updated : p)));
    updateProduct(updated);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Inventory</h2>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-primary">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  width="60"
                  height="60"
                  alt={product.title}
                  className="rounded"
                />
              </td>

              <td>{product.title}</td>

              <td>{product.quantity || 0}</td>

              <td>
                {product.inStock ? (
                  <span className="badge bg-success">
                    In Stock
                  </span>
                ) : (
                  <span className="badge bg-danger">
                    Out of Stock
                  </span>
                )}
              </td>

              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => increase(product)}
                >
                  +
                </button>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => decrease(product)}
                >
                  -
                </button>

                <button
                  className="btn btn-info"
                  onClick={() => toggleStock(product)}
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;