// Imported bcryptjs Method ===========>
import { compare, hash } from "bcryptjs";

// For hash password
const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
// For verify password
const verifyPassword = async (password, hashPass) => {
  return !(await compare(password, hashPass)) ? false : true;
};

export { hashPassword, verifyPassword };
