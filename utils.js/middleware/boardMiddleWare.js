const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { TOKEN_SIGNATURE } = require("../config");

const viewedRecentMiddleWare = async (req, res, next) => {
  const _id = req.params.boardId;
  try {
    const token = req.cookies.access_token;

    const decoded = jwt.verify(token, TOKEN_SIGNATURE);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    const isStarred = user.starred.includes(_id);
    const viewedRecent = user.viewedRecent.includes(_id);

    const shouldAddToRecentViewed = !viewedRecent && !isStarred;
    if (shouldAddToRecentViewed) user.viewedRecent.splice(0, 0, _id);
    else if (isStarred && viewedRecent)
      user.viewedRecent.splice(user.viewedRecent.indexOf(_id), 1);

    user.viewedRecent.slice(0, 4);

    user.save();
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = { viewedRecentMiddleWare };
