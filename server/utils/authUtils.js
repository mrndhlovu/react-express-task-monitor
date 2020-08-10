const { ROOT_URL } = require("./config");

const getRedirectUrl = (req, token) => {
  const { email } = req.user;
  const referer = req.headers["referer"];

  return `${referer}/#/profile?token=${token}&email=${email}`;
};

const generateAccessCookie = async (res, token) => {
  res.setHeader("Access-Control-Allow-Origin", ROOT_URL);
  res.cookie("access_token", token, {
    maxAge: 9999999,
    httpOnly: true,
  });
  await res.append("Set-Cookie", `access_token="${token}";`);
};

module.exports = { getRedirectUrl, generateAccessCookie };
