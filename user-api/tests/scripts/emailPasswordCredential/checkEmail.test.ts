import axios from '../../helpers/axios'

const url = '/emailPasswordCredential/checkEmail'

describe('Kiểm thử API kiểm tra sự tồn tại của email', () => {
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

    it('Email đã tồn tại', async () => {
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
