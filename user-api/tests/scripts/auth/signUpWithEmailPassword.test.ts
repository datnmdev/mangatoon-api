import axios from '../../helpers/axios'
import crypto from 'crypto'

const url = '/auth/signUp/emailPassword'

describe('Kiểm thử API đăng ký bằng email và password', () => {
    it('Thiếu email', async () => {
        const response = await axios.post(url, {
            dob: "2002/06/17",
            name: "Nguyen Minh Dat",
            gender: 0,
            password: "12345678"
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: null,
            error: {
                status: 400,
                code: 'BadRequest',
                message: 'bad request'
            }
        })
    })

    it('Thiếu password', async () => {
        const response = await axios.post(url, {
            email: "n20dccn095@gmail.commmm",
            dob: "2002/06/17",
            name: "Nguyen Minh Dat",
            gender: 0
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: null,
            error: {
                status: 400,
                code: 'BadRequest',
                message: 'bad request'
            }
        })
    })

    it('Dữ liệu đầu vào hợp lệ', async () => {
        const response = await axios.post(url, {
            email: `${crypto.randomBytes(16).toString('hex')}@example.com`,
            dob: "2002/06/17",
            name: "Nguyen Minh Dat",
            gender: 0,
            password: "12345678Dat#"
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: {
                status: 0,
                role: 'user',
                createdAt: expect.any(String),
                provider: 'local',
                id: expect.any(Number),
                userId: expect.any(Number)
            },
            error: null
        })
    })

    it('Email đã được đăng ký', async () => {
        const response = await axios.post(url, {
            email: "n20dccn095@gmail.commmmm",
            dob: "2002/06/17",
            name: "Nguyen Minh Dat",
            gender: 0,
            password: "12345678"
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: null,
            error: {
                status: 500,
                code: 'InternalServerError',
                message: 'internal server error'
            }
        })
    })
})
