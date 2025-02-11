
import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken())
  }
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  isTokenExpired(token: string): boolean {
    try {
      const decodeToken = jwtDecode<JwtPayload>(token);
      if (decodeToken.exp && decodeToken.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
    return false;
  }
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
  //  window.location.assign('/');
  }
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}
export default new AuthService();

