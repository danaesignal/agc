// Header component. Contains the name of the application (Automated Goblin
// Capitalist) and a drop-down menu to select which World of Warcraft server's
// auction house data to use.

import React, { PureComponent } from 'react';
import ServerSelector from './ServerSelector/ServerSelector';
import classes from './Header.module.scss';
import coinPile from '../../Images/coinPile.png';

class Header extends PureComponent{
  render(){
    return (
      <div className={classes.header}>
        <div className={classes.fob}>
          <img src={coinPile} alt=""></img>
        </div>
        <div className={classes.headerTitle}>Automated Goblin Capitalist</div>
        <ServerSelector
          changeActiveServer={this.props.changeActiveServer}
          activeServer={this.props.activeServer}
        />
      </div>
    );
  }
}

export default Header;