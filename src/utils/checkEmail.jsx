function checkEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const email = "example@example.com";
  const isValid = regex.test(email);
  return isValid;
}

export default checkEmail;
