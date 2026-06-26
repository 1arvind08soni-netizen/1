const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

const validateClientData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Client name is required');
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push('Phone must be 10 digits');
  }

  return { isValid: errors.length === 0, errors };
};

const validateProductData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Product name is required');
  }

  if (!data.metal_type) {
    errors.push('Metal type is required');
  }

  if (data.weight && isNaN(data.weight)) {
    errors.push('Weight must be a number');
  }

  if (data.buying_price && isNaN(data.buying_price)) {
    errors.push('Buying price must be a number');
  }

  if (data.selling_price && isNaN(data.selling_price)) {
    errors.push('Selling price must be a number');
  }

  return { isValid: errors.length === 0, errors };
};

module.exports = {
  validateEmail,
  validatePhone,
  validateClientData,
  validateProductData
};