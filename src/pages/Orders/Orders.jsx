import React from 'react'
import './Orders.css'
import {useState} from 'react'
import {toast} from'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'


const Orders = ({url}) => {

    const[orders, setOrders] = useState([]);

    const fetchAllOrders= async()=>{
        try{
     const response = await axios.get(`${url}/api/orders`);
     if(response.data.success){
        setOrders(response.data.data);
        console.log(response.data.data);
     }else{
        toast.error('Error')
     }
    }catch (error){
        toast.error('Error fetching orders')
    }
}
    const statusHandler = async(event,orderId)=>{
        try{
      const response = await axios.post(`${url}/api/orders/status`,{
        orderId,
        status:event.target.value,

      })
      if(response.data.success){
        await fetchAllOrders();
      }
    }catch(error){
        toast.error('Error updating status')
    }
    }
    useEffect(()=>{
        fetchAllOrders();
    },[])
    return (
        <div className='order add'>
            <h3>Order page</h3>
            <div className='order-list'>
                {orders.map((order)=>{
                    <div key={order._id} className='order-item'>
                        <img src={assets.parcel_icon} alt="Parcel Icon"/>
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item,index)=>{
                                    if(index===order.items.length-1){
                                        return item.name+ "x"+ item.quantity
                                    }else{
                                        return item.name + " x "+ item.quantity+ ","
                                    }
                                })}
                            </p>
                        <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                        <div className='order-item-address'>
                            <p>{order.address.street+","}</p>
                            <p>{order.address.city+", "+ order.address.state+", "+ order.address.country+", "+ order.address.zipcode}</p>
                        </div>
                            <p className= 'order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items:{order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                            <option value='Food Processing'>Food Processing</option>
                            <option value= 'Out of Delivery'>Out for delivery</option>
                            <option value='Delivered'>Delivered</option>
                        </select>
                        </div>
                })}
            </div>  
        </div>
    )
}

export default Orders;

