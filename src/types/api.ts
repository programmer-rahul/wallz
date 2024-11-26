export interface TApiCall {
    method?: "get" | "post" | "put" | "delete";
    url: string;
    data?: {};
    params?: {};
  }
  