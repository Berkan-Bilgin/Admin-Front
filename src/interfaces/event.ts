export interface IEvent {
  _id?: string;
  title: string;
  category: string;
  description: string;
  location: string;
  city: string;
  startDate: Date;
  endDate: Date;
  coords: {
    lat: number;
    lng: number;
  };
  googleMapsLink: string;
  ticketPrice: string;
  eventImages: never[];
}
