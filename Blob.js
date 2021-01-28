import React, { Component } from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";

export default class Blob extends Component {
  constructor(props) {
    super(props);
    this.style = props.style;
    this.state = {
      width: props.width,
      height: props.height,
      blobs: this.merge(props.list_of_origins, props.list_of_curve_list),
      scale: props.scale,
    };
  }

  merge(list_of_origins, list_of_curve_list){
    let blobGraphs = [];
    if(list_of_origins.length === list_of_curve_list.length)
    {
        for (let index = 0; index < list_of_origins.length; index++) {
            const origin = list_of_origins[index];
            const curve_list = list_of_curve_list[index];

            blobGraphs.push(new Graph(origin, curve_list));
        }
    }
    return blobGraphs;
}

  render() {
    return (
      <Svg
        width={this.state.width}
        height={this.state.height}
        viewBox={
          "-" +
          this.state.width / 2 +
          " -" +
          this.state.height / 2 +
          " " +
          this.state.width +
          " " +
          this.state.height
        }
      >
        {this.state.blobs.map(blob => 
            <Path d={blob.toString()} scale={this.state.scale} fill={this.style.blob.color} opacity={0.5}/>
        )}
      </Svg>
    );
  }
}

Blob.propType = {
  style: PropTypes.object,
  list_of_origins: PropTypes.arrayOf(PropTypes.instanceOf(Origin)).isRequired,
  list_of_curve_list: PropTypes.arrayOf(PropTypes.arrayOf(Curve)).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

class Graph {
    constructor(origin, curve_list)
    {
        this.origin = origin;
        this.curve_list = curve_list;
    }

    toString(){
        return this.origin.toString() + this.curve_list.map(curve =>curve.toString());
    }
}

export class Curve {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  static toPoint(o1, o2) {
    let x1 = o1;
    let y1 = o2;
    let x3 = o1;
    let y3 = o2;

    return "S" + x1 + " " + y1 + " " + x3 + " " + y3 + " ";
  }

  toString() {
    return (
      "C" +
      this.x1 +
      " " +
      this.y1 +
      " " +
      this.x2 +
      " " +
      this.y2 +
      " " +
      this.x3 +
      " " +
      this.y3 +
      " "
    );
  }
}

export class Origin {
  constructor(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
  }
  toString() {
    return "M" + this.x1 + " " + this.y1 + " ";
  }
}
