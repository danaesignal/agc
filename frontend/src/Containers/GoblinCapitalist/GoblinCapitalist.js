// Main container for app
// Contains state, queries API and interprets results, defines functions for
// subsequent components to use
// Calls and displays other components

import React, { Component } from 'react';
import Modal from '../../HOC/Modal/Modal';
import Materials from '../../Components/Materials/Materials';
import Header from '../../Components/Header/Header';
import Inventory from '../../Components/Inventory/Inventory';
import spinningCoin from '../../Images/spinningCoin.gif';
import horde from '../../Images/horde.png';
import classes from './GoblinCapitalist.module.scss';
import stateHelpers from '../../helpers/stateHelpers';

class GoblinCapitalist extends Component{
  async componentDidMount(){
    if (localStorage.getItem('server') === null) {
      localStorage.setItem('server', 'malganis')
      this.changeActiveServer('malganis');
    } else {
      this.changeActiveServer(localStorage.getItem('server'))
    }
  }
  state = {
    'showModal': false,
    'inventory': stateHelpers.inventoryTemplate(),
    'materials': stateHelpers.materialsTemplate(),
    'index': stateHelpers.indexTemplate(),
    'dataLoaded': false
  };


  toggleModal = () => {
    this.setState({ 'showModal': !this.state.showModal })
  }

  changeActiveSource = (context, index) => {
    const materials = {...this.state.materials};
    materials[context].activeSource = index;
    this.setState({materials});
  }

  changeActiveServer = async (server) => {
    this.setState({'dataLoaded': false});

    let parts = {};
    console.log(localStorage.getItem('server'))
    localStorage.setItem('server', server);
    console.log(localStorage.getItem('server'))
    try{
      let response = await fetch(`/auction/${server}`, {
        'headers' : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      let jsonResponse = await response.json();
      parts = await JSON.parse(jsonResponse.items);
    }
    catch(err){
      console.log(err);
    }
    this.setState({'parts': {...parts}});
    this.setState({'dataLoaded': true});
  }

  generateModalControls = (context) => {
    return (
      <div className={classes.modalControls}>
        <div
          onClick={this.toggleModal}
          className={`${classes.materialsButton} ${classes[context]}`}>
          {"Configure Materials"}
        </div>
      </div>
    )
  }

  render(){
    if(this.state.dataLoaded){
      return (
        <div>
          {/* Header */}
          <div>
            <Header
              serverList={this.state.serverList}
              changeActiveServer={this.changeActiveServer}
              activeServer={localStorage.getItem('server')}
            />
          </div>
          {/* Modal controls for mobile view*/}
          {this.generateModalControls("mobileModalControl")}
          {/* Inventory Display */}
          <Inventory
            inventory={this.state.inventory}
            materials={this.state.materials}
            parts={this.state.parts}
          />
          {/* Materials Display Modal */}
          <div>
            <Modal
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
            >
              <Materials
                materials={this.state.materials}
                parts={this.state.parts}
                index={this.state.index}
                changeActiveSource={this.changeActiveSource}
              />
            </Modal>
          </div>
          {/* Modal controls for non-mobile view*/}
          {this.generateModalControls("webModalControl")}
          <div className={classes.footer}>
            <div>{"Made with "}</div>
            <div><img src={horde} alt={"the Horde"} className={classes.horde}/></div>
            <div>{"by "}<a href={"https://github.com/davesignal"}>{"Bozwix @ Mal'Ganis"}</a></div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {/* Header */}
          <div>
            <Header
              changeActiveServer={this.changeActiveServer}
              activeServer={localStorage.getItem('server')}
            />
          </div>
          <div className={classes.spinningCoin}>
            <img src={spinningCoin} alt=""></img>
          </div>
          <div className={classes.loading}>
            {"Fetching auction data..."}
          </div>
          <div className={classes.footer}>
            <div>{"Made with "}</div>
            <div><img src={horde} alt={"the Horde"} className={classes.horde}/></div>
            <div>{"by "}<a href={"https://github.com/davesignal"}>{"Bozwix @ Mal'Ganis"}</a></div>
          </div>
        </div>
      );
    }
  }
}

export default GoblinCapitalist;