/* eslint-disable camelcase */
export interface House {
  id?: Number
  created_at?: Date
  updated_at?: Date
  title: String
  description: String
  bedrooms: Number
  rent: Number
  phase: String
  photo1: String
  photo2: String
  photo3: String
}

export interface Tenant {
  id?: Number
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
  id: Number
  created_at: Date
  updated_at: Date
  start_date: Date
  end_date: Date
  expected_end_date: Date
  house_id: Number
  tenant_id: Number
}

export interface Booking {
  id: Number
  created_at: Number
  updated_at: Number
  date_booked: Number
  expected_occupy_date: Number
  paid: Boolean
  house_id: Number
  tenant_id: Number
}

export interface Payment {
  id?: Number
  created_at?: Date
  updated_at?: Date
  date: Date
  for_month: Date
  amount: Number
  purpose: 'rent' | 'booking'
  tenancy_id?: Number
  booking_id?: Number
}
