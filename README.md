# REST API
REST API module for your app with pretty documenting

----

Example user-service API for your app:
```JS
import REST_API from "@sergtyapkin/rest-api"

export default class MY_API extends REST_API {
    login = (email, password, clientBrowser, clientOS) => this.post('/api/user/auth', {email, password, clientBrowser, clientOS});
    register = (name, group, telegram, vk, email, phone_number, password, clientBrowser, clientOS) => this.post('/api/user', {name, group, telegram, vk, email, phone_number, password, clientBrowser, clientOS});
    logout = () => this.delete('/api/user/session');
    getUser = () => this.get('/api/user');
    getUserById = (id) => this.get(`/api/user`, {id});
    sendConfirmationLetter = (name, email) => this.post('/api/email/confirm', {name, email});
    confirmRegistrationByCode = (secretCode) => this.put('/api/user/email/confirm', {secretCode});
    changePassword = (oldPassword, newPassword) => this.put('/api/user/password', {oldPassword, newPassword});
    editProfile = (name, group, telegram, vk, email, phone_number) => this.put('/api/user', {name, group, telegram, vk, email, phone_number});
    sendRestorePasswordLetter = (secretCode, newPassword) => this.post('/api/user/password/restore', {secretCode, newPassword});
    restorePassword = (secretCode, newPassword) => this.put('/api/user/password', {secretCode, newPassword});
    authCode = (secretCode, clientBrowser, clientOS) => this.post('/api/user/auth/code', {secretCode, clientBrowser, clientOS});
}
```
