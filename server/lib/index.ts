/**
 * @description create a function that will return string that include 9 numbers with prefix "a" if user is admin
 * and "s" if user is student and "t" if user is teacher
 * */
export const generateUserID = (userType: "admin" | "student" | "teacher") => {
  let prefix = "";
  if (userType === "admin") {
    prefix = "a";
  } else if (userType === "student") {
    prefix = "s";
  } else if (userType === "teacher") {
    prefix = "t";
  }
  return `${prefix}${Math.floor(10_000_000 + Math.random() * 90_000_000).toString()}`;
};
