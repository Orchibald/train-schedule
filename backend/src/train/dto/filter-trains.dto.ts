export class FilterTrainsDto {
  departureCity?: string;
  arrivalCity?: string;
  sort?: 'price' | 'departureTime';
}
