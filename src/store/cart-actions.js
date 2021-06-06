import {uiActions,cartActions} from "./index";


export const fetchCartData=()=>{
    return async(dispatch)=>{
        const fetchData=async()=>{
            const response=await fetch('https://practice-c8cbd-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok){
                throw new Error('Sending Cart data failed!')
            }
            const data =await response.json();
            return data;
        }
        try {
           const cartData=await fetchData();
            dispatch(cartActions.replaceCart({
                items:cartData.items || [],
                totalQuantity:cartData.totalQuantity
            }));
        } catch (error) {
            dispatch(uiActions.showNotifications({
        status:'error',
        title:'Error!',
        message:'Sending cart data failed!'
      }))
        }
    }
}

export const sendCartData=(cart)=>{
  return async(dispatch)=>{
   dispatch(uiActions.showNotifications({
        status:'Pending',
        title:'Sending...',
        message:'Sending cart data!'
      }));
      console.log('nextstep')

    const sendCartData=async()=>{
        console.log('entered')
      const response= await fetch('https://practice-c8cbd-default-rtdb.firebaseio.com/cart.json',{
      method:'PUT',
      body:JSON.stringify(cart)
    });
   
    if(!response.ok){
      throw new Error('Sending Cart Data Failed');
    }
    
  
  }
  try {
    await sendCartData();
    dispatch(uiActions.showNotifications({
        status:'success',
        title:'Success!',
        message:'Sent cart data successfully!'
      }))
  } catch (error) {
     dispatch(uiActions.showNotifications({
        status:'error',
        title:'Error!',
        message:'Sending cart data failed!'
      }))
  }
 

  }
}
