import router from 'umi/router';
import request from '../utils/request';
class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.register = this.register.bind(this);

  }

  login(username, password) {
    request('/oversea/api/tokens', {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8;"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((data) => {
        const token = data['data']['token'];
        router.replace(`callback?token=${token}`)
      })
  }

  handleAuthentication(token) {
    this.setSession(token);   
    window.location.href="/";
  }

  setSession(token) {
    // Set the time that the Access Token will expire at
    sessionStorage.setItem('token', token);

    // navigate to the home route
    window.location.href="/";
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    sessionStorage.removeItem('token');
    // navigate to the home route
    window.location.href="/";
  }

  isAuthenticated() {
    
    let token = sessionStorage.getItem('token');
    return token ? true : false
  }

  userProfile;

  getAccessToken() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No Access Token found');
    }
    return token;
  }

  getProfile() {
    let token = this.getAccessToken();
    return request('/oversea/api/users', {
      headers: {
        "Token": token
      }
    });
  }

  register(username, password, email, will_contact) {
    return request('/oversea/api/users', {
      method: 'POST',
      headers: {
          "Content-type": "application/json; charset=UTF-8;"
      },
      body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          will_contact: will_contact
      })
    })
  }
}

const auth = new Auth();

export default auth;


