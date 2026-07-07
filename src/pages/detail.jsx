import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
    const params = useParams();
    const id = params.id;
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [detail,setDetail] = useState('');
    
    const getProduct = async () => {
        const response = await axios({
            method: 'get',
            url: `https://6a2fc982a7f8866418d5125a.mockapi.io/products/${id}`
        });
        console.log(response.data);
        if (response.status == 200) {
            setDetail(response.data);
            setTitle(response.data.title);
            setPrice(response.data.price);
        }
    }
    const EditDetail = async () => {
       const response = await axios({
           method: 'put',
           url: `https://6a2fc982a7f8866418d5125a.mockapi.io/products/${id}`,
           data: {
               title: title,
               price:  price,
           }
       });
       if (response.status == 200) {
           getProduct();
       } 
    }

    useEffect(() => {
        getProduct();
    },[])


    return (
        <div>
            <h1>Edit</h1>
            <input defaultValue={detail.title} type="text" onChange={(e)=>setTitle(e.target.value)} />
            <input defaultValue={detail.price} type="text" onChange={(e)=>setPrice(e.target.value)} />
            <button onClick={EditDetail}>Edit</button>
        </div>
    );
}

export default Detail;