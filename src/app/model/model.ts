export class AuthCredential {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn:string;
    scope: string;
    basicRole: string;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  
    dataObject(data){
      if(data){
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.tokenType = data.token_type;
        this.expiresIn = data.expires_in;
        this.scope = data.scope;
        this.basicRole = data.basic_role;
      }
    }
}