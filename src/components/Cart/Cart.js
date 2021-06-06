import Card from '../UI/Card';
import {useSelector} from "react-redux"
import classes from './Cart.module.css';
import CartItem from './CartItem';


const Cart = (props) => {
  const items =useSelector(store=>store.cart.items);

  // const hasItems=items.amount!==0;

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
      {items.map(item=><CartItem
          key={item.id}
          item={{ id:item.id, title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
        />)}
        
      </ul>
    </Card>
  );
};

export default Cart;
