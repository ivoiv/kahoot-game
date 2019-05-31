import Entities from "types/entities";

/* Item Collection */

const COLLECT_ITEM = "COLLECT_ITEM";

type CollectItemAction = {
  type: typeof COLLECT_ITEM;
  item: Entities.Item;
};

export const collectItem = (item: Entities.Item): CollectItemAction => ({
  type: COLLECT_ITEM,
  item: item
});

/* Item initialization */

const ADD_ITEMS_AND_RULES = "ADD_ITEMS_AND_RULES";

type AddItemsAndRulesAction = {
  type: typeof ADD_ITEMS_AND_RULES;
  itemsAndRules: Entities.ItemList;
};

export const addItemsAndRules = (
  itemsAndRules: Entities.ItemList
): AddItemsAndRulesAction => ({
  type: ADD_ITEMS_AND_RULES,
  itemsAndRules: itemsAndRules
});

/* New Game / Game Reset */

const NEW_GAME = "NEW_GAME";

type NewGameAction = {
  type: typeof NEW_GAME;
};

export const newGame = (): NewGameAction => ({
  type: NEW_GAME
});

/* State Reducer */

type ActionTypes = CollectItemAction | AddItemsAndRulesAction | NewGameAction;

export const initialState: Entities.GameState = {
  items: [],
  collected_items: {}
};
export default (
  state:Entities.GameState = initialState,
  action: ActionTypes
): Entities.GameState => {
  switch (action.type) {
    case ADD_ITEMS_AND_RULES: {
      return {
        ...state,
        items: action.itemsAndRules
      };
    }
    case COLLECT_ITEM:
      const items: Entities.ItemCollection = { ...state.collected_items };
      items[action.item.type] = (items[action.item.type] || 0) + 1;

      /* Sorting collected items alphabetically for fun */
      const sortedItems: Entities.ItemCollection = {};
      Object.keys(items)
        .sort()
        .forEach(function(key) {
          sortedItems[key] = items[key];
        });

      return {
        ...state,
        collected_items: sortedItems
      };
    case NEW_GAME:
      return {
        ...state,
        collected_items: {}
      };
    default:
      return state;
  }
};
