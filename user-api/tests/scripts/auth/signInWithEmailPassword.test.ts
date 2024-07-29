import axios from '../../helpers/axios'

const url = '/auth/signIn/emailPassword'

describe('Kiểm thử API đăng nhập bằng email và password', () => {
    it('Test Email hoặc password không đúng', async () => {
        const response = await axios.post(url, {
            email: "xxx",
            password: "xxx"
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: {
                tokens: null,
                account: null
            },
            error: null
        })
    })

    it('Test Email và password chính xác, tài khoản đã được kích hoạt', async () => {
        const response = await axios.post(url, {
            email: 'datnm.ptit@gmail.com',
            password: 'Datnguyen170602#'
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: {
                tokens: {
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String)
                },
                account: {
                    id: 1,
                    status: 1,
                    role: 'admin',
                    createdAt: '2024-06-28T00:00:00.000Z',
                    userId: 1,
                    provider: 'local'
                }
            },
            error: null
        })
    })

    it('Test Email và password chính xác, tài khoản chưa được kích hoạt', async () => {
        const response = await axios.post(url, {
            email: 'n20dccn095@student.ptithcm.edu.vn',
            password: 'Datnguyen170602#'
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: {
                tokens: null,
                account: {
                    id: 2,
                    status: 0,
                    role: 'user',
                    createdAt: '2024-06-28T00:00:00.000Z',
                    userId: 2,
                    provider: 'local'
                }
            },
            error: null
        })
    })

    it('Test Email và password chính xác, tài khoản đã bị khoá', async () => {
        const response = await axios.post(url, {
            email: 'minhdat450500@gmail.com',
            password: 'Datnguyen170602#'
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: {
                tokens: null,
                account: {
                    id: 3,
                    status: 2,
                    role: 'user',
                    createdAt: '2024-06-28T00:00:00.000Z',
                    userId: 3,
                    provider: 'local'
                }
            },
            error: null
        })
    })

    it('Test Email và password chính xác, tài khoản đã bị khoá', async () => {
        const response = await axios.post(url, {
            email: 'datnm.study@gmail.com',
            password: 'Datnguyen170602#'
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: {
                tokens: null,
                account: {
                    id: 4,
                    status: 3,
                    role: 'user',
                    createdAt: '2024-06-29T04:50:53.000Z',
                    userId: 4,
                    provider: 'local'
                }
            },
            error: null
        })
    })

    it('Test Thiếu email', async () => {
        const response = await axios.post(url, {
            password: 'Datnguyen170602#'
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

    it('Test Thiếu password', async () => {
        const response = await axios.post(url, {
            email: 'datnm.study@gmail.com'
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

})
