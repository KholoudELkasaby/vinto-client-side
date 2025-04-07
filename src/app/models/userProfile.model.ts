export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  picture: string;
  user: {
    _id: string;
  };
}
