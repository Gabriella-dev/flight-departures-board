export enum FlightDirection {
  Departure = 'departure',
}

export interface Airline {
  name: string
  code: string
}

export interface Airport {
  name: string
  cityName: string
  countryName: string
  code: string
}

export interface DepartureGate {
  name: string
  number: string
  action: string
}

export interface AllDeparture {
  flightDirection: FlightDirection
  scheduledDepartureDateTime: Date
  scheduledArrivalDateTime: Date
  estimatedDepartureDateTime: Date
  actualDepartureDateTime: null
  arrivalAirport: Airport
  departureAirport: Airport
  flightNumber: string
  airline: Airline
  arrivalTerminal: null
  departureTerminal: string
  status: string
  departureGate?: DepartureGate
}

export interface Welcome {
  allDepartures: AllDeparture[]
}
