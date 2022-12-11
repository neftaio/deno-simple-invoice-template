export interface ChargeInformation {
  user_name: string;
  user_id: string;
  user_address: string;
  user_phone: string;
  user_city: string;
  company: string;
  company_id: string;
  city: string;
  date: null | string;
  name_tax_a?: string;
  percent_tax_a?: number;
  name_tax_b?: string;
  percent_tax_b?: number;
  work_start_date: string;
  items: ChargeItem[];
}

export interface ChargeItem {
  name: string;
  total: number;
}

export interface Options {
  delta_x: number;
  delta_y: number;
}
