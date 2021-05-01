/* eslint-disable camelcase */
export interface House {
  id?: number
  created_at?: Date
  updated_at?: Date
  title: String
  description: String
  bedrooms: number
  rent: number
  phase: String
  photo1: String
  photo2: String
  photo3: String
}

export interface Tenant {
  id?: number
  created_at?: Date
  updated_at?: Date
  first_name: String
  last_name: String
  email: String
  phone: String
  status: 'past' | 'current' | 'prospective'
  password: String
}

export interface Tenancy {
  id: number
  created_at: Date
  updated_at: Date
  start_date: Date
  end_date: Date
  expected_end_date: Date
  house_id: number
  tenant_id: number
}

export interface Booking {
  id: number
  created_at: number
  updated_at: number
  date_booked: number
  expected_occupy_date: number
  paid: Boolean
  house_id: number
  tenant_id: number
}

export interface Payment {
  id?: number
  created_at?: Date
  updated_at?: Date
  date: Date
  for_month: Date
  amount: number
  purpose: 'rent' | 'booking'
  tenancy_id?: number
  booking_id?: number
}

export type GroupedPayments = { [key: string]: Payment[] }
