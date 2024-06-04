const { verify } = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
      const tokenWithoutBearer = token;
       
      verify(tokenWithoutBearer, "1234qwer", (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid Token"
          });
        } else {
          req.userName = decoded.name;
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access Denied. Token not provided.",
      });
    }
  },
};

