/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  productList() {
    return this.props.products.map((product) => {
      return (
        <li key={product._id}>
          <div className="product">
            <a
              href="# + {product._id}"
              onClick={() => {
                this.openModal(product);
              }}
            >
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
            </a>
            <div className="product-price">
              <div>{formatCurrency(product.price)}</div>
              <button
                onClick={() => {
                  this.props.onAddtoCart(product);
                }}
                className="button primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </li>
      );
    });
  }
  componentWillMount() {
    Modal.setAppElement("body");
  }
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {!this.props.products ? <div>Loading...</div> : this.productList()}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes:{" "}
                    {product.availableSizes.map((item) => {
                      return (
                        <span key={item}>
                          {" "}
                          <button className="button">{item}</button>
                        </span>
                      );
                    })}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.onAddtoCart(product);
                        this.closeModal();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products.items,
  }),
  {
    fetchProducts,
  }
)(Products);
