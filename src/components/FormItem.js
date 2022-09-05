import React from 'react';
import PropTypes from 'prop-types';
import '../styles/FormItem.css';

class FormItem extends React.Component {
  render() {
    const { handleChange, handleClick } = this.props;
    const array = ['one', 'two', 'three', 'four', 'five'];
    return (
      <form className="form-item-container">
        <h4>Avaliações</h4>
        <input
          className="form-item-input-email"
          type="email"
          name="email"
          data-testid="product-detail-email"
          onChange={ handleChange }
          placeholder="Email"
        />
        <fieldset className="form-item-fieldset">
          <legend>Estrelas</legend>
          {array.map((_, index) => {
            const number = index + 1;
            return (
              <label key={ number } htmlFor={ `${number}-rating` }>
                {number }
                <input
                  className="form-item-input-radio"
                  type="radio"
                  data-testid={ `${number}-rating` }
                  id={ `${number}-rating` }
                  value={ number }
                  name="stars"
                  onChange={ handleChange }
                />
              </label>
            );
          })}
        </fieldset>
        <textarea
          className="form-item-input-textarea"
          data-testid="product-detail-evaluation"
          name="avaliation"
          onChange={ handleChange }
          placeholder="Mensagem (opcional)"
        />

        <button
          className="form-item-input-button"
          type="button"
          data-testid="submit-review-btn"
          onClick={ handleClick }
        >
          Avaliar
        </button>
      </form>
    );
  }
}

FormItem.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FormItem;
