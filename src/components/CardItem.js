import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/CardItem.css';

class CardItem extends React.Component {
  render() {
    const {
      object: { thumbnail, title, price, id, shipping },
      handleFavorites,
      object } = this.props;

    return (
      <div data-testid="product" className="cart-item-container">
        <p className="cart-item-title">{title}</p>
        <img src={ thumbnail } alt={ title } width="120px" />
        <div className="cart-item-free-shipping">
          { shipping.free_shipping
                  && <p data-testid="free-shipping">Frete Grátis</p> }
        </div>
        <p>{`R$ ${price.toFixed(2)}`}</p>

        <Link
          to={ `/page-item/${id}` }
          data-testid="product-detail-link"
        >
          Mais detalhes

        </Link>
        <button
          type="button"
          onClick={ () => handleFavorites(object) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

CardItem.propTypes = {
  handleFavorites: PropTypes.func.isRequired,
  object: PropTypes.instanceOf(Object).isRequired,
};

export default CardItem;
