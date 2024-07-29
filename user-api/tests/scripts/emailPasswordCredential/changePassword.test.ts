import axios from '../../helpers/axios'

const url = '/emailPasswordCredential/changePassword'

describe('Kiểm thử API đổi mật khẩu', () => {
    it('Access token đã hết hạn, dữ liệu đầu vào đầy đủ', async () => {
        const response = await axios.post(url, {
            oldPassword: 'Datnguyen170602#',
            newPassword: '12345678'
        }, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsInVzZXJJZCI6MSwicm9sZSI6InVzZXIiLCJzdGF0dXMiOjEsImlhdCI6MTcxOTgwNjkzNTYwNn0.xKal5uNEsxTQQ7gdv-n7J5uAut1ZeDTD9jAb4tSxBU4'
            }
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: null,
            error: {
                status: 401,
                code: 'Unauthorized',
                message: 'unauthorized'
            }
        })
    })

    it('Access token khả dụng, dữ liệu đầu vào đầy đủ', async () => {
        const login = await axios.post('/auth/signIn/emailPassword', {
            email: 'datnm.ptit@gmail.com',
            password: 'Datnguyen170602#'
        })

        const response = await axios.post(url, {
            oldPassword: 'Datnguyen170602#',
            newPassword: 'Datnguyen170602#'
        }, {
            headers: {
                Authorization: `Bearer ${login.data.data.tokens.accessToken}`
            }
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: true,
            error: null
        })
    })
})
