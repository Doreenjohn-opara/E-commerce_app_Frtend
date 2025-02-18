import { useContext } from "react";
import { SavedItemsContext } from "../context/SavedItem.context";

export const useSavedItemsContext = () => {
  const { state, dispatch } = useContext(SavedItemsContext);

    return { state, dispatch };
};
