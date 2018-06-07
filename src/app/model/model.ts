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

export class Company {

    itemID: string;
    address: string;
    bio: string;
    category: string;
    city: string;
    contact: string;
    country: string;
    facebook: string;
    fax: string;
    phone: string;
    email: string;
    profileType: string;
    profileUrl: string;
    state: string;
    title: string;
    twitter: string;
    website: string;
    zipcode: string;
    avatarUrl: string;
    bannerUrl: string;

    constructor() {
        this.itemID = null;
        this.address = null;
        this.bio = null;
        this.category = null;
        this.city = null;
        this.contact = null;
        this.country = null;
        this.facebook = null;
        this.fax = null;
        this.phone = null;
        this.email = null;
        this.profileType = null;
        this.profileUrl = null;
        this.state = null;
        this.title = null;
        this.twitter = null;
        this.website = null;
        this.zipcode = null;
        this.avatarUrl = null;
        this.bannerUrl = null;
    }

    dataObject(data: any){
        if(data){
            this.itemID = data.id;
            this.address = data.address;
            this.bio = data.bio;
            this.category = data.category
            this.city = data.city;
            this.contact = data.contact;
            this.country = data.country;
            this.facebook = data.facebook;
            this.fax = data.fax;
            this.phone = data.phone;
            this.email = data.email;
            this.profileType = data.profile_type;
            this.profileUrl = data.profile_url;
            this.state = data.state;
            this.title = data.title;
            this.twitter = data.twitter;
            this.website = data.website;
            this.zipcode = data.zipcode;
            this.avatarUrl = data.avatar_url;
            this.bannerUrl = data.banner_url;
        }
    }
}

export class Event {
    itemID: string;
    title: string;
    avatarUrl: string;
    bannerUrl: string;
    allowBio: string;
    bio: string;
    category: string;
    city: string;
    country: string;
    dateBegin: Date;
    dateEnd: Date;
    email: string;
    enabledRegister: string;
    endDate: Date;
    estimateExhibitor: string;
    estimateVisitor: string;
    expireDate: Date;
    facebook: string;
    hashtag: string;
    isActive: boolean;
    location: string;
    // operator: string;
    profileUrl: string;
    // sqFt: string;
    startDate: Date;
    state: string;
    technology: string;
    // timeBegin:
    // timeEnd:
    // timezone:
    // twitter: string;
    // type: string;
    venue: string;
    venueAddress: string;
    website: string;
    zipcode: string;

  constructor(values: object = {}){
    // Object.assign(this, values);
  }

  dataObject(data){
    if(data){
        this.itemID = data.id;
        this.profileUrl = data.profile_url;
        this.title = data.title;
        this.bio = data.bio;
        this.isActive = data.is_active;
        this.allowBio = data.allow_bio;
        this.email = data.email;
        this.website = data.website;
        this.location = data.location;
        this.venue = data.venue;
        this.venueAddress = data.venue_address;
        this.state = data.state;
        this.city = data.city;
        this.country = data.country;
        this.zipcode = data.zipcode;
        this.startDate = data.start_date;
        this.endDate = data.end_date;
        this.dateBegin = data.date_begin;
        this.dateEnd = data.date_end;
        // this.timeBegin = data.time_begin;
        // this.timeEnd = data.time_end;
        // timeZone = data.time_zone;
        this.estimateExhibitor = data.estimate_exhibitor;
        this.estimateVisitor = data.estimate_visitor;
        // sqFt = data.sq_ft;
        this.hashtag = data.hashtag;
        this.facebook = data.facebook;
        // twitter = data.twitter;
        this.enabledRegister = data.enabled_register;
        // type = data.type;
        this.technology = data.technology;
        this.expireDate = data.expire_date;
        // operator = data.operator;
        // category = data.category;
        // tags = data.tags;
        // company
        this.avatarUrl = data.avatar_url;
        this.bannerUrl = data.banner_url;
    }
  }
}

export class EventStat {
    totalTac: string;
    activeVisitors: string;
    totalVisitors: string;

    constructor() {

    }

    dataObject(data){
        this.totalTac = data.total_tac;
        this.totalVisitors = data.total_visitor;
        this.activeVisitors = data.active_visitor;
    }
}

// export class User {

//   constructor(values: object = {}){
//     Object.assign(this, values);
//   }
// }

export class Profile {
  mobile: string;
  dob: string;
  address: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  gender: string;
  city: string;
  country: string;
  work: string;
  company: Company;
  zipcode: string;
  jobTitle: string;
  companyID: string;

  constructor() {
      this.company = new Company();
      this.companyID = "";
  }

  dataObject(data: any){
      if(data){
          this.mobile = data.mobile;
          this.dob = data.dob;
          this.address = data.address;
          this.bio = data.bio;
          this.avatarUrl = data.avatar;
          this.gender = data.gender;
          this.city = data.city;
          this.bannerUrl = data.banner;
          this.country = data.country;
          this.work = data.work;
          this.zipcode = data.zipcode;
          this.jobTitle = data.job_title; 

          console.log("Data Company ya all",data.company);
          this.isNumber(data.company) === true ? this.companyID = data.company : this.company.dataObject(data.company);
      }
  }

  apiDict() {
      let dict = {
          mobile: this.mobile,
          dob: this.dob,
          address: this.address,
          avatar_url: this.avatarUrl,
          banner_url: this.bannerUrl,
          gender: this.gender,
          city: this.city,
          country: this.country,
          work: this.work,
          company: this.companyID,
          zipcode: this.zipcode,
          job_title: this.jobTitle,
          bio: this.bio
      }
  }

  isNumber (value) {
      return typeof value === 'number' && isFinite(value);
  };
}

export class User {
  itemID: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: Profile;

  constructor(){
      this.itemID = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.profile = new Profile();
  }

  dataObject(data: any){
      if(data){
          this.itemID = data.id;
          this.firstName = data.first_name;
          this.lastName = data.last_name;
          this.email = data.email;

          this.profile.dataObject(data.profile);
      }
  }

  apiDict(){
      let dict = {
          first_name : this.firstName,
          last_name : this.lastName,
          email : this.email,
          profile : this.profile.apiDict
      }

      return dict;
  }
}

export class Visitor {
    itemID: string;
    lastUTC: string;
    remarkJson: any;
    tacNo: string;
    name: string;
    firstName: string;
    lastName: string;
    group: any;
    remark: null;
    email: string;
    eventID: string;
    lastCheckedIn: Date;
    lastCheckedInTime: string;
    lastCheckedOut: Date;
    lastCheckedOutTime: string;

    user: User;

    constructor() {
        this.user = new User();
    }

    dataObject(data){
        this.itemID = data.id;
        this.lastUTC = data.last_utc;
        this.remarkJson = data.remark_json;
        this.tacNo = data.tac_no;
        this.name = data.name;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.group = data.group;
        this.remark = data.remark;
        this.email = data.email;
        this.lastCheckedIn = data.last_checked_in !== 0 ? new Date(data.last_checked_in * 1000) : undefined;
        this.lastCheckedOut = data.last_checked_out !== 0 ? new Date(data.last_checked_out * 1000) : undefined;
        this.lastCheckedInTime = data.last_checked_in !== 0 ? (this.lastCheckedIn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })).replace(/ /g,'') : undefined;
        this.lastCheckedOutTime = data.last_checked_out !== 0 ? (this.lastCheckedOut.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })).replace(/ /g,'') : undefined;

        if(data.user){
            this.user.dataObject(data.user);
        }
    }
}