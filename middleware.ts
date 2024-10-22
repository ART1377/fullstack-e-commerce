export { auth as middleware } from "@/app/auth";

// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("auth/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });