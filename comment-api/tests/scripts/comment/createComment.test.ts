import axios from '../../helpers/axios'

const url = '/comment'

describe('Kiểm thử API tạo bình luận', () => {
    it('Access token hết hạn hoặc không hợp lệ, thông tin body hợp lệ', async () => {
        const body = {
            content: "hello",
            chapterId: 1
        }

        const response = await axios.post(url, body, {
            headers: {
                Authorization: 'Bearer ...'
            }
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: null,
            error: {
                status: 401,
                code: "Unauthorized",
                message: "unauthorized"
            }
        })
    })

    it('Access token khả dụng, thông tin body hợp lệ', async () => {
        const login = await axios({
            baseURL: 'http://localhost:8080/api/v1/user-api/auth/signIn/emailPassword',
            method: 'post',
            data: {
                email: 'datnm.ptit@gmail.com',
                password: 'Datnguyen170602#'
            }
        })

        const body = {
            content: "hello",
            chapterId: 1
        }

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })

        const response = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${login.data.data.tokens.accessToken}`
            }
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: {
                status: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                id: expect.any(Number),
                content: "hello",
                chapterId: 1,
                userId: expect.any(Number)
            },
            error: null
        })
    })
})
