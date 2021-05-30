import cookie from 'js-cookie'

export function loginAndSetToken({ token }, age) {
  cookie.set('token.uid', token, { expires: age })
}

export async function logout() {
  // TODO: remove cookie token.uid and fetch backend logout

}

export function userToken() {
  return cookie.get('token.uid')
}
