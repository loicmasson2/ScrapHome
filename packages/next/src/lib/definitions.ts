export interface House {
  link: string;
  summary: string;
  price: string;
  year: string;
  geolocation: Geolocation;
  id: string;
  address: string;
  postcode: string;
  rooms: string;
  size: string;
  images: Images;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
  accuracy: Accuracy;
}

export enum Accuracy {
  Address = "ADDRESS",
}

export interface Images {
  images: { [key: string]: ImageValue };
}

export interface ImageValue {
  id: number;
  propertyImageType: PropertyImageType;
  ordinal: number;
  image: ImageImage;
}

export interface ImageImage {
  id: number;
  uuid: string;
  uri: string;
  description?: string;
}

export enum PropertyImageType {
  FloorPlan = "FLOOR_PLAN",
  Main = "MAIN",
  Other = "OTHER",
}
