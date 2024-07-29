import axios from '../../helpers/axios'

const url = '/auth/refreshToken'

describe('Kiểm thử API refreshToken', () => {
    it('Thiếu accessToken', async () => {
        const response = await axios.post(url, {
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJpYXQiOjE3MTk2NTg1NzI5MDh9.LWJ6Mz4OTinVbAuHNqRIiS8qINqQbORhJk6rjWUo40c"
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

    it('Thiếu refreshToken', async () => {
        const response = await axios.post(url, {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJpYXQiOjE3MTk2NTg1NzI5MDh9.X2uihKHlJSC6AXoVpiZyDee1dNEvMQ8diZxBN9tTUQ4"
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
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJpYXQiOjE3MTk2NTg1NzI5MDh9.X2uihKHlJSC6AXoVpiZyDee1dNEvMQ8diZxBN9tTUQ4",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJpYXQiOjE3MTk2NTg1NzI5MDh9.LWJ6Mz4OTinVbAuHNqRIiS8qINqQbORhJk6rjWUo40c"
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            data: false,
            error: null
        })
    })
})
