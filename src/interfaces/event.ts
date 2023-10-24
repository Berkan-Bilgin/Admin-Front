export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  category: string;
  images: string[]; // URL'lerin dizisi
  startDate: string; // ISO tarih formatında
  endDate: string; // ISO tarih formatında
  venue: string; // Etkinliğin yapılacağı yer
  city: string;
  ticketPrice: number | null; // Ücretsiz etkinlikler için null
  online: boolean; // Etkinlik çevrimiçi mi, çevrimdışı mı?
  // Diğer gerekli alanları buraya ekleyebilirsiniz.
}
