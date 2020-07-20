import React, { Component } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }
  createOrder = (order) => {
    alert("Need to save order for  +" + order.name);
  };
  handleRemove = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((item) => item._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item._id !== product._id))
    );
  };

  handleAddToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let isInCart = false;

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        isInCart = true;
      }
    });
    if (!isInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({
      cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  handleFilter = (event) => {
    let {
      target: { value },
    } = event;
    if (value === "ALL") {
      this.setState({
        size: value,
        products: data.products,
      });
    } else {
      this.setState({
        size: value,
        products: data.products.filter((product) => {
          return product.availableSizes.indexOf(value) >= 0;
        }),
      });
    }
  };

  handleSort = (event) => {
    let {
      target: { value },
    } = event;
    // TO DO: More research on passing the state as the first parameter and sort function
    this.setState((state) => ({
      sort: value,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          value === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : value === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  render() {
    return (
      <div className="grid-container">
        <header className="App-header">
          <a href="/"> React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                onFilter={this.handleFilter}
                onSort={this.handleSort}
              />
              <Products
                products={this.state.products}
                onAddtoCart={this.handleAddToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                onRemove={this.handleRemove}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
