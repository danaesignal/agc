// Component which contains a variety of listings for materials used for WoW
// inscription. The parts used to generate these materials can be customized,
// allowing the user to determine the most cost-efficient way of crafting inscription
// products (the crux of the app).

import React, { PureComponent } from 'react';
import Material from './Material/Material.js';
import classes from './Materials.module.scss';

class Materials extends PureComponent{
  render(){
    const materialsKeys = [...Object.keys(this.props.materials)];
    const materialsList = materialsKeys.map(materialKey => {
      return (
        <Material
          key={materialKey}
          context={materialKey}
          material={this.props.materials[materialKey]}
          display={this.props.index[materialKey]}
          parts={this.props.parts}
          changeActiveSource={this.props.changeActiveSource}
        />
      )
    });
    return (
      <div className={classes.materials}>
        {materialsList}
        <div className={classes.tip}>{"Tip: Items with insufficient auction data are struck-out and disabled."}</div>
      </div>
    );
  }
}

export default Materials;