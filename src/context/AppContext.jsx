import { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  cart: [],
  cartOpen: false,
  orderModal: false,
  orderSuccess: null,
  selectedProduct: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.id === action.payload.id)
      if (existing) {
        return { ...state, cart: state.cart.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) }
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) }
    case 'UPDATE_QTY':
      return {
        ...state,
        cart: action.payload.qty <= 0
          ? state.cart.filter(i => i.id !== action.payload.id)
          : state.cart.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i),
      }
    case 'CLEAR_CART':
      return { ...state, cart: [], orderSuccess: null }
    case 'TOGGLE_CART':
      return { ...state, cartOpen: !state.cartOpen }
    case 'SET_CART_OPEN':
      return { ...state, cartOpen: action.payload }
    case 'SET_ORDER_MODAL':
      return { ...state, orderModal: action.payload }
    case 'SET_ORDER_SUCCESS':
      return { ...state, orderSuccess: action.payload, cart: [], cartOpen: false, orderModal: false }
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const setCartOpen = (v) => dispatch({ type: 'SET_CART_OPEN', payload: v })
  const setOrderModal = (v) => dispatch({ type: 'SET_ORDER_MODAL', payload: v })
  const setSelectedProduct = (item) => dispatch({ type: 'SET_SELECTED_PRODUCT', payload: item })
  const placeOrder = (form) => {
    const order = { ...form, id: `ORD-${Date.now()}`, items: [...state.cart], total: state.cart.reduce((s, i) => s + i.price * i.qty, 0), status: 'Yeni', time: new Date().toLocaleString('az-AZ') }
    const existing = JSON.parse(localStorage.getItem('kc_orders') || '[]')
    localStorage.setItem('kc_orders', JSON.stringify([order, ...existing]))
    dispatch({ type: 'SET_ORDER_SUCCESS', payload: order })
  }
  const cartTotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0)

  return (
    <AppContext.Provider value={{ ...state, addToCart, removeFromCart, updateQty, clearCart, toggleCart, setCartOpen, setOrderModal, setSelectedProduct, placeOrder, cartTotal, cartCount }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
