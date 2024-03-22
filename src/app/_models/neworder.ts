export interface Order {
    success: boolean;
  new_order_list:{
    _id: string;
    unique_id: number;
    updated_at: string;
    country_id: string;
    city_id: string;
    store_id: string;
    cart_id: string;
    order_payment_id: string;
    user_id: string;
    order_type_id: string;
    confirmation_code_for_pick_up_delivery: number;
    confirmation_code_for_complete_delivery: number;
    created_at: string;
    completed_at: string;
    schedule_order_server_start_at: string;
    schedule_order_start_at: string | null;
    completed_date_in_city_timezone: string | null;
    completed_date_tag: string;
    date_time: {
      date: string;
      status: number;
    }[];
    is_schedule_order: boolean;
    is_user_rated_to_store: boolean;
    is_user_rated_to_provider: boolean;
    is_provider_rated_to_user: boolean;
    is_provider_rated_to_store: boolean;
    is_store_rated_to_user: boolean;
    is_store_rated_to_provider: boolean;
    is_provider_show_invoice: boolean;
    is_user_show_invoice: boolean;
    cancel_reason: string;
    store_notify: number;
    is_schedule_order_informed_to_store: boolean;
    order_status_manage_id: number;
    order_status: number;
    order_status_id: number;
    image_url: string[];
    delivery_type: number;
    current_request_type: "pick" | "delivery";
    order_type: number;
    paid_by: "pick_up" | "delivery";
    timezone: string;
    __v: number;
    cart_detail: {
      _id: string;
      unique_id: number;
      updated_at: string;
      cart_unique_token: string;
      user_id: string;
      user_type_id: string;
      order_id: string;
      city_id: string;
      created_at: string;
      is_round_trip: boolean;
      is_abroad: boolean;
      total_cart_price: number;
      total_item_count: number;
      order_details: {
        total_item_tax: number;
        total_item_price: number;
        unique_id: number;
        product_name: string;
        product_id: string;
        items: {
          max_item_quantity: number;
          details: string;
          unique_id: number;
          image_url: string[];
          item_id: string;
          item_name: string;
          note_for_item: string;
          item_price: number;
          item_tax: number;
          quantity: number;
          specifications: any[];
          tax: number;
          total_item_price: number;
          total_item_tax: number;
          total_specification_tax: number;
          total_price: number;
          total_specification_price: number;
          total_tax: number;
        }[];
      }[];
      destination_addresses: {
        address: string;
        address_type: "destination" | "pickup";
        city: string;
        delivery_status: number;
        location: [number, number];
        note: string;
        user_details: {
          country_phone_code: string;
          email: string;
          name: string;
          phone: string;
        };
        user_type: number;
      }[];
      pickup_addresses: {
        address: string;
        address_type: "destination" | "pickup";
        city: string;
        delivery_status: number;
        location: [number, number];
        note: string;
        user_details: {
          country_phone_code: string;
          email: string;
          name: string;
          phone: string;
        };
        user_type: number;
      }[];
    };
  }
}
