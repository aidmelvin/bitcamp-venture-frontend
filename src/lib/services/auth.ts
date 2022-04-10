export const isAuthenticated = async (accessToken: string) => {
    const delayMs = Math.floor(Math.random() * 1000);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(accessToken == 'bitcamp');
        }, delayMs);
    })
}