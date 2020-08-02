const { ROOT_URL } = require("./config");

const getRedirectUrl = (email, token) =>
  `${ROOT_URL}/#/profile?token=${token}&email=${email}`;

const generateAccessCookie = async (res, token) => {
  res.setHeader("Access-Control-Allow-Origin", ROOT_URL);
  res.cookie("access_token", token, {
    maxAge: 9999999,
    httpOnly: true,
  });
  await res.append("Set-Cookie", `access_token="${token}";`);
};

module.exports = { getRedirectUrl, generateAccessCookie };
