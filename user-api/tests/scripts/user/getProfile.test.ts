import axios from '../../helpers/axios'

const url = '/user/getProfile'

describe('Kiểm thử API lấy thông tin cá nhân', () => {
    it('Access token khả dụng, dữ liệu đầu vào đầy đủ', async () => {
        const login = await axios.post('/auth/signIn/emailPassword', {
            email: 'datnm.ptit@gmail.com',
            password: 'Datnguyen170602#'
        })

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${login.data.data.tokens.accessToken}`
            }
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: {
                id: 1,
                name: "Minh Đạt",
                gender: 0,
                dob: "2002-06-17",
                avatarUrl: expect.any(String)
            },
            error: null
        })
    })
})
