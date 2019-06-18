// Individual item component for use in the Inventory component.

import React, { Component } from 'react';
import classes from './Item.module.scss';

class Item extends Component{
  priceToSell = () => {
    if(this.props.priceToSell === "0.00"){
      return (
        <div className={classes.empty}></div>
      )
    } else {
      return (
        <div>
          Market Value: {this.props.priceToSell}g
        </div>
      )
    }
  }

  profitMargin = () => {
    let profitColor = "green";
    if(this.props.priceToSell !== "0.00"){
      // If the leading character in netProfit is a -, then making the item is a loss
      if(this.props.netProfit[0] === "-") {
        // this.props.netProfit.shift();
        profitColor = "red";
      }
      return (
          <div
            style={{'color': `${profitColor}`, 'fontWeight': 'bold'}}>
            Net Profit: {this.props.netProfit}g
          </div>
      )
    } else {
      return (
        <div>
          No current auctions found!
        </div>
      )
    }
  }
  render(){
    return (
      <div className={classes.item}>
        <div>
          {this.props.display}
        </div>
        <div>
          Crafting Cost: {(this.props.priceToCraft*1).toFixed(2)}g
        </div>
          {this.priceToSell()}
          {this.profitMargin()}
      </div>
    );
  }
}

export default Item;