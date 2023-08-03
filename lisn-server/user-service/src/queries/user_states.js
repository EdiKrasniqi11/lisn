import sql from "mssql";

export async function getUserStates(pool) {
  const result = await pool.request().query("SELECT * FROM USER_STATES");
  const dataset = result.recordset;
  return dataset;
}

export async function getUserStateById(pool, id) {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM USER_STATES WHERE STATE_ID = @id");
  const dataset = result.recordset;
  return dataset;
}

export async function createUserState(pool, state_name) {
  const result = await pool
    .request()
    .input("state_name", sql.VarChar, state_name)
    .query(
      "INSERT INTO USER_STATES(STATE_NAME) OUTPUT INSERTED.STATE_ID, INSERTED.STATE_NAME, INSERTED.INSERT_DATE VALUES(@state_name)"
    );
  const dataset = result.recordset[0];
  return dataset;
}

export async function updateUserState(pool, state_id, state_name) {
  const result = await pool
    .request()
    .input("state_id", sql.Int, state_id)
    .input("state_name", sql.VarChar, state_name)
    .query(
      "UPDATE USER_STATES SET STATE_NAME = @state_name OUTPUT INSERTED.STATE_ID, INSERTED.STATE_NAME, INSERTED.INSERT_DATE WHERE STATE_ID = @state_id"
    );
  const dataset = result.recordset[0];
  return dataset;
}

export async function deleteUserState(pool, state_id) {
  const result = await pool
    .request()
    .input("state_id", sql.Int, state_id)
    .query(
      "DELETE FROM USER_STATES OUTPUT DELETED.STATE_ID, DELETED.STATE_NAME, DELETED.INSERT_DATE WHERE STATE_ID = @state_id"
    );
  const dataset = result.recordset[0];
  return dataset;
}
