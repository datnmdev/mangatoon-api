export enum RoutingKey {
    MAIL_VERIFY_ACCOUNT_SEND_CODE = 'mail.verifyAccount.sendCode',
    MAIL_RESET_PASSWORD_SEND_CODE = 'mail.resetPassword.sendCode',
    USER_SIGNUP_CREATE = 'user.signup.create',
    USER_SIGNIN_SAVE_TOKEN = 'user.signIn.saveToken',
    USER_SIGNOUT_DELETE_TOKEN = 'user.signOut.deleteToken',
    USER_REFRESH_TOKEN = 'user.refreshToken'
}