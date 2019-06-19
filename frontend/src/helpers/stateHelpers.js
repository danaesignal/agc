const stateHelpers = {};

stateHelpers.inventoryTemplate = () => {
  return [
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
  ]
}

stateHelpers.materialsTemplate = () => {
  return {
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
  }
}

stateHelpers.indexTemplate = () => {
  return {
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
}

export default stateHelpers;