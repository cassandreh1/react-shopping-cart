import React, { Component } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  handleFilter = (event) => {
    const {
      target: { value },
    } = event;
    if (value === "") {
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
    const {
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
