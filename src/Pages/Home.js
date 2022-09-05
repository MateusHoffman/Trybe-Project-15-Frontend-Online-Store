import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShopButton from '../components/ShopButton';
import CardItem from '../components/CardItem';
// import Slider from '../components/Slider';
import '../styles/Home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      hidden: true,
    };
  }

  changeHidden = () => {
    const { hidden } = this.state;
    this.setState({
      hidden: !hidden,
    });
  }

  render() {
    // const { hidden } = this.state;
    const {
      categoriaList,
      productList,
      handleChange,
      handleRadio,
      handleClick,
      filtrar,
      favorites,
      handleFavorites } = this.props;
    return (
      <div className="home-container">
        { categoriaList.length > 0 && (
          <nav className="home-nav-content">
            {categoriaList.map(({ id, name }) => (
              <label key={ id } htmlFor={ id } className="label-nav-content">
                <input
                  className="home-input-category"
                  id={ id }
                  type="radio"
                  name="categoriaId"
                  data-testid="category"
                  onChange={ handleRadio }
                  value={ id }
                />
                {name}
              </label>
            ))}
          </nav>
        ) }
        <div className="home-content">
          <div className="home-header-content">
            <div className="home-input-content">

              <input
                className="home-input-text"
                type="text"
                data-testid="query-input"
                name="query"
                onChange={ handleChange }
              />
              <input
                className="home-input-button"
                type="button"
                data-testid="query-button"
                value="Filtrar"
                onClick={ handleClick }
              />
            </div>
            <ShopButton favorites={ favorites } />
          </div>
          { filtrar && (
            <div className="home-container-product-list">
              {
                productList.length > 0 ? (
                  <div className="home-product-list">
                    { productList.map((produto) => (
                      <CardItem
                        key={ produto.id }
                        handleFavorites={ handleFavorites }
                        object={ produto }
                      />
                    ))}
                  </div>
                ) : (
                  <h3>Nenhum produto foi encontrado</h3>
                )
              }
            </div>
          ) }
        </div>
        {/* <div>
          <button type="button" onClick={ this.changeHidden } className="reset-button">
            <span className="material-symbols-outlined">
              menu_open
            </span>
          </button>
          <Slider
            favorites={ favorites }
            hidden={ hidden }
            changeHidden={ this.changeHidden }
          />
        </div> */}
      </div>
    );
  }
}

Home.propTypes = {
  categoriaList: PropTypes.instanceOf(Array).isRequired,
  productList: PropTypes.instanceOf(Array).isRequired,
  filtrar: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRadio: PropTypes.func.isRequired,
  handleFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.instanceOf(Array).isRequired,
};

export default Home;
