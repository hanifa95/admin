import axios from "axios";
import { useEffect, useState } from "react";

const List = () => {
    const [lists, setLists] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');


    const addLists = async () => {
        const response = await axios({
            method: 'post',
            url: '',
            data: {
                tile: title,
                price: price
            }
        });
        if (response.status == 201 || response.status == 200) {
            setLists([...lists, response.data]);
            alert('Lists added successfully');
        }
    }
    const getLists = async () => {
        const response = await axios({
            method: 'get',
            url: 'https://6a2fc982a7f8866418d5125a.mockapi.io/products'
        });
        console.log(response.data);
        if (response.status == 200) {
            setLists(response.data);
        }
    }
    const deleteList = async (id) => {
        const response = await axios({
            method: 'delete',
            url: `https://6a2fc982a7f8866418d5125a.mockapi.io/products/${id}`
        });
        if (response.status == 200) {
            getLists();
            alert('List deleted successfully');
        }
    }
    useEffect(() => {
        getLists();
    }, [])


    return (
        <div>
            <h1>Lists</h1>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="name"  />
            <input type="text" onChange={(e)=>setPrice(e.target.value)} placeholder="deadline" />
            <button onClick={addLists}>Add Lists</button>
            <div>
                {lists.length !== 0 &&
                    <>                
                    {lists.map((list) => (
                        <div key={list.id}>
                            <h1>{list.title}</h1>
                            {/* <img src={list.avatar} alt="" width={100} /> */}
                            <p>Price: {list.price}</p>
                          
                            <button onClick={() => deleteList(list.id)}>Delete</button>
                            <button><a href={`/detail/${list.id}`}>Edit</a></button>
                        </div>
                    ))}
                    </>
                }

            </div>
        </div>
    )
}

export default List;