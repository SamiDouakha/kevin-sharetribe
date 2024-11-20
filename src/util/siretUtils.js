// src/util/siretUtils.js
export const formatSiret = value => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 14) {
    return onlyNums.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, '$1 $2 $3 $4');
  }
  return onlyNums.slice(0, 14).replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, '$1 $2 $3 $4');
};

export const validateSiret = (value, requiredMessage, invalidMessage) => {
  if (!value) {
    return requiredMessage;
  }

  const siret = value.replace(/\s/g, '');
  if (!/^\d{14}$/.test(siret)) {
    return invalidMessage;
  }

  // Algorithme de Luhn pour la validation du SIRET
  let sum = 0;
  let double = false;
  for (let i = siret.length - 1; i >= 0; i--) {
    let digit = parseInt(siret.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    double = !double;
  }

  if (sum % 10 !== 0) {
    return invalidMessage;
  }

  return null;
};

