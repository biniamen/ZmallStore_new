export interface StoreUser {
    success: boolean;
    message: number;
    timezone: string;
    currency: string;
    minimum_phone_number_length: number;
    maximum_phone_number_length: number;
    is_subadmin: boolean;
    subadmin: any[];
    store: {
      _id: string;
      unique_id: number;
      updated_at: string;
      store_type: number;
      admin_type: number;
      store_type_id: any;
      store_delivery_id: string;
      company_id: number;
      country_id: string;
      city_id: string;
      location: [number, number];
      __v: number;
      created_at: string;
      server_token: string;
      device_token: string;
      is_referral: boolean;
      total_referrals: number;
      referral_code: string;
      comments: string;
      famous_products_tags: any[];
      offers: any[];
      branchio_url: string;
      slogan: string;
      website_url: string;
      store_time: {
        day_time: any[];
        day: number;
        is_store_open_full_time: boolean;
        is_store_open: boolean;
      }[];
      is_franchise_enabled: boolean;
      franchise_email: string;
      is_alarm_sound_activated: boolean;
      is_store_can_complete_order: boolean;
      is_store_can_add_provider: boolean;
      account_id: string;
      bank_id: string;
      wallet_currency_code: string;
      wallet: number;
      address: string;
      is_visible: boolean;
      admin_profit_value_on_store: number;
      admin_profit_mode_on_store: number;
      provider_rate_count: number;
      provider_rate: number;
      user_rate_count: number;
      user_rate: number;
      delivery_time_max: number;
      delivery_time: number;
      free_delivery_within_radius: number;
      free_delivery_for_above_order_price: number;
      is_store_pay_delivery_fees: boolean;
      delivery_radius: number;
      is_provide_delivery_anywhere: boolean;
      is_provide_laundry_service: boolean;
      is_provide_pickup_delivery: boolean;
      is_ask_estimated_time_for_ready_order: boolean;
      accept_only_cashless_payment: boolean;
      accept_user_pickup_delivery: boolean;
      company_name: string,
      phone: string;
      country_phone_code: string;
      email: string;

    };
  }
  export interface User {
    email: string;
    password: string;
    name: string;
    country_id: string;
    city_id: string;
    store_delivery_id: string;
    address: string;
    phone: string;
    website_url: string;
    company_name: string;
    slogan: string;
    longitude: number;
    latitude: number;
  }
  export interface AdminData {
    success: boolean;
    message: number;
    admin_data: {
      _id: string;
      unique_id: number;
      updated_at: string;
      admin_type: number;
      __v: number;
      created_at: string;
      stores: any[];
      urls: string[];
      email: string;
      server_token: string;
      password: string;
      username: string;
    };
  }