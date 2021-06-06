import {useDispatch,useSelector} from "react-redux";
import {uiActions} from "../../store/index";
import classes from './CartButton.module.css';
const CartButton = (props) => {
  const cartNumber=useSelector(store=>store.cart.totalQuantity);
 
  const dispatch=useDispatch();

  const showCartHandler=()=>{
    dispatch(uiActions.toggleCart());
  }
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartNumber}</span>
    </button>
  );
};

export default CartButton;
