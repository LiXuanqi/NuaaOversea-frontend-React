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

  login() {
    request('/oversea/api/tokens', {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8;"
        },
        body: JSON.stringify({
          username: 'test',
          password: 'test'
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
    localStorage.setItem('token', token);

    // navigate to the home route
    window.location.href="/";
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('token');
    // navigate to the home route
    window.location.href="/";
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let token = localStorage.getItem('token');
    return token ? true : false
  }

  userProfile;

  getAccessToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No Access Token found');
    }
    return token;
  }

  getProfile(cb) {
    let token = this.getAccessToken();
    return new Promise((resolve, reject) => {
      request('/oversea/api/users', {
        headers: {
          "Token": token
        }
      })
      .then((data) => {
      
        resolve(data);
        // this.userProfile = profile;
      })
      .catch((err) => {
       
        reject(err);
      })
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


