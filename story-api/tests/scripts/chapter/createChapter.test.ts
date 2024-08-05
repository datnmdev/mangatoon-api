import axios from '../../helpers/axios'

const url = '/chapter'

describe('Kiểm thử API tạo thông tin chương mới cho bộ truyện', () => {
    it('Access token hết hạn hoặc không hợp lệ, thông tin body hợp lệ', async () => {
        const body = {
            order: 1,
            name: "Chap 1",
            storyId: 1719
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

    it('Access token khả dụng, có quyền admin, thông tin body hợp lệ', async () => {
        const login = await axios({
            baseURL: 'http://localhost:8080/api/v1/user-api/auth/signIn/emailPassword',
            method: 'post',
            data: {
                email: 'datnm.ptit@gmail.com',
                password: 'Datnguyen170602#'
            }
        })

        const body = {
            order: 1,
            name: "Chap 1",
            storyId: 1718
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
                createdAt: expect.any(String), 
                updatedAt: expect.any(String),
                status: 0,
                id: expect.any(Number),
                order: 1,
                name: "Chap 1",
                storyId: 1718
            },
            error: null
        })
    })
})
