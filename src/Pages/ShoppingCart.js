import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ShoppingCart.css';

class ShoppingCart extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/checkout');
  }

  render() {
    const { favorites, handleSizeMais, handleSizeMenos, handleRemove } = this.props;
    const favoritesFilter = favorites.reduce((acc, curr) => {
      if (!acc.some((item) => item.id === curr.id)) acc.push(curr);
      return acc;
    }, []);
    const total = favorites.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    return (
      <main className="shopping-cart-main">
        {favorites.length > 0 ? (
          <div className="shopping-cart-container">
            {favoritesFilter.map((element, index) => (
              <div key={ index } className="shopping-cart-product">
                <button
                  type="button"
                  onClick={ () => handleRemove(element) }
                >
                  X
                </button>
                <img src={ element.thumbnail } alt={ element.title } width="120px" />
                <p
                  data-testid="shopping-cart-product-name"
                  className="shopping-cart-product-name"
                >
                  {element.title}
                </p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => handleSizeMenos(element) }
                >
                  -
                </button>
                <p
                  data-testid="shopping-cart-product-quantity"
                  className="shopping-cart-product-quantity"
                >
                  {favorites.filter(({ id }) => id === element.id).length}
                </p>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => handleSizeMais(element) }
                >
                  +
                </button>
                <p className="shopping-cart-product-price">
                  {`R$: ${element.price.toFixed(2)}`}
                </p>
              </div>
            ))}
            <h3 className="shopping-cart-total-price">
              {`Valor total da compra : R$${total.toFixed(2)}`}
            </h3>
            <button
              type="button"
              className="shopping-cart-product-buy"
              data-testid="checkout-products"
              onClick={ this.handleClick }
            >
              Finalizar Compra
            </button>
          </div>
        ) : (
          <h2
            data-testid="shopping-cart-empty-message"
            className="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h2>
        )}
      </main>
    );
  }
}

ShoppingCart.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
  handleSizeMais: PropTypes.func.isRequired,
  handleSizeMenos: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default ShoppingCart;
