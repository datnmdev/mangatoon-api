import axios from '../../helpers/axios'

const url = '/account/verifyAccount'

describe('Kiểm thử API kích hoạt tài khoản', () => {
    it('Thiếu id', async () => {
        const response = await axios.put(url, {
            otpCode: "792916"
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
        const response = await axios.put(url, {
            id: 5
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
        const response = await axios.put(url, {
            id: 5,
            otpCode: "792916"
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: false,
            error: null
        })
    })
})
