import { useSavedItemsContext } from "../Hook/useSavedItem.hook"

export const useSavedItemActions = () => {
  const { state, dispatch } = useSavedItemsContext()

  const addSavedItem = (itemId: string) => {
    dispatch({ type: "ADD_SAVED_ITEM", payload: itemId })
  }

  const removeSavedItem = (itemId: string) => {
    dispatch({ type: "REMOVE_SAVED_ITEM", payload: itemId })
  }

  const toggleSavedItem = (itemId: string) => {
    if (state.savedItems.includes(itemId)) {
      removeSavedItem(itemId)
    } else {
      addSavedItem(itemId)
    }
  }

  const isSavedItem = (itemId: string) => {
    return state.savedItems.includes(itemId)
  }

  return {
    savedItems: state.savedItems,
    addSavedItem,
    removeSavedItem,
    toggleSavedItem,
    isSavedItem,
  }
}

