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

export interface GENRE {
  _id: string;
  genre_name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SUBGENRE {
  _id: string;
  sub_name?: string;
  genre?: GENRE;
  createdAt: Date;
  updatedAt: Date;
}

export interface SONG {
  _id: string;
  SONG_NAME?: string;
  ARTIST?: USER;
  SONG_PATH?: string;
  SONG_IMAGE?: string;
  MAIN_IMAGE_COLOR?: string;
  SONG_VIEWABILITY?: boolean;
  SONG_BPM?: number;
  SONG_KEY?: string;
  SONG_SUBGENRE?: string;
  SONG_DESCRIPTION?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Playlist {
  _id: string;
  IMAGE: string;
  TITLE: string;
  SONGS?: SONG[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DataInputConfig {
  name: string;
  type: "text" | "number" | "select" | "password" | "file" | "email" | "date";
  placeholder?: string;
  options?: { value: any; label: any }[];
}
