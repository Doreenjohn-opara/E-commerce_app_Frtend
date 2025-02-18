import { createContext, useEffect, useReducer } from "react";
import { SavedItemsState } from "../utils/interface.utils";
import { SavedItemContextType } from "../utils/types.utils";
import { savedItemsReducer } from "../reducer/SavedItem.reducer";
import { IWishlist } from "../utils/interface.utils";
import { wishlistService } from "../services/wishlist.service";

const initialState: SavedItemsState = {
    savedItems: [],
  };

export const SavedItemsContext = createContext<SavedItemContextType>({
    state: initialState,
    dispatch: () => null,
  });

export const SavedItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(savedItemsReducer, initialState);
  
    // Load saved items from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem("savedItems")
    if (savedItems) {
      dispatch({ type: "SET_SAVED_ITEMS", payload: JSON.parse(savedItems) })
    }
  }, [])

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(state.savedItems))
  }, [state.savedItems])
  
    return (
      <SavedItemsContext.Provider value={{ state, dispatch }}>
          {children}
      </SavedItemsContext.Provider>
    );
  };