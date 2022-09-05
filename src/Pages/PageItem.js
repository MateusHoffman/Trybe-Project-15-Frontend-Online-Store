import React from 'react';
import PropTypes from 'prop-types';
import ShopButton from '../components/ShopButton';
import FormItem from '../components/FormItem';
import * as api from '../services/api';
import '../styles/PageItem.css';

class PageItem extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      stars: 0,
      avaliation: '',
      comments: [],
      product: [],
      render: false,
    };
  }

  componentDidMount() {
    this.getProductFromAPI();
    const storage = localStorage.getItem('comments');
    if (storage !== null) {
      this.setState({
        comments: JSON.parse(storage),
      });
    }
  }

  getProductFromAPI = async () => {
    // Baseada na resolução no exercício do Guilherme Fernandes (link: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/02-front-end/bloco-12-ciclo-de-vida-de-componentes-e-react-router/dia-01-ciclo-de-vida-de-componentes/exercise-01/src/App.js)
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductsFromId(id);
    this.setState({ product, render: true });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { match: { params: { id } } } = this.props;
    const { email, stars, avaliation } = this.state;
    const object = { id, email, stars, avaliation };
    this.setState((prev) => ({
      comments: [...prev.comments, object],
    }), () => {
      const { comments } = this.state;
      localStorage.setItem('comments', JSON.stringify(comments));
    });
  };

  render() {
    const { match: { params: { id } }, handleFavorites, favorites } = this.props;
    const { comments, product, render } = this.state;
    const commentsFilter = comments.filter((item) => item.id === id);
    const {
      title,
      thumbnail,
      price,
      attributes,
      shipping } = product;
    return (
      <div className="page-item-container">
        <nav className="page-item-container-nav">
          <ShopButton favorites={ favorites } />
        </nav>
        {render && (
          <div className="page-item-container-product">
            <h2 data-testid="product-detail-name">{title}</h2>
            <div className="page-item-container-product-info">
              <div className="page-item-container-product-info-division">
                <img src={ thumbnail } alt={ title } />
                <div className="page-item-free-shipping">
                  { shipping.free_shipping
                  && <p data-testid="free-shipping">Frete Grátis</p> }
                </div>
                <p>{`R$: ${price.toFixed(2)}`}</p>

                <button
                  type="button"
                  onClick={ () => handleFavorites(product) }
                  data-testid="product-detail-add-to-cart"
                >
                  Adicionar ao carrinho
                </button>
              </div>
              <div className="page-item-container-product-info-division">
                <ul>
                  {
                    attributes.map(({ name, value_name: value }, index) => (
                      <li key={ index }>{`${name}: ${value}`}</li>
                    ))
                  }
                </ul>
              </div>
            </div>

            <aside className="page-item-container-form-and-comments">
              <FormItem
                handleChange={ this.handleChange }
                handleClick={ this.handleClick }
              />
              {commentsFilter.length > 0 && (
                <div className="page-item-container-comments">
                  <h4>Avaliações Realizadas</h4>
                  {commentsFilter.length > 0 && commentsFilter.map((item, index) => (
                    <div key={ index } className="page-item-unic-comments">
                      <span>Email: </span>
                      <span>{ item.email }</span>
                      <br />
                      <span>Estrelas: </span>
                      <span>{ item.stars }</span>
                      <br />
                      <span>Comentário: </span>
                      <span>{ item.avaliation }</span>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>
        )}

      </div>
    );
  }
}

PageItem.propTypes = {
  handleFavorites: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  favorites: PropTypes.instanceOf(Array).isRequired,
};

export default PageItem;
