import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// components
import Game from './components/Game';
// styles
import './style.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPlayer: '',
      secondPlayer: '',
    };
  }

  onSubmit = (values, { setSubmitting }) => {
    this.setState(() => ({
      firstPlayer: values.firstName,
      secondPlayer: values.secondName,
    }));
    setSubmitting(false);
  };

  validate(names) {
    const errors = {};
    const check = /^[a-z]*$/i;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in names) {
      if (key in names) {
        if (!check.test(names[key])) {
          errors[key] = 'Unacceptable symbols';
        }
        if (names[key].length > 8) {
          errors[key] = 'Max length is 8';
        }
        if (!names[key]) {
          errors[key] = 'Required';
        }
      }
    }
    return errors;
  }

  render() {
    const { firstPlayer, secondPlayer } = this.state;
    const players = firstPlayer && secondPlayer && (
      <div className="players">
        <p>
          Player <b>X</b>: {firstPlayer}
        </p>
        <p>
          Player <b>O</b>: {secondPlayer}
        </p>
      </div>
    );

    return (
      <div>
        <Formik
          initialValues={{ firstName: '', secondName: '' }}
          validate={this.validate}
          onSubmit={this.onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="name-form">
              <Field
                type="text"
                name="firstName"
                placeholder="Name of first player"
              />
              <ErrorMessage
                name="firstName"
                component="span"
                className="error"
              />

              <Field
                type="text"
                name="secondName"
                placeholder="Name of second player"
              />
              <ErrorMessage
                name="secondName"
                component="span"
                className="error"
              />

              <button type="submit" disabled={isSubmitting}>
                Save
              </button>
            </Form>
          )}
        </Formik>

        {players}

        <Game firstPlayer={firstPlayer} secondPlayer={secondPlayer} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
