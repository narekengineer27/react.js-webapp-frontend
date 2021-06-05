const isEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPasswordValid = password => password.length >= 8;

export { isEmail, isPasswordValid };
