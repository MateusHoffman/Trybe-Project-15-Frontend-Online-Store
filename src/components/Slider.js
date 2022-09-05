import React from 'react';
import '../styles/Slider.css';
import PropTypes from 'prop-types';

class Slider extends React.Component {
  render() {
    const { favorites, hidden, changeHidden } = this.props;
    const favoritesFilter = favorites.reduce((acc, curr) => {
      if (!acc.some((item) => item.id === curr.id)) acc.push(curr);
      return acc;
    }, []);
    return (
      <div className={ JSON.stringify(hidden) }>
        <div className="slider-header-content">
          <button type="button" onClick={ changeHidden }>
            <span className="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
        { favoritesFilter.length > 0 ? (
          <ul className="slider-products">
            {favoritesFilter.map((item) => (
              <li key={ item.id } className="slider-product">
                <img src={ item.thumbnail } alt={ item.title } width="120px" />
                <div>
                  <p>
                    {item.title}
                  </p>
                  <p>
                    {`Quantidade: ${favorites.filter(({ id }) => id === item.id).length}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h3 className="slider-paragrafo"> Seu carrinho está vazio</h3>
        )}
      </div>
    );
  }
}

Slider.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
  hidden: PropTypes.bool.isRequired,
  changeHidden: PropTypes.func.isRequired,
};

export default Slider;
