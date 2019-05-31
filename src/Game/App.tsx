import React, { useEffect } from "react";
import withStyles, { WithStyles } from "react-jss";
import GameArea from "./GameArea";
import Scoreboard from "./Scoreboard";
import Entities from "../types/entities";
import { addItemsAndRules } from "./store";
import { connect } from "react-redux";

const styles = {
  "@global": {
    ".heading": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      border: "2px solid black",
      boxSizing: "border-box",
      margin: 0,
      lineHeight: "2em",
      height: "2em",
      paddingLeft: 24
    },
    body: {
      fontFamily: "Roboto, sans-serif",
      margin: 0
    }
  },
  root: {
    maxWidth: 1024,
    maxHeight: 768,
    margin: "auto",
    width: "100vw",
    height: "100vh",
    border: "2px solid black",
    display: "flex"
  },
  leftScreen: {
    width: "66%",
    height: "100%"
  },
  rightScreen: {
    width: "34%",
    height: "100%"
  }
};

const items: Entities.ItemList = [
  {
    type: "A",
    points: 50,
    bonus: {
      ammount: 3,
      reward: 200
    }
  },
  {
    type: "B",
    points: 30,
    bonus: {
      ammount: 2,
      reward: 90
    }
  },
  {
    type: "C",
    points: 20
  },
  {
    type: "D",
    points: 15
  }
];

interface PropsFromDispatch {
  addItemsAndRules: typeof addItemsAndRules;
}

interface Props extends WithStyles<typeof styles>, PropsFromDispatch {}

function App(props: Props) {
  useEffect(() => {
    props.addItemsAndRules(items);
  }, []);

  return (
    <div role="main" className={props.classes.root}>
      <div className={props.classes.leftScreen}>
        <GameArea />
      </div>
      <div className={props.classes.rightScreen}>
        <Scoreboard />
      </div>
    </div>
  );
}

const MapDispatchToProps = {
  addItemsAndRules
};

export default connect<null, PropsFromDispatch>(
  null,
  MapDispatchToProps
)(React.memo(withStyles(styles)(App)));
