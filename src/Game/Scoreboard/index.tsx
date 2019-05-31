import React from "react";
import withStyles, { WithStyles } from "react-jss";
import { connect } from "react-redux";
import Item from "../Common/Item";
import Entities from "types/entities";
import { newGame } from "Game/store";

const styles = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  playArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: "1 1 auto"
  },
  heading: {
    composes: "heading",
    flex: "0 1 auto"
  },
  table: {
    paddingTop: 16,
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse",

    "& th": {
      padding: 8,
      width: "33%",
      borderBottom: "2px solid black"
    },
    "& td": {
      borderBottom: "2px solid black",
      padding: 8
    },
    "& tbody": {
      overflowY: "scroll"
    }
  },
  tableContainer: {
    flex: "1 1 auto",
    border: "2px solid black",
    overflowY: "scroll"
  },

  bonuses: {
    border: "2px solid black",
    padding: "0 24px",
    display: "flex",
    "& p:first-of-type": {
      marginRight: 8
    }
  },
  total: {
    border: "2px solid black",

    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    "& button": {
      maxWidth: 150,
      maxHeight: 50,
      height: "100vh",
      width: "100vw"
    }
  }
};

/* For best efficiency and performance the three following
 * calculations should be done in a single iteration.
 *
 * Howoever since the calculation have insignificant performance
 * impact I have rather chosen to isolate and modularise them.
 */

function calcualteItemScore(
  allItems: Entities.ItemList,
  collectedItemType: keyof Entities.ItemCollection,
  collectedItemAmmount: Entities.ItemCollection[keyof Entities.ItemCollection]
): number {
  const item = allItems.find(item => item.type === collectedItemType);

  if (item) {
    const standardScore = collectedItemAmmount * item.points;
    if (item.bonus) {
      const bonusScore =
        Math.floor(collectedItemAmmount / item.bonus.ammount) *
        item.bonus.reward;
      return (
        bonusScore + (collectedItemAmmount % item.bonus.ammount) * item.points
      );
    }
    return standardScore;
  } else {
    return 0;
  }
}

function calculateTotalBonuses(
  allItems: Entities.ItemList,
  collectedItems: Entities.IterableItemCollection
): number {
  return collectedItems.reduce((accumulator, currentItem) => {
    const itemWithBonus: Entities.Item | undefined = allItems.find(
      item => item.type === currentItem[0] && item.bonus !== undefined
    );
    if (itemWithBonus && itemWithBonus.bonus) {
      return (
        accumulator +
        Math.floor(currentItem[1] / itemWithBonus.bonus.ammount) *
          itemWithBonus.bonus.reward
      );
    } else {
      return accumulator;
    }
  }, 0);
}

function calculateTotalScore(
  allItems: Entities.ItemList,
  collectedItems: Entities.IterableItemCollection
): number {
  return collectedItems.reduce(
    (accumulator, currentItem) =>
      accumulator +
      calcualteItemScore(allItems, currentItem[0], currentItem[1]),
    0
  );
}

interface PropsFromState {
  collected_items: Entities.IterableItemCollection;
  items: Entities.ItemList;
}

interface PropsFromDispatch {
  newGame: () => void;
}

interface Props
  extends WithStyles<typeof styles>,
    PropsFromState,
    PropsFromDispatch {}

function Scoreboard(props: Props) {
  //console.log(props);
  return (
    <div className={props.classes.root}>
      <h1 className={props.classes.heading}>Player items</h1>
      <div className={props.classes.playArea}>
        <div className={props.classes.tableContainer}>
          <table className={props.classes.table}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {props.collected_items.length ? (
                props.collected_items.map((item: any, i: number) => (
                  <tr key={i}>
                    <td>
                      <Item>{item[0]}</Item>
                    </td>
                    <td>{item[1]}</td>
                    <td>{calcualteItemScore(props.items, item[0], item[1])}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <p>You have not collected any items yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ flex: "0 1 auto" }}>
          <div className={props.classes.bonuses}>
            <p>Bonuses</p>
            <p>{calculateTotalBonuses(props.items, props.collected_items)}</p>
          </div>
          <div className={props.classes.total}>
            <div style={{ paddingRight: 24 }}>
              <p>Total</p>
              <p>{calculateTotalScore(props.items, props.collected_items)}</p>
            </div>
            <button onClick={() => props.newGame()}>NEW GAME</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any): PropsFromState => ({
  collected_items: Object.entries(state.collected_items),
  items: state.items
});

const mapDispatchToProps = {
  newGame
};

export default connect<PropsFromState, PropsFromDispatch>(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(withStyles(styles)(Scoreboard)));
