import axios from '../../helpers/axios'

const url = '/emailPasswordCredential/verifyCodeToResetPassword'

describe('Kiểm thử API xác thực mã quên mật khẩu', () => {
    it('Thiếu email', async () => {
        const response = await axios.post(url, {
            otpCode: '194107'
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

    it('Thiếu otpCode', async () => {
        const response = await axios.post(url, {
            email: 'datnm.ptit@gmail.com'
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

    it('Sai mã, xác thực không thành công', async () => {
        const response = await axios.post(url, {
            email: 'datnm.ptit@gmail.com',
            otpCode: '194107'
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: false,
            error: null
        })
    })
})
