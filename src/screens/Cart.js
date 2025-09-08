import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-white fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
      console.log("User email:", userEmail); // ← yahan check karo email sahi aa raha hai ya nahi

    if (!userEmail) {
      alert("Login first to place order");
      return;
    }

    const orderItems = data.map(item => ({
  Order_date: new Date().toDateString(),
  items: [item] // har item ko items array me wrap karo
}));

    try {
      let response = await fetch("https://intuitive-creativity-production.up.railway.app/api/auth/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: orderItems,
          email: userEmail
        })
      });

      console.log("JSON RESPONSE:::::", response.status)
      if (response.status === 200) {
        dispatch({ type: "DROP" })
        alert("Order placed successfully ✅")
      } else {
        alert("Failed to place order ❌")
      }
    } catch (error) {
      console.error("Error while checkout:", error);
      alert("Something went wrong during checkout ❌")
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className=' text-white fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td className='text-white'>{food.name}</td>
                <td className='text-white'>{food.qty}</td>
                <td className='text-white'>{food.size}</td>
                <td className='text-white'>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>
    </div>
  )
}
