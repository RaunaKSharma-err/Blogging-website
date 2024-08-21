const { verifyToken } = require("../services/authorization");

function checkForAuthenticatedUser(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = verifyToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.log("token verification failed :", error);
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticatedUser,
};
