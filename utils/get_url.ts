const isServerSide = typeof window === "undefined";

export function getServerURL() {
    const SERVER_URL = isServerSide ? process.env.SERVER_URL : window.location.origin;
    return SERVER_URL;
}
