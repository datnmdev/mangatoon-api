import axios from '../../helpers/axios'

const url = '/account/getInfo'

describe('Kiểm thử API lấy thông tin tài khoản', () => {
    it('Không có authorization header', async () => {
        const response = await axios.get(url)

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

    it('Có Authorization, nhưng access token đã hết hạn hoặc không hợp lệ', async () => {
        const response = await axios.get(url, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJpYXQiOjE3MTk3NDI0NDYwMjB9.IP8z2N7EpABzLl-zn1Qaivvj1d1jgiAvMLpe8DK5-jU'
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
})
