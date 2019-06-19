// Individual Material item part for use in the Materials component.

import React, { Component } from 'react';
import Part from './Part/Part';
import classes from './Material.module.scss';

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
      <div className={classes.material}>
        <div>{`${this.props.display}:`}</div>
        {this.partList()}
      </div>
    );
  }
}

export default Material;