export class User {
  _id: string;
  name: string;
  email: string;
  token: string;
  creationDate: string;
};

export class Company {
  _id: string;
  name: string;
  companyType: string;
  registrationDate: string;
};

export class UserInfo {
  _id: string;
  name: string;
  email: string;
  creationDate: string;
  favCompanies: Company[]
};