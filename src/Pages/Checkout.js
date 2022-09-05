import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Checkout.css';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      cep: '',
      phone: '',
      adress: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    this.setState({
      fullname: '',
      email: '',
      cpf: '',
      cep: '',
      phone: '',
      adress: '',
    });
  }

  render() {
    const { favorites } = this.props;
    const {
      fullname,
      email,
      cpf,
      cep,
      phone,
      adress,
    } = this.state;
    const favoritesFilter = favorites.reduce((acc, curr) => {
      if (!acc.some((item) => item.id === curr.id)) acc.push(curr);
      return acc;
    }, []);
    const total = favorites.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    return (
      <div className="checkout-container">
        <section className="checkout-products-container">
          {favoritesFilter.map((item) => (
            <div key={ item.id } className="checkout-product">
              <img src={ item.thumbnail } alt={ item.title } width="120px" />
              <p>{item.title}</p>
              <p>{`R$ ${item.price.toFixed(2)}`}</p>
            </div>
          ))}
        </section>
        <h3 className="checkout-total-price">
          {`Valor total da compra : R$${total.toFixed(2)}`}
        </h3>
        <form className="checkout-forms-container">
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome Completo"
            name="fullname"
            value={ fullname }
            onChange={ this.handleChange }
            className="input"
          />
          <input
            data-testid="checkout-email"
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            className="input"
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
            onChange={ this.handleChange }
            className="input"
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
            name="cep"
            value={ cep }
            onChange={ this.handleChange }
            className="input"
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
            name="phone"
            value={ phone }
            onChange={ this.handleChange }
            className="input"
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
            name="adress"
            value={ adress }
            onChange={ this.handleChange }
            className="input"
          />
          <fieldset className="checkout-forms-fieldset">
            <legend>Método de Pagamento:</legend>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                name="payment"
                value="boleto"
                id="boleto"
              />
            </label>
            <label htmlFor="card">
              Cartão
              <input
                type="radio"
                name="payment"
                value="card"
                id="card"
              />
            </label>
            <label htmlFor="pix">
              Pix
              <input
                type="radio"
                name="payment"
                value="pix"
                id="pix"
              />
            </label>
          </fieldset>
        </form>
        <button
          type="button"
          className="checkout-button"
          onClick={ this.handleClick }
        >
          Finalizar Compra
        </button>
      </div>
    );
  }
}

Checkout.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
};

export default Checkout;
