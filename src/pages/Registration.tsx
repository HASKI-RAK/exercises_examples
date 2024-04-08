import React, { useState } from 'react';

type BaseValidationFn = (value: string) => boolean;

const baseValidation: BaseValidationFn = (value) => {
  // Eine Basisvalidierung, die überprüft, ob der Wert nicht leer ist
  return value.trim() !== '';
};

const emailLengthValidator = (validationFunction: BaseValidationFn) => {
  return (value: string) => {
    // Zuerst nutzen wir die ursprüngliche Validierungsfunktion
    const isValidBase = validationFunction(value);
    const isValidLength = value.length <= 50;
    return isValidBase && isValidLength;
  };
};

const emailRegexValidator = (validationFunction: BaseValidationFn) => {
  return (value: string) => {
    // Zuerst nutzen wir die ursprüngliche Validierungsfunktion
    const isValidBase = validationFunction(value);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return isValidBase && isValidEmail;
  };
};

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = emailLengthValidator(emailRegexValidator(baseValidation));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        backgroundColor: '#333333',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #535353',
      }}
    >
      <h2>Registrierung</h2>
      <form>
        <label htmlFor="email">E-Mail:</label>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          style={{ borderColor: isValid ? 'initial' : 'red' }}
        />
        {!isValid && (
          <p style={{ color: 'red' }}>Bitte eine gültige E-Mail-Adresse eingeben.</p>
        )}

        <button onClick={() => alert('Erfolgreich!')} disabled={!isValid}>
          Registrieren
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
