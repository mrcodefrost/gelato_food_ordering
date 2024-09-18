import './List.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const List = ({url}) => {


  const [list, setList] = useState([]);

  const fetchList = async () => {

    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error(response.data.message);
    }

  }

  const removeFood = async(foodId) => {
    // to delete, pass the id in data property
    const response = await axios.delete(`${url}/api/food/remove`, {
      data: {
        id: foodId
      }
    });

    await fetchList();

    if(response.data.success){
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }

  }


  // To run this function whenever the web page is reloaded

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className="list add flex-col">
      <p>All Food Items List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) => {
          return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
              </div>

          );
        })}
      </div>
    </div>
  )
}
export default List