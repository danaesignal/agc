// Individual item component for use in the Inventory component.

import React, { PureComponent } from 'react';
import classes from './Item.module.scss';

class Item extends PureComponent{
  profitMargin = () => {
    let profitColor = classes.green;
    if(this.props.priceToSell !== "0.00"){
      // If the leading character in netProfit is a -, then making the item is a loss
      if(this.props.netProfit[0] === "-") {
        // this.props.netProfit.shift();
        profitColor = classes.red;
      }
      return (
        <div className={profitColor}>
          {`Net Profit: ${this.props.netProfit}g`}
        </div>
      )
    } else {
      return null
    }
  }
  render(){
    return (
      <div>
        <div>
          {this.props.display}
        </div>
        <div>
          {`Crafting Cost: ${this.props.priceToCraft}g`}
        </div>
        <div>
          {this.props.priceToSell === "0.00" ? "No current auctions found-- name your price!" : `Market Value: ${this.props.priceToSell}g`}
        </div>
        {this.profitMargin()}
      </div>
    );
  }
}

export default Item;