/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import formatCurrency from "../util";

class Products extends Component {
  state = {};
  productList() {
    return this.props.products.map((product) => {
      return (
        <li key={product._id}>
          <div className="product">
            <a href="# + {product._id}">
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
            </a>
            <div className="product-price">
              <div>{formatCurrency(product.price)}</div>
              <button className="button primary">Add to Cart</button>
            </div>
          </div>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <ul className="products">{this.productList()}</ul>
      </div>
    );
  }
}

export default Products;
