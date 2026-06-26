const { v4: uuidv4 } = require('uuid');

const generateBarcode = () => {
  return `BC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

const generateInvoiceNumber = () => {
  return `INV-${Date.now()}`;
};

const generateQuoteNumber = () => {
  return `QT-${Date.now()}`;
};

const generatePurchaseNumber = () => {
  return `PO-${Date.now()}`;
};

const generateLoanNumber = () => {
  return `LN-${Date.now()}`;
};

module.exports = {
  generateBarcode,
  generateInvoiceNumber,
  generateQuoteNumber,
  generatePurchaseNumber,
  generateLoanNumber
};