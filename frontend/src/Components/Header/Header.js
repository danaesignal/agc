// Header component. Contains the name of the application (Automated Goblin
// Capitalist) and a drop-down menu to select which World of Warcraft server's
// auction house data to use.

import React, { PureComponent } from 'react';
import ServerSelector from './ServerSelector/ServerSelector'

class Header extends PureComponent{
  render(){
    return (
      <div>
        <span>Automated Goblin Capitalist</span>
        <ServerSelector
          changeActiveServer={this.props.changeActiveServer}
          activeServer={this.props.activeServer}
        />
      </div>
    );
  }
}

export default Header;