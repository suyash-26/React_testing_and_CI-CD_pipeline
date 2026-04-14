import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", ({request}) => {
    console.log(request)
    return HttpResponse.json({name:"Suyash"})
  }),
];