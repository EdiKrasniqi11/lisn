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

export interface USER {
  USER_ID?: string;
  USERNAME?: string;
  USER_EMAIL?: string;
  USER_IMG?: string;
  USER_PASSWORD?: string;
  BIRTH_DATE?: Date;
  GENDER?: string;
  USER_CITY_ID?: number;
  USER_ROLE_ID?: number;
  USER_STATE_ID?: number;
  INSERT_DATE: Date;
}

export interface DataInputConfig {
  name: string;
  type: "text" | "number" | "select" | "password" | "file" | "email" | "date";
  placeholder?: string;
  options?: { value: any; label: any }[];
}
