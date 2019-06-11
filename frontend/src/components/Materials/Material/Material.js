// Individual Material item part for use in the Materials component.

import React, { Component } from 'react';
import Part from './Part/Part';

class Material extends Component{
  partList = () => {
    return this.props.material.partSources.map((source, index) => {
      return (
        <Part
          context={this.props.context}
          index={index}
          key={index}
          display={source.display}
          marketPrices={this.props.parts}
          items={source.parts}
          changeActiveSource={this.props.changeActiveSource}
          active={this.props.material.activeSource}
        />
      )
    })
  }

  render(){
    return (
      <div>
        {`${this.props.display}:`}
        {this.partList()}
      </div>
    );
  }
}

export default Material;