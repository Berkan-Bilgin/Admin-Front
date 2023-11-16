export interface IEvent {
  _id?: string;
  title: string;
  category: string;
  description: string;
  place: string;
  city: string;
  startDate: Date | null;
  endDate: Date | null;
  coords: {
    lat: number;
    lng: number;
  };
  googleMapsLink: string;
  ticketPrice: string;
  eventImages: any[];
}
