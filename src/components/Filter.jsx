import React, { Component } from "react";

class Filter extends Component {
  state = {};
  render() {
    return (
      <div className="filter">
        <div className="filter-sort">
          Sort By:{" "}
          <select value={this.props.sort} onChange={this.props.onSort}>
            <option>Latest</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: Hight to Low</option>
          </select>
        </div>
        <div className="filter-size">
          Size:{" "}
          <select value={this.props.size} onChange={this.props.onFilter}>
            <option value="ALL">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className="filter-result">{this.props.count} Items</div>
      </div>
    );
  }
}

export default Filter;
