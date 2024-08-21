const jwt = require("jsonwebtoken");
const secretKey = "try@g@inl@ter";

function createTokenForUser(user) {
  const payLoad = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePicUrl: user.profilePicUrl,
    role: user.role,
  };
  const token = jwt.sign(payLoad, secretKey);
  return token;
}

function verifyToken(token) {
  const payload = jwt.verify(token, secretKey);
  if (!payload) throw new Error("payload is undefined");
  return payload;
}

module.exports = {
  createTokenForUser,
  verifyToken,
};
