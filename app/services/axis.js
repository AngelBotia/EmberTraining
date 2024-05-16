import Service from '@ember/service';

export default class AxisService extends Service {
   
    loadItemsTable () {
        //fetch
        return  [
            { bookingId: 1, hotelId: 101, bookingDate: '2024-04-25', description: 'Family vacation', pax: 4 },
            { bookingId: 2, hotelId: 102, bookingDate: '2024-04-26', description: 'Business trip', pax: 1 },
            { bookingId: 3, hotelId: 103, bookingDate: '2024-04-27', description: 'Honeymoon', pax: 2 },
            { bookingId: 4, hotelId: 104, bookingDate: '2024-04-28', description: 'Group tour', pax: 10 },
            { bookingId: 5, hotelId: 105, bookingDate: '2024-04-29', description: 'Weekend getaway', pax: 2 }
          ];
    }
}
