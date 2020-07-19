import React, { Component } from "react";
import formatCurrency from "../util";

class Cart extends Component {
  state = {};
  getCartItems = () => {
    return this.props.cartItems.map((item) => {
      return (
        <li key={item._id}>
          <div>
            <img src={item.image} alt={item.title} />
          </div>
          <div>
            <div>{item.title}</div>
            <div className="right">
              {formatCurrency(item.price)} X {item.count}{" "}
              <button
                className="button"
                onClick={() => this.props.onRemove(item)}
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      );
    });
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header"> Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            {" "}
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        <div className="cart">
          <ul className="cart-items">{this.getCartItems()}</ul>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              Total:{" "}
              <div>
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button className="button primary">Proceed</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
