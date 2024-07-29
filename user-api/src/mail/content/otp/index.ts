import ejs from 'ejs'
import path from 'path'

export default function OtpContent(otpCode: string) {
    return ejs.renderFile(path.join(process.cwd(), 'src/mail/content/otp/otp.ejs'), {
        otpCode
    })
} 
