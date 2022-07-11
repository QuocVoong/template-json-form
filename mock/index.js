const casual = require('casual');

module.exports = () => {
  const data = { users: [] }
  for (let i = 0; i < 1000; i++) {
    data.users.push({ id: i, firstName: casual.first_name, lastName: casual.last_name, email: casual.email, phone: casual.phone, country: casual.country })
  }
  return data
}