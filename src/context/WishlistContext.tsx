import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type { WishlistState, WishlistAction, Product } from '../types';

// ===== INITIAL STATE (from localStorage) =====
function getInitialState(): WishlistState {
  try {
    const saved = localStorage.getItem('aara-wishlist');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return { items: [] };
}

// ===== REDUCER =====
function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state;
      }
      return { items: [...state.items, action.payload] };

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (item) => item.id !== action.payload.productId
        ),
      };

    case 'TOGGLE_ITEM': {
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (exists) {
        return {
          items: state.items.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }

    case 'CLEAR_WISHLIST':
      return { items: [] };

    default:
      return state;
  }
}

// ===== CONTEXT =====
interface WishlistContextType {
  state: WishlistState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// ===== PROVIDER =====
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, undefined, getInitialState);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('aara-wishlist', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product) =>
    dispatch({ type: 'ADD_ITEM', payload: product });

  const removeItem = (productId: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });

  const toggleItem = (product: Product) =>
    dispatch({ type: 'TOGGLE_ITEM', payload: product });

  const clearWishlist = () => dispatch({ type: 'CLEAR_WISHLIST' });

  const isInWishlist = (productId: string) =>
    state.items.some((item) => item.id === productId);

  return (
    <WishlistContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        toggleItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ===== HOOK =====
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
