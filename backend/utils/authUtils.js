const { ROOT_URL } = require("./config");

const getRedirectUrl = (req, token) => {
  const { email } = req.user;

  return `${ROOT_URL}/#/profile?token=${token}&email=${email}`;
};

const generateAccessCookie = async (res, token) => {
  const options = {
    maxAge: 3600 * 1000,
    httpOnly: true,
  };

  res.cookie("access_token", token, options);
};

module.exports = { getRedirectUrl, generateAccessCookie };
