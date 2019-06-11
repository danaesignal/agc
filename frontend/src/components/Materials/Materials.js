// Component which contains a variety of listings for materials used for WoW
// inscription. The parts used to generate these materials can be customized,
// allowing the user to determine the most cost-efficient way of crafting inscription
// products (the crux of the app).

import React, { PureComponent } from 'react';
import Material from './Material/Material.js';

class Materials extends PureComponent{
  render(){
    let materialsKeys = [...Object.keys(this.props.materials)];
    let materialsList = materialsKeys.map(materialKey => {
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
      <div>
        {materialsList}
      </div>
    );
  }
}

export default Materials;