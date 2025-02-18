import { SavedItemsState } from "../utils/interface.utils";
import { SavedItemsAction } from "../utils/types.utils";

export const savedItemsReducer = (state: SavedItemsState, action: SavedItemsAction): SavedItemsState => {
  switch (action.type) {
    case "ADD_SAVED_ITEM":
      return { ...state, savedItems: [...state.savedItems, action.payload] }
    case "REMOVE_SAVED_ITEM":
      return { ...state, savedItems: state.savedItems.filter((id) => id !== action.payload) }
    case "SET_SAVED_ITEMS":
      return { ...state, savedItems: action.payload }
    default:
      return state
  }
}