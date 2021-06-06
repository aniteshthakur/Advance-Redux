import {createSlice,configureStore} from "@reduxjs/toolkit"

const initialCartState={
    items:[],
    totalQuantity:0,
    changed:false,
    
}
const initialShowState={
    showCart:false,
    notification:null,
}
const showSlice=createSlice({
    name:'ui',
    initialState:initialShowState,
    reducers:{
        showNotifications(state,action){
            state.notification={
                status:action.payload.status,
                title: action.payload.title,
                message:action.payload.message
            }
        },
        toggleCart(state){
            state.showCart=!state.showCart;
        },
    }
})
const cartSlice=createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        replaceCart(state,action){
            state.totalQuantity=action.payload.totalQuantity;
            state.items=action.payload.items;
        },
        
        addItem(state,action){
            const newItem=action.payload;
            const existingItem=state.items.find(item =>item.id===newItem.id);
            state.changed=true;
            state.totalQuantity++
            if(!existingItem){
                state.items.push({
                    name:newItem.title,
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price
                });
            }
            else{
                existingItem.quantity++;
                existingItem.totalPrice=existingItem.totalPrice+newItem.price;
            }
            
    },
    removeItem(state,action){
        const id=action.payload;
        const existingItem=state.items.find(item=>item.id===id);
        state.changed=true;
        state.totalQuantity--;
        if(existingItem.quantity ===1){
            state.items=state.items.filter(item=>item.id!==id);
        }
        else{
            existingItem.quantity--;
            existingItem.totalPrice=existingItem.totalPrice-existingItem.price;
        }
    }
}});

const store =configureStore({
    reducer:{cart:cartSlice.reducer,ui:showSlice.reducer},
});
export const cartActions=cartSlice.actions;
export const uiActions=showSlice.actions;

export default store;