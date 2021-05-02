/* eslint-disable camelcase */
export interface House {
  id?: number
  created_at?: Date
  updated_at?: Date
  title: string
  description: string
  bedrooms: number
  rent: number
  phase: string
  photo1: string
  photo2: string
  photo3: string
}

export interface Tenant {
  id?: number
  created_at?: Date
  updated_at?: Date
  first_name: string
  last_name: string
  email: string
  phone: string
  status: 'past' | 'current' | 'prospective'
  password: string
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
  purpose: 'rent' | 'booking' | 'contribution'
  tenancy_id?: number
  booking_id?: number
}

export interface Message {
  id?: number
  created_at?: Date
  updated_at?: Date
  text: string
}

export type GroupedPayments = { [key: string]: Payment[] }
