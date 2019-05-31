import React from "react";
import withStyles, { WithStyles } from "react-jss";
import Item from "../Common/Item";
import { connect } from "react-redux";
import { collectItem } from "../store";
import Entities from "types/entities";

const styles = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  playArea: {
    flex: "1 1 auto",
    border: "2px solid black",
    overflowY: "scroll"
  },
  heading: {
    composes: "heading",
    flex: "0 1 auto"
  },
  item: {
    margin: 24
  }
};

type PropsFromState = {
  items: Entities.ItemList;
};

type PropsFromDispatch = {
  collectItem: (item: Entities.Item) => void;
};

interface Props
  extends PropsFromState,
    PropsFromDispatch,
    WithStyles<typeof styles> {}

function GameArea(props: Props) {
  return (
    <div className={props.classes.root}>
      <h1 className={props.classes.heading}>Kahoot! Points</h1>
      <div className={props.classes.playArea}>
        {props.items.map((item, index) => {
          return (
            <Item
              key={index}
              large
              pressable
              className={props.classes.item}
              onClick={() => props.collectItem(item)}>
              {item.type}
            </Item>
          );
        })}
      </div>
    </div>
  );
}

const MapStateToProps = (state: any): PropsFromState => ({
  items: state.items
});

const MapDispatchToProps: PropsFromDispatch = {
  collectItem
};

export default connect<PropsFromState, PropsFromDispatch>(
  MapStateToProps,
  MapDispatchToProps
)(React.memo(withStyles(styles)(GameArea)));
