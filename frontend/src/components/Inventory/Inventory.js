// Component which contains the main display element for the app
// Displays various item components, which consist of an item's name, the cost to
// craft that item, the sale price of the item, and the profit derived from the
// previous two numbers.

import React, { PureComponent } from 'react';
import Item from './Item/Item';

class Inventory extends PureComponent{
  generateInventory = () => {
    return (
      this.props.inventory.map(item => {
        // Retrieves the price of each part and multiplies it by the number needed
        let resolvedPartPrices = item.materials.map(part => {
          return part[1] * this.props.parts[part[0]]/10000;
        });
        // Totals the price of all parts into one final sum
        let priceToCraft = resolvedPartPrices.reduce((total, next) => {
          return (total + next).toFixed(2);
        })
        // Pulls up the market value of the item we're selling
        let priceToSell = (this.props.parts[item.itemId]/10000).toFixed(2);
        // Sale price - item cost = net profit
        let netProfit = (priceToSell - priceToCraft).toFixed(2);
        return (
          <Item
            key={item.itemId}
            display={item.display}
            priceToCraft={priceToCraft}
            priceToSell={priceToSell}
            netProfit={netProfit}
          />
        )
      })
    )
  }
  render(){
    return (
      <div>
        {this.generateInventory()}
      </div>
    );
  }
}

export default Inventory;