import axios from '../../helpers/axios'

const url = '/emailPasswordCredential/sendCodeToResetPassword'

describe('Kiểm thử API gửi mã xác thực quên mật khẩu', () => {
    it('Thiếu email', async () => {
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

    it('Gửi mã thành công', async () => {
        const response = await axios.post(url, {
            email: 'datnm.ptit@gmail.com'
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: true,
            error: null
        })
    })
})
