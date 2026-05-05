const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function fetchApi(path: string, options: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include", // pass cookies with the request without this bacned may send cokkie but front end wont tbe able to store send the cookies on the request
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}

export async function fetchMe(path: string, accessToken: any) {
  return fetch(`${API_URL}${path}`, {
    headers: {
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
    cache:'no-store'
  });
}
