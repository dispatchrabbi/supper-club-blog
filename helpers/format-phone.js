function formatPhone(phone) {
  return phone.replace(/\D+/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
}

module.exports = formatPhone;
