import axios, { type AxiosRequestConfig } from "axios";



const baseUrl = process.env.MONSTRO_API || "http://localhost:3000";
const apiToken = process.env.MONSTRO_API_TOKEN;
const client = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        'LocationId': process.env.LOCATION_ID,
        "Authorization": `Bearer ${apiToken}`
    },
});

export const api = {
    get: <T>(path: string, params?: Record<string, string>) =>
        client.get<T>(path, { params }).then((r) => r.data),

    /** GET with member session cookie token (Monstro `X-Session-Token`). */
    getWithSession: <T>(path: string, sessionToken: string) =>
        client
            .get<T>(path, { headers: { "X-Session-Token": sessionToken } })
            .then((r) => r.data),

    post: <T>(path: string, body?: unknown, config?: AxiosRequestConfig) =>
        client.post<T>(path, body ?? {}, config).then((r) => r.data),

    patch: <T>(path: string, body: unknown) =>
        client.patch<T>(path, body).then((r) => r.data),

    delete: <T>(path: string) =>
        client.delete<T>(path).then((r) => r.data),
};
