import React, { Component, Fragment } from "react";

class Engraving extends Component {
  state = {
    showPanel: false,
    font: 'Lucida Sans',
    input: {
      value: '',
      length: 20
    },
    charLength: 0,
    inscription: [],
    charStyle1: [
      [
        {transform: `translateX(0) translateY(0) rotate(0deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`}
      ],
      [
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`}
      ],
      [
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`}
      ],
      [
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`}
      ],
      [
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`}
      ],
      [
        {transform: `translateX(0) translateY(2px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(6deg)`}
      ],
      [
        {transform: `translateX(0) translateY(3px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`}
      ],
      [
        {transform: `translateX(0) translateY(4px) rotate(-7deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(6deg)`},
        {transform: `translateX(0) translateY(4px) rotate(7deg)`}
      ],
      [
        {transform: `translateX(0) translateY(5px) rotate(-8deg)`},
        {transform: `translateX(0) translateY(3px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`},
        {transform: `translateX(0) translateY(5px) rotate(8deg)`}
      ],
      [
        {transform: `translateX(0) translateY(5px) rotate(-8deg)`},
        {transform: `translateX(0) translateY(4px) rotate(-7deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(6deg)`},
        {transform: `translateX(0) translateY(4px) rotate(7deg)`},
        {transform: `translateX(0) translateY(5px) rotate(8deg)`}
      ],
      [
        {transform: `translateX(0) translateY(6px) rotate(-9deg)`},
        {transform: `translateX(0) translateY(5px) rotate(-8deg)`},
        {transform: `translateX(0) translateY(4px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`},
        {transform: `translateX(0) translateY(5px) rotate(8deg)`},
        {transform: `translateX(0) translateY(6px) rotate(9deg)`}
      ],
      [
        {transform: `translateX(0) translateY(7px) rotate(-10deg)`},
        {transform: `translateX(0) translateY(5px) rotate(-8deg)`},
        {transform: `translateX(0) translateY(4px) rotate(-7deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(6deg)`},
        {transform: `translateX(0) translateY(4px) rotate(7deg)`},
        {transform: `translateX(0) translateY(5px) rotate(8deg)`},
        {transform: `translateX(0) translateY(7px) rotate(10deg)`}
      ],
      [
        {transform: `translateX(0) translateY(8px) rotate(-10deg)`},
        {transform: `translateX(0) translateY(6px) rotate(-9deg)`},
        {transform: `translateX(0) translateY(5px) rotate(-8deg)`},
        {transform: `translateX(0) translateY(3px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`},
        {transform: `translateX(0) translateY(5px) rotate(8deg)`},
        {transform: `translateX(0) translateY(6px) rotate(9deg)`},
        {transform: `translateX(0) translateY(8px) rotate(10deg)`}
      ],
      [
        {transform: `translateX(0) translateY(9px) rotate(-11deg)`},
        {transform: `translateX(0) translateY(7px) rotate(-10deg)`},
        {transform: `translateX(0) translateY(5px) rotate(-8deg)`},
        {transform: `translateX(0) translateY(4px) rotate(-7deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`},
        {transform: `translateX(0) translateY(4px) rotate(7deg)`},
        {transform: `translateX(0) translateY(5px) rotate(8deg)`},
        {transform: `translateX(0) translateY(7px) rotate(10deg)`},
        {transform: `translateX(0) translateY(9px) rotate(11deg)`}
      ],
      [
        {transform: `translateX(0) translateY(10px) rotate(-11deg)`},
        {transform: `translateX(0) translateY(8px) rotate(-10deg)`},
        {transform: `translateX(0) translateY(6px) rotate(-9deg)`},
        {transform: `translateX(0) translateY(5px) rotate(-8deg)`},
        {transform: `translateX(0) translateY(3px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`},
        {transform: `translateX(0) translateY(5px) rotate(8deg)`},
        {transform: `translateX(0) translateY(6px) rotate(9deg)`},
        {transform: `translateX(0) translateY(8px) rotate(10deg)`},
        {transform: `translateX(0) translateY(10px) rotate(11deg)`}
      ],
    ],
    charStyle2: [
      [
        {transform: `translateX(0) translateY(0) rotate(0deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`}
      ],
      [
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`}
      ],
      [
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`}
      ],
      [
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`}
      ],
      [
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`}
      ],
      [
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`}
      ],
      [
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`}
      ],
      [
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`}
      ],
      [
        {transform: `translateX(0) translateY(3px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`}
      ],
      [
        {transform: `translateX(0) translateY(3px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0px) rotate(2deg)`},
        {transform: `translateX(0) translateY(1px) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`}
      ],
      [
        {transform: `translateX(0) translateY(3px) rotate(-7deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`},
        {transform: `translateX(0) translateY(4px) rotate(7deg)`}
      ],
      [
        {transform: `translateX(0) translateY(4px) rotate(-7deg)`},
        {transform: `translateX(0) translateY(3px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`},
        {transform: `translateX(0) translateY(3px) rotate(7deg)`},
        {transform: `translateX(0) translateY(4px) rotate(7deg)`}
      ],
      [
        {transform: `translateX(0) translateY(4px) rotate(-7deg)`},
        {transform: `translateX(0) translateY(3px) rotate(-6deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(2px) rotate(-5deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(1px) rotate(-4deg)`},
        {transform: `translateX(0) translateY(0) rotate(-3deg)`},
        {transform: `translateX(0) translateY(0) rotate(-2deg)`},
        {transform: `translateX(0) translateY(0) rotate(-1deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(0deg)`},
        {transform: `translateX(0) translateY(0) rotate(1deg)`},
        {transform: `translateX(0) translateY(0) rotate(2deg)`},
        {transform: `translateX(0) translateY(0) rotate(3deg)`},
        {transform: `translateX(0) translateY(1px) rotate(4deg)`},
        {transform: `translateX(0) translateY(2px) rotate(5deg)`},
        {transform: `translateX(0) translateY(3px) rotate(6deg)`},
        {transform: `translateX(0) translateY(3px) rotate(7deg)`},
        {transform: `translateX(0) translateY(4px) rotate(7deg)`}
      ],
    ]
  };
  fontInput1 = React.createRef();
  fontInput2 = React.createRef();

  togglePanel = () => {
    this.setState((state) => {
      return {
        showPanel: !state.showPanel
      }
    })
  };

  ckeckLength = ({ target }) => {
    let inputValue = target.value;
    let inputLength =  20 - target.value.length;
    const inscription = inputValue.split('');

    this.setState((state) => {
      return {
        ...state,
        input: {
          value: inputValue,
          length: inputLength
        },
        charLength: target.value.length,
        inscription
      }
    });
  };

  findStyle = (arr, length, index) => {
    return arr[length][index]
  };

  clickSave = () => {
    const font = this.state.font.replace(/\s/g, '');
    this.props.handleSave(this.state.input.value, font);
    this.togglePanel();
  };

  handleFont = ({ target }) => {
    this.setState((state) => {
      return {
        ...state,
        font: target.value
      }
    });
  };

  render() {
    const {
      showPanel,
      font,
      input: { length },
      inscription,
      charLength,
      charStyle1
    } = this.state;

    const checkPaddingTop = {
      paddingTop: font === 'Lucida Sans' ? '32px' : '33px'
    };

    const lineHeight = font === 'Lucida Sans' ? '25px' : '27px';
    const fontSize = font === 'Lucida Sans' ? '16px' : '17px';
    const letterSpacing = font === 'Lucida Sans' ? '1px' : '2px';

    const checkFontStyle = {
      fontFamily: font,
      fontSize,
      lineHeight,
      letterSpacing,
      whiteSpace: 'nowrap',
      textShadow: 'rgb(227, 227, 227) 1px 1px'
    };

    return (
        <Fragment>
          <p
              className="product-engraving__title"
              onClick={this.togglePanel}>
            Open engraving panel
          </p>
          <div className={'engraving-panel ' + (showPanel ? 'open' : '')}>
            <div className="engraving-panel__header">
              <div className="space-between">
                <span>Enter Inscription</span>
                <div
                    className="close-panel"
                    onClick={this.togglePanel}>
                  <svg x="0px" y="0px" viewBox="0 0 47.971 47.971">
                    <g>
                      <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                        c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                        C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                        s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                    </g>
                  </svg>
                </div>
              </div>
              <input
                  type="text"
                  className="engraving-input"
                  maxLength="20"
                  onInput={this.ckeckLength} />
              <span className="count-text">Characters Left: {length}</span>
            </div>
            <div className="engraving-panel__body">
              <span>Choose font</span>
              <div className="choose-font">
                <input
                    aria-label="Lucida Sans"
                    src="https://ion.r2net.com/images/font_1.gif"
                    type="image"
                    value="Lucida Sans"
                    ref={this.fontInput1}
                    onClick={this.handleFont}
                    className={`input-font ${font === 'Lucida Sans' ? 'selected' : ''}`} />
                <input
                    aria-label='Snell Roundhand Black'
                    src="https://ion.r2net.com/images/font_2.gif"
                    type="image"
                    value="Snell Roundhand Black"
                    ref={this.fontInput2}
                    onClick={this.handleFont}
                    className={`input-font ${font === 'Snell Roundhand Black' ? 'selected' : ''}`} />
              </div>
            </div>
            <div className="engraving-panel__footer">
              <span className="preview-title">Preview</span>
              <div className="preview-img" style={checkPaddingTop}>
              <span className="engraving-text" style={checkFontStyle}>
                {
                  inscription.map((char, index) => {
                    return (
                        <span
                            key={index}
                            style={this.findStyle(charStyle1, charLength - 1, index)}
                            className={` span-inner char_${index + 1}`}>
                        {char.replace(/ /g, "\u00a0")}
                      </span>
                    )
                  })
                }
              </span>
              </div>
              <span className="save-inscription" onClick={this.clickSave}>SAVE</span>
            </div>
          </div>
        </Fragment>
    )
  }
}

export default Engraving;
