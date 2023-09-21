import jwt from "jsonwebtoken";
import sql from "mssql";
import bcrypt from "bcrypt";
import { getUsers } from "./users.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/tokenGeneration.js";

export async function login(pool, user) {
  const users = await getUsers(pool);
  const foundUser = users.find(
    (object) =>
      object.USERNAME === user.USERNAME || object.USER_EMAIL === user.USERNAME
  );
  if (foundUser == null) {
    return {
      status: 404,
      message: `User does not exist`,
    };
  }
  if (foundUser.USER_STATE_ID !== 1) {
    return {
      status: 403,
      message: `Your account has been suspended please email lisn@service.com for account reinstatement and well get back to you as soon as possible`,
    };
  }
  try {
    if (await bcrypt.compare(user.USER_PASSWORD, foundUser.USER_PASSWORD)) {
      const tokenizedUser = {
        name: foundUser.USERNAME,
        role: foundUser.USER_ROLE_ID,
      };
      const accessToken = generateAccessToken(tokenizedUser);
      const refreshToken = generateRefreshToken(tokenizedUser);
      await saveRefreshToken(refreshToken, pool);
      return {
        status: 200,
        ACCESS_TOKEN: accessToken,
        REFRESH_TOKEN: refreshToken,
      };
    } else {
      return { status: 400, message: "Username or password is incorrect" };
    }
  } catch (error) {
    return error;
  }
}

export async function logout(pool, token) {
  await pool
    .request()
    .input("token", sql.VarChar, token)
    .query("DELETE FROM REFRESH_TOKENS WHERE TOKEN = @token");
  return { status: 204, message: "TOKEN DELETED" };
}

export async function saveRefreshToken(token, pool) {
  const result = await pool
    .request()
    .input("token", sql.VarChar, token)
    .query("INSERT INTO REFRESH_TOKENS OUTPUT INSERTED.TOKEN VALUES (@token)");
  const dataset = result.recordset;
  return dataset;
}

export async function getRefreshTokens(pool) {
  const result = await pool.request().query("SELECT * FROM REFRESH_TOKENS");
  const dataset = result.recordset;
  return dataset;
}

export async function refreshToken(token, pool) {
  const tokens = await getRefreshTokens(pool);
  if (token == null) return { status: 401, message: "Please enter a token!" };
  if (tokens.find((object) => object.TOKEN === token) == null)
    return { status: 403, message: "Theres no such token in the database" };
  try {
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken({
      name: user.name,
      role: user.role,
    });
    return {
      status: 200,
      ACCESS_TOKEN: accessToken,
    };
  } catch (error) {
    return { status: 403, message: error.message };
  }
}
