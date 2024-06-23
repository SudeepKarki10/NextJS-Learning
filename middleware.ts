import middleware from "next-auth/middleware";

export default middleware;

export const config = {
  //* : zero or more path after users along with users as well
  //+ : one or more path after users along with users as well
  //? : zero or one path after users along with users as well
  matcher: ["/users/:id*"],
};
