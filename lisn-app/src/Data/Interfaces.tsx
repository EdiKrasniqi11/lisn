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

export interface Follow {
  _id: string;
  follower?: USER;
  followed?: USER;
}

export interface FollowPage {
  current_page: number;
  followerCount?: number;
  followingCount?: number;
  followers?: Follow[];
  following?: Follow[];
  totalPages: number;
}

export interface SONG {
  _id: string;
  song_name?: string;
  artist?: USER;
  song_path?: string;
  song_image?: string;
  main_image_color?: string;
  song_viewability?: boolean;
  song_bpm?: number;
  song_key?: string;
  song_subgenre?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Playlist {
  _id: string;
  IMAGE: string;
  TITLE: string;
  SONGS?: SONG[];
}

export interface DataInputConfig {
  name: string;
  type: "text" | "number" | "select" | "password" | "file" | "email" | "date";
  placeholder?: string;
  options?: { value: any; label: any }[];
}
