create database LISN_USERS
use LISN_USERS

create table COUNTRIES (
	COUNTRY_ID int primary key identity(1,1),
	COUNTRY_NAME varchar(50),
	COUNTRY_ICON varchar(255),
	INSERT_DATE datetime default current_timestamp
)

create table CITIES (
	CITY_ID int primary key identity(1,1),
	CITY_NAME varchar(50),
	COUNTRY_ID int foreign key references COUNTRIES(COUNTRY_ID),
	INSERT_DATE datetime default current_timestamp
)

create table USER_ROLES (
	ROLE_ID int primary key identity(1,1),
	ROLE_NAME varchar(20) unique,
	INSERT_DATE datetime default current_timestamp
)

create table STATES (
	STATE_ID int primary key identity(1,1),
	STATE_NAME varchar(50),
	INSERT_DATE datetime default current_timestamp
)

create table USERS (
	USER_ID varchar(255) primary key,
	USERNAME varchar(255) unique,
	USER_EMAIL varchar(255) unique,
	USER_IMG varchar(255),
	USER_PASSWORD varchar(255),
	BIRTH_DATE date,
	USER_CITY_ID int foreign key references CITIES(CITY_ID),
	USER_ROLE_ID int foreign key references USER_ROLES(ROLE_ID),
	USER_STATE_ID int foreign key references STATES(STATE_ID),
	UNSUCCESSFUL_LOGIN_ATTEMPTS int default 0,
	CREATED_DATE datetime default CURRENT_TIMESTAMP,
)