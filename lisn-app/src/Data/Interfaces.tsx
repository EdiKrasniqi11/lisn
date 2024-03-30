export interface USER_ROLE {
  _id: string;
  role_name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface USER_STATE {
  _id: string;
  state_name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface COUNTRY {
  flags: any;
  name: any;
  createdAt: Date;
}

export interface USER {
  _id?: string;
  username?: string;
  user_email?: string;
  user_image?: string;
  user_password?: string;
  birth_date?: Date;
  user_country?: string;
  user_role?: USER_ROLE;
  user_state?: USER_STATE;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoggedUser {
  username: string;
  role: string;
}

export interface Playlist {
  PLAYLIST_ID: string;
  IMAGE: string;
  TITLE: string;
}

export interface DataInputConfig {
  name: string;
  type: "text" | "number" | "select" | "password" | "file" | "email" | "date";
  placeholder?: string;
  options?: { value: any; label: any }[];
}
