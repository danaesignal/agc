// General modal HOC. Will be used to display high scores, and to display the form
// for adding your name to the high score list upon winning the game.

import React, { PureComponent } from 'react';
import classes from './Modal.module.scss';

class Modal extends PureComponent{
  state = {
    showModal: true,
  };

  modalClasses = classes.overlay;

  handleClickOutside = (e) => {
    if(this.props.onlyCloseWithX) return;
    if(e.target===this.overlay){
      this.props.toggleModal();
    }
  }

  render(){
    if(this.props.showModal){
      return (
        // Overlay
        <div
          className={classes.overlay}
          ref={node => (this.overlay = node)}
          onClick={this.handleClickOutside}
          >
          {/* Content */}
          <div className={classes.modal}>
            <div
              className={classes.close}
              onClick={this.props.toggleModal}
            ></div>
            <div className={classes.content}>
              {this.props.children}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        null
      )
    }
  }
}

export default Modal;