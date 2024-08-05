import axios from '../../helpers/axios'
import FormData from 'form-data'
import fs from 'fs'

const url = '/story'

describe('Kiểm thử API tạo thông tin của bộ truyện', () => {
    it('Access token hết hạn hoặc không hợp lệ, thông tin body hợp lệ', async () => {
        const formData = new FormData()
        formData.append('title', 'ONE PIECE')
        formData.append('description', '...')
        formData.append('countryId', '78')
        formData.append('coverImage', fs.createReadStream(`${process.cwd()}/tests/data/images/1.jpeg`))

        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders(),
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
        const formData = new FormData()
        formData.append('title', 'ONE PIECE')
        formData.append('description', '...')
        formData.append('countryId', '78')
        formData.append('coverImage', fs.createReadStream(`${process.cwd()}/tests/data/images/1.jpeg`))

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })

        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders(),
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
                title: 'ONE PIECE',
                description: '...',
                coverImageUrl: expect.any(String),
                countryId: 78
            },
            error: null
        })
    })
})