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

export class Event {
  // itemID: string;
  // profileUrl: string;
  // title: string;
  // bio:string;
  // isActive: boolean;
  // allowBio: boolean;
  // email: string;
  // website: string;
  // location: string;
  // venue: string;
  // avatarUrl: string;
  // bannerUrl: string;

  constructor(values: object = {}){
    Object.assign(this, values);
  }

  dataObject(data){
    if(data){
      // this.itemID = data.id;
      // this.title = data.title;
      // this.avatarUrl = data.avatar_url;
      // this.bannerUrl = data.banner_url;
    }
  }
}

export class User {

  constructor(values: object = {}){
    Object.assign(this, values);
  }
}