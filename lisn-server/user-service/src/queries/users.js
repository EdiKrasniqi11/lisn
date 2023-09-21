import sql from "mssql";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

export async function getUsers(pool) {
  const result = await pool.request().query("SELECT * FROM USERS");
  const dataset = result.recordset;
  return dataset;
}

export async function getUserById(pool, id) {
  const result = await pool
    .request()
    .input("user_id", sql.VarChar, id)
    .query("SELECT * FROM USERS WHERE USER_ID = @user_id");
  const dataset = result.recordset;
  return dataset;
}

export async function registerUser(pool, user) {
  try {
    const hashedPassword = await bcrypt.hash(user.USER_PASSWORD, 10);
    var userRole = 3;
    if (user.USER_ROLE_ID != null) {
      userRole = user.USER_ROLE_ID;
    }
    var userState = 1;
    if (user.USER_STATE_ID != null) {
      userState = user.USER_STATE_ID;
    }
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, uuidv4())
      .input("username", sql.VarChar, user.USERNAME)
      .input("user_email", sql.VarChar, user.USER_EMAIL)
      .input("user_password", sql.VarChar, hashedPassword)
      .input("birth_date", sql.VarChar, user.BIRTH_DATE)
      .input("user_city", sql.Int, user.USER_CITY_ID)
      .input("user_role", sql.Int, userRole)
      .input("user_state", sql.Int, userState)
      .input("gender", sql.Char, user.GENDER)
      .query(
        "insert into USERS(USER_ID, USERNAME, USER_EMAIL, USER_PASSWORD, BIRTH_DATE, GENDER, USER_CITY_ID, USER_ROLE_ID, USER_STATE_ID) output INSERTED.USER_ID, INSERTED.USERNAME, INSERTED.USER_EMAIL, INSERTED.USER_PASSWORD, INSERTED.BIRTH_DATE, INSERTED.BIRTH_DATE, INSERTED.GENDER, INSERTED.USER_CITY_ID, INSERTED.USER_ROLE_ID, INSERTED.USER_STATE_ID values (@user_id, @username, @user_email, @user_password, @birth_date, @gender, @user_city, @user_role, @user_state)"
      );
    const dataset = result.recordset[0];
    return dataset;
  } catch (error) {
    return error;
  }
}

export async function updateUser(pool, user) {
  try {
    console.log("TEST BEFORE");
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user.USER_ID)
      .input("username", sql.VarChar, user.USERNAME)
      .input("user_email", sql.VarChar, user.USER_EMAIL)
      .input("user_img", sql.VarChar, user.USER_IMG)
      .input("birth_date", sql.VarChar, user.BIRTH_DATE)
      .input("user_city", sql.Int, user.USER_CITY_ID)
      .input("user_role", sql.Int, user.USER_ROLE_ID)
      .input("user_state", sql.Int, user.USER_STATE_ID)
      .input("gender", sql.Char, user.GENDER)
      .query(
        "UPDATE USERS SET USERNAME = @username, USER_EMAIL = @user_email, USER_IMG = @user_img, BIRTH_DATE = @birth_date, GENDER = @gender, USER_CITY_ID = @user_city, USER_ROLE_ID = @user_role, USER_STATE_ID = @user_state OUTPUT INSERTED.USER_ID, INSERTED.USERNAME, INSERTED.USER_EMAIL, INSERTED.BIRTH_DATE, INSERTED.GENDER, INSERTED.USER_CITY_ID, INSERTED.USER_ROLE_ID, INSERTED.USER_STATE_ID WHERE USER_ID = @user_id"
      );
    console.log("TEST AFTER");
    const dataset = result.recordset[0];
    return dataset;
  } catch (error) {
    return error;
  }
}

export async function deleteUser(pool, user_id) {
  const result = await pool
    .request()
    .input("user_id", sql.VarChar, user_id)
    .query("DELETE FROM USERS OUTPUT DELETED.USER_ID WHERE USER_ID = @user_id");
  const object = result.recordset[0];
  console.log(object);
  return object;
}
