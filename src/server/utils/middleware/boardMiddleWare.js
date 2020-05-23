const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Board = require("../../models/Board");
const List = require("../../models/List");
const { TOKEN_SIGNATURE, DEFAULT_TEMPLATES } = require("../config");

const viewedRecentMiddleware = async (req, res, next) => {
  const starId = req.query.id;
  const _id = req.params.boardId || starId;
  let user;
  if (!_id) return next();
  try {
    if (starId) user = req.user;
    else {
      const token = req.cookies.access_token;

      const decoded = jwt.verify(token, TOKEN_SIGNATURE);
      user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
    }

    if (!user) throw new Error();

    const isStarred = user.starred.includes(_id);
    const openRecently = user.viewedRecent.includes(_id);
    const shouldAddToRecentViewed = !openRecently && !isStarred;

    if (shouldAddToRecentViewed) user.viewedRecent.unshift(_id);
    else if (isStarred && openRecently)
      user.viewedRecent.splice(user.viewedRecent.indexOf(_id), 1);

    const recent = user.viewedRecent.splice(0, 4);
    user.viewedRecent = recent;

    user.save();
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

const defaultTemplates = async (req, res, next) => {
  try {
    const templates = [];
    DEFAULT_TEMPLATES.map((template) => {
      const newTemplate = new Board({
        title: template.title,
        isTemplate: true,
        description: template.description,
        styleProperties: { color: "#0078be" },
      });

      template.lists.forEach((list) => {
        const newList = new List({ title: list });
        newTemplate.lists.push(newList);
      });

      templates.push(newTemplate);
    });
    req.templates = templates;

    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = { viewedRecentMiddleware, defaultTemplates };
