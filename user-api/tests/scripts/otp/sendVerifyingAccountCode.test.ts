import axios from '../../helpers/axios'

const url = '/otp/sendVerifyingAccountCode'

describe('Kiểm thử API gửi mã kích hoạt tài khoản', () => {
    it('Thiếu id', async () => {
        const response = await axios.post(url, {})

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

    it('Có id nhưng tài khoản đã được kích hoạt trước đó', async () => {
        const response = await axios.post(url, {
            id: 5
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: false,
            error: null
        })
    })
})
