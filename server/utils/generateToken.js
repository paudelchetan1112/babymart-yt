import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
<<<<<<< HEAD
    expiresIn: '7d'
=======
    expiresIn: "7d",
>>>>>>> 87d58c25cc1dca63f662984feeca7413993234e6
  });
};

export default generateToken;
