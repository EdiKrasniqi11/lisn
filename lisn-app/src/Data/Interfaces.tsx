export interface USER_ROLE {
  ROLE_ID: number;
  ROLE_NAME: string;
  INSERT_DATE: Date;
}

export interface USER_STATE {
  STATE_ID: number;
  STATE_NAME: string;
  INSERT_DATE: Date;
}

export interface COUNTRY {
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
  COUNTRY_ICON: string;
  INSERT_DATE: Date;
}

export interface CITY {
  CITY_ID: number;
  CITY_NAME: string;
  COUNTRY_ID: number;
  INSERT_DATE: Date;
}

export interface DataInputConfig {
  name: string;
  type: "text" | "number" | "select";
  placeholder?: string;
  options?: { value: any; label: string }[];
}
