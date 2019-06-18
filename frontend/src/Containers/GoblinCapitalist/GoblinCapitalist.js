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

class GoblinCapitalist extends Component{
  async componentDidMount(){

  // Set the server being queried. Either a stored user choice, or Mal'Ganis.
    const server = sessionStorage.getItem('server') === null ? 'malganis'
      : sessionStorage.getItem('server');
      sessionStorage.setItem('server', server);

    // Loading in the initial data for the application.
    this.changeActiveServer(server);
  }
  state = {
    'showModal': false,
    'inventory': [
      // An array of the stuff that's actually being sold.
      {
        'itemId': 141446,
        'materials': [
          // This is a list of material components needed for the item
          // Cheap vendor materials aren't included, nor are unsellable items.
          // 0: ItemID for material; 1: Amount necessary
          [129034, 1]
        ],
        'display': 'Tome of the Tranquil Mind'
      },
      {
        'itemId': 153647,
        'materials': [
          [158188, 5],
          [158187, 10]
        ],
        'display': 'Tome of the Quiet Mind'
      },
      {
        'itemId': 165692,
        'materials': [
          [158189, 6],
          [158187, 25]
        ],
        'display': "Vantus Rune: Battle of Dazar'alor"
      },
      {
        'itemId': 165733,
        'materials': [
          [158189, 6],
          [158187, 25]
        ],
        'display': "Vantus Rune: Crucible of Storms"
      },
      {
        'itemId': 153662,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: Order of Embers"
      },
      {
        'itemId': 153661,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: Proudmoore Admirality"
      },
      {
        'itemId': 153663,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: Storm's Wake"
      },
      {
        'itemId': 165016,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: 7th Legion"
      },
      {
        'itemId': 153665,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Talanji's Expedition"
      },
      {
        'itemId': 153666,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: Voldunai"
      },
      {
        'itemId': 153664,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: Zandalari Empire"
      },
      {
        'itemId': 165017,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: The Honorbound"
      },
      {
        'itemId': 153668,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: Champions of Azeroth"
      },
      {
        'itemId': 153667,
        'materials': [
          [158188, 5],
          [158187, 12]
        ],
        'display': "Contract: Tortollan Seekers"
      },
      {
        'itemId': 164682,
        'materials': [
          [158189, 10],
          [158187, 40]
        ],
        'display': "Sinister Gladiator's Etched Vessel"
      },
      {
        'itemId': 158202,
        'materials': [
          [158188, 8]
        ],
        'display': "War-Scroll of Battle Shout"
      },
      {
        'itemId': 158201,
        'materials': [
          [158188, 8]
        ],
        'display': "War-Scroll of Intellect"
      },
      {
        'itemId': 158204,
        'materials': [
          [158188, 8]
        ],
        'display': "War-Scroll of Fortitude"
      }
    ],
    'materials': {
      129034: {
        // partSources is an array of items (parts) which can be refined
        // into the material in question. If an item cannot be refined from another
        // item, it only has one partSource: itself. All items possess themself
        // as a partSource, because you can just go buy the item directly from
        // the auction house.
        'partSources': [
          {
            // 0: Price, 1: Quantity
            'parts': [[129034, 1]],
            'display': "Sallow Pigment"
          },
          {
            'parts': [[129034, 0.47]],
            'display': "Felwort (Milling)"
          },
          {
            'parts': [[151565, 6.25]],
            'display': "Astral Glory (Milling)"
          },
        ],
        // The index of whichever partSource is currently being utilized is
        // stored in the activeSource attribute.
        'activeSource': 0
      },
      158188: {
        'partSources': [
          {
            'parts': [[158188, 1]],
            'display': "Crimson Ink"
          },
          {
            'parts': [[153636, 1]],
            'display': "Crimson Pigment"
          },
          {
            'parts': [[152505, 3.125]],
            'display': "Riverbud (Milling)"
          },
          {
            'parts': [[152511, 3.125]],
            'display': "Sea Stalk (Milling)"
          },
          {
            'parts': [[152506, 3.125]],
            'display': "Star Moss (Milling)"
          },
          {
            'parts': [[152507, 3.125]],
            'display': "Akunda's Bite (Milling)"
          },
          {
            'parts': [[152508, 3.125]],
            'display': "Winter's Kiss (Milling)"
          },
          {
            'parts': [[152509, 3.125]],
            'display': "Siren's Pollen (Milling)"
          },
          {
            'parts': [[152510, 3.125]],
            'display': "Anchor Weed (Milling)"
          }
        ],
        'activeSource': 0
      },
      158187: {
        'partSources': [
          {
            'parts': [[158187, 1]],
            'display': "Ultramarine Ink"
          },
          {
            'parts': [[153635, 1]],
            'display': "Ultramarine Pigment"
          },
          {
            'parts': [[152505, 1.21]],
            'display': "Riverbud (Milling)"
          },
          {
            'parts': [[152511, 1.21]],
            'display': "Sea Stalk (Milling)"
          },
          {
            'parts': [[152506, 1.21]],
            'display': "Star Moss (Milling)"
          },
          {
            'parts': [[152507, 1.21]],
            'display': "Akunda's Bite (Milling)"
          },
          {
            'parts': [[152508, 1.21]],
            'display': "Winter's Kiss (Milling)"
          },
          {
            'parts': [[152509, 1.21]],
            'display': "Siren's Pollen (Milling)"
          },
          {
            'parts': [[152510, 1.21]],
            'display': "Anchor Weed (Milling)"
          }
        ],
        'activeSource': 0
      },
      158189: {
        'partSources': [
          {
            'parts': [[158189, 1]],
            'display': "Viridescent Ink"
          },
          {
            'parts': [[153669, 1]],
            'display': "Viridescent Pigment"
          },
          {
            'parts': [[152505, 7.7]],
            'display': "Riverbud (Milling)"
          },
          {
            'parts': [[152511, 7.7]],
            'display': "Sea Stalk (Milling)"
          },
          {
            'parts': [[152506, 7.7]],
            'display': "Star Moss (Milling)"
          },
          {
            'parts': [[152507, 7.7]],
            'display': "Akunda's Bite (Milling)"
          },
          {
            'parts': [[152508, 7.7]],
            'display': "Winter's Kiss (Milling)"
          },
          {
            'parts': [[152509, 7.7]],
            'display': "Siren's Pollen (Milling)"
          },
          {
            'parts': [[152510, 3.03]],
            'display': "Anchor Weed (Milling)"
          }
        ],
        'activeSource': 0
      },
    },
    'index': {
      124106: "Felwort",
      151565: "Astral Glory",
      129034: "Sallow Pigment",
      153636: "Crimson Pigment",
      153635: "Ultramarine Pigment",
      158188: "Crimson Ink",
      158187: "Ultramarine Ink",
      153669: "Viridescent Pigment",
      158189: "Viridescent Ink",
      153647: "Tome of the Quiet Mind",
      141446: "Tome of the Tranquil Mind",
      165692: "Vantus Rune: Battle of Dazar'alor",
      165733: "Vantus Rune: Crucible of Storms",
      153662: "Contract: Order of Embers",
      153661: "Contract: Proudmoore Admirality",
      153663: "Contract: Storm's Wake",
      165016: "Contract: 7th Legion",
      153665: "Contract: Talanji's Expedition",
      153666: "Contract: Voldunai",
      153664: "Contract: Zandalari Empire",
      165017: "Contract: The Honorbound",
      153668: "Contract: Champions of Azeroth",
      153667: "Contract: Tortollan Seekers",
      164682: "Sinister Gladiator's Etched Vessel",
      158202: "War Scroll of Battle Shout",
      158201: "War Scroll of Intellect",
      158204: "War Scroll of Fortitude",
      152505: "Riverbud",
      152511: "Sea Stalk",
      152506: "Star Moss",
      152507: "Akunda's Bite",
      152508: "Winter's Kiss",
      152509: "Siren's Pollen",
      152510: "Anchor Weed"
    }
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

    const parts = {};
    const partList = [
      124106,
      151565,
      129034,
      153636,
      153635,
      158188,
      158187,
      153669,
      158189,
      153647,
      141446,
      165692,
      165733,
      153662,
      153661,
      153663,
      165016,
      153665,
      153666,
      153664,
      165017,
      153668,
      153667,
      164682,
      158202,
      158201,
      158204,
      152505,
      152511,
      152506,
      152507,
      152508,
      152509,
      152510
    ]

    sessionStorage.setItem('server', server);

    await Promise.all(
      partList.map(async (part) => {
        try{
          // Priming the pump to ensure we have fresh data..
          // await fetch(`/auction/${server}/${part}`, {
            // 'headers' : {
              // 'Content-Type': 'application/json',
              // 'Accept': 'application/json'
            // }
          // });
          let response = await fetch(`/auction/${server}/${part}`, {
            'headers' : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          let jsonResponse = await response.json();
          parts[part] = await jsonResponse.buyout;
        }
        catch(err){
          // The most likely scenario for hitting this block is if there is no
          // instances of the item in question for sale. In such an event, the
          // item's value is given as zero-- there is no amount of money that can
          // buy an item that isn't for sale and demand for it is clearly so low
          // that nobody else is trying to sell it, making it effectively worthless.
          parts[part] = 0;
        }
      })
    ).then( () => {
      this.setState({'parts': {...parts}});
      this.setState({'dataLoaded': true});
    })
  }

  generateModalControls = (context) => {
    return (
      <div className={classes.modalControls}>
        <div
          onClick={this.toggleModal}
          className={`${classes.materialsButton} ${classes[context]}`}>
          Configure Materials
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
              changeActiveServer={this.changeActiveServer}
              activeServer={sessionStorage.getItem('server')}
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
            <div>Made with </div>
            <div><img src={horde} alt={"the Horde"} className={classes.horde}/></div>
            <div> by <a href={"https://github.com/davesignal"}>Bozwix @ Mal'Ganis</a></div>
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
              activeServer={sessionStorage.getItem('server')}
            />
          </div>
          <div className={classes.spinningCoin}>
            <img src={spinningCoin} alt=""></img>
          </div>
          <div className={classes.loading}>
            Fetching auction data...
          </div>
          <div className={classes.footer}>
            <div>Made with </div>
            <div><img src={horde} alt={"the Horde"} className={classes.horde}/></div>
            <div> by <a href={"https://github.com/davesignal"}>Bozwix @ Mal'Ganis</a></div>
          </div>
        </div>
      );
    }
  }
}

export default GoblinCapitalist;