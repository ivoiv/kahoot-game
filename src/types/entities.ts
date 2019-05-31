namespace GameEntities {
  export type Item = {
    type: string;
    points: number;
    bonus?: {
      ammount: number;
      reward: number;
    };
  };

  export type ItemList = Array<Item>;

  export type GameState = {
    items: ItemList;
    collected_items: ItemCollection;
  };

  export type ItemCollection = { [key: string]: number };

  export type IterableItemCollection = Array<
    [keyof ItemCollection, ItemCollection[keyof ItemCollection]]
  >;
}

export default GameEntities;
