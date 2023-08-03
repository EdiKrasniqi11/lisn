import sql from "mssql";

export async function getUserRoles(pool) {
  const result = await pool.request().query("SELECT * FROM USER_ROLES");
  const dataset = result.recordset;
  return dataset;
}

export async function getUserRoleById(pool, id) {
  const result = await pool
    .request()
    .input("role_id", sql.Int, id)
    .query("SELECT * FROM USER_ROLES WHERE ROLE_ID = @role_id");
  const dataset = result.recordset;
  return dataset;
}

export async function createUserRole(pool, role_name) {
  const result = await pool
    .request()
    .input("role_name", sql.VarChar, role_name)
    .query(
      "INSERT INTO USER_ROLES(ROLE_NAME) OUTPUT INSERTED.ROLE_ID, INSERTED.ROLE_NAME VALUES (@role_name)"
    );
  const object = result.recordset[0];
  return object;
}

export async function updateUserRole(pool, role_id, role_name) {
  const result = await pool
    .request()
    .input("role_id", sql.Int, role_id)
    .input("role_name", sql.VarChar, role_name)
    .query(
      "UPDATE USER_ROLES SET ROLE_NAME = @role_name OUTPUT INSERTED.ROLE_ID, INSERTED.ROLE_NAME WHERE ROLE_ID = @role_id"
    );
  const object = result.recordset[0];
  return object;
}

export async function deleteUserRole(pool, role_id) {
  const result = await pool
    .request()
    .input("role_id", sql.Int, role_id)
    .query(
      "DELETE FROM USER_ROLES OUTPUT DELETED.role_id, DELETED.role_name WHERE ROLE_ID = @role_id"
    );
  const object = result.recordset[0];
  return object;
}
