import {useEffect,Fragment} from "react"
import {useSelector,useDispatch} from "react-redux"
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {sendCartData,fetchCartData} from "./store/cart-actions"
import Notification from "./components/UI/Notification"

let isInitial=true; 
function App() {
 
  const showCart=useSelector(store=>store.ui.showCart);
  const cart =useSelector(store=>store.cart);
  const notification=useSelector(store=>store.ui.notification);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])
  useEffect(()=>{
    if(isInitial){
      isInitial=false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    
},[cart,dispatch]);
  return (
    <Fragment>
    {notification&&<Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
      {showCart&&<Cart />}  
      <Products />
     </Layout>
    </Fragment>
    
  );
}

export default App;
