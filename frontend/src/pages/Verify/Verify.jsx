import { useContext } from 'react';
import './Verify.css';
import { useSearchParams } from 'react-router-dom';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    
    const {url} = useContext(StoreContext);
    
    return (
    <div>Verify</div>
  )
}
export default Verify