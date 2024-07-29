export class RedisKeyGenerator {

    static accessTokenkey = (accessToken: string) => {
        return `accessToken:${accessToken}`
    }
    
}