const { ROOT_URL, isDevelopment } = require("./config");

const RedirectUrl = (req, token) => {
  const { email } = req.user;

  return  `${ROOT_URL}/#/profile?token=${token}&email=${email}`
   // : `http://172.31.32.194/#/profile?token=${token}&email=${email}`;
};

const generateAccessCookie = async (res, token) => {
  await res.cookie("access_token", token, {
    maxAge: 9999999,
    httpOnly: true,
  });
};

module.exports = { getRedirectUrl, generateAccessCookie };
