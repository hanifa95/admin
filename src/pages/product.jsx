import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const addNote = async () => {
    const response = await axios({
      method: "post",
      url: "https://6a2fc982a7f8866418d5125a.mockapi.io/products",
      data: {
        title: title,
        category: category,
        price: price,
        description: description,
        image: image,
        quantity: 0,
        inStock: false,
      },
    });
    if (response.status == 201 || response.status == 200) {
      setNotes([...notes, response.data]);
      alert("Product added successfully");
      setNotes(""),
        setTitle(""),
        setCategory(""),
        setPrice(""),
        setDescription(""),
        setImage("");
    }
  };
  const getNotes = async () => {
    const response = await axios({
      method: "get",
      url: "https://6a2fc982a7f8866418d5125a.mockapi.io/products",
    });
    console.log(response.data);
    if (response.status == 200) {
      setNotes(response.data);
    }
  };

  const deleteNote = async (id) => {
    const response = await axios({
      method: "delete",
      url: `https://6a2fc982a7f8866418d5125a.mockapi.io/products/${id}`,
    });
    if (response.status == 200) {
      getNotes();
      alert("Product deleted successfully");
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row bg-primary p-3">
        <div className="col-2">
          <i class="fa-brands fa-rockrms fs-3 ps-5 text-light"></i>
        </div>
        <div className="col-3">
          <a href="" className="pe-5 text-light text-light fw-bold">
            Dashboard
          </a>
          <a href="" className="pe-5 text-light fw-bold">
            Productos
          </a>
          <a href="" className="text-light fw-bold">
            Ventas
          </a>
        </div>
        <div className="col-5"></div>
        <div className="col-2 text-center">
          <i class="fa-solid fa-bell fs-4 text-light"></i>
        </div>
      </div>

      <div className="row">
        <div className="col-12 border-bottom border-1">
          <h2 className="p-4 fw-bold">Dashboard/Products</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <h2 className="p-4 fw-bold text-center">List of products </h2>
        </div>

        {/* <div className="col-2"> </div> */}

        <div className="col-6 text-center mt-4">
          <a href="/orders">
            <button className="btn btn-primary me-3 col-3 fw-bold">
              Orders
            </button>
          </a>
          <button
            type="button"
            class="btn btn-primary fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i class="fa-solid fa-plus"></i> Add product
          </button>

          <a href="/inventory">
            <button className="btn btn-primary ms-3 fw-bold">Inventory</button>
          </a>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div className="row">
                    <div className="col-6">
                      <p className="ps-2 fw-bold">Title</p>
                      <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="form-control ms-1 me-3"
                        value={title}
                      />
                    </div>
                    <div className="col-6">
                      <p className="ps-2 fw-bold">Price</p>
                      <input
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="price"
                        className="form-control "
                        value={price}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p className="ps-2 pt-3 fw-bold">Category</p>
                      <select
                        class="form-select form-control"
                        aria-label="Default select example"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Clothes">Clothes</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Toys">Toys</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label ps-2 pt-3 fw-bold "
                        >
                          Description
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p className="ps-2 fw-bold">Image</p>
                      <input
                        type="text"
                        placeholder="Image URL"
                        onChange={(e) => setImage(e.target.value)}
                        className="col-4 form-control"
                        value={image}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={addNote}
                  >
                    Add product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-2"></div>

        <div className="col-9  bg-primary rounded-2">
          <div className="row ">
            <div className="col-2">
              <p className="fw-bold pt-2">NAME</p>
            </div>
            <div className="col-2">
              <p className="fw-bold pt-2">CATEGORY</p>
            </div>
            <div className="col-2">
              <p className="fw-bold pt-2">PRICE</p>
            </div>
            <div className="col-2">
              <p className="fw-bold pt-2">Description</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-9 ">
          <div>
            {notes.length !== 0 && (
              <div>
                {notes.map((note) => (
                  <div key={note.id}>
                    <div className="row border-bottom mt-5 pb-3">
                      <div className="col-2">
                        <p className="">{note.title}</p>
                        <img
                          src={note.image}
                          alt="img"
                          width={"50px"}
                          height={"50px"}
                          className="rounded-5"
                        />
                      </div>
                      <div className="col-2">
                        <p>{note.category}</p>
                      </div>
                      <div className="col-2">
                        <p>{note.price}$</p>
                      </div>

                      <div className="col-2">
                        <p>{note.description}</p>
                      </div>
                      <div className="col-2">
                        <button
                          className="btn btn-primary form-control"
                          onClick={() => deleteNote(note.id)}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="col-2">
                        <button className="btn btn-primary form-control">
                          <a href={`/edit/${note.id}`} className="text-light ">
                            Edit
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
