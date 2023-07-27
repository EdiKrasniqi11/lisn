export async function getUserRoles(sql, config) {
  const pool = await sql.connect(config);
  const result = await pool.request().query("SELECT * FROM USER_ROLES");
  const dataset = result.recordset;
  sql.close();
  return dataset;
}

export async function getUserRoleById(sql, config, id) {
  const pool = await sql.connect(config);
  const result = await pool
    .request()
    .input("role_id", sql.Int, id)
    .query("SELECT * FROM USER_ROLES WHERE ROLE_ID = @role_id");
  const dataset = result.recordset;
  sql.close();
  return dataset;
}

export async function createUserRole(sql, config, role_name) {
  const pool = await sql.connect(config);
  const result = await pool
    .request()
    .input("role_name", sql.VarChar, role_name)
    .query(
      "INSERT INTO USER_ROLES(ROLE_NAME) OUTPUT INSERTED.ROLE_ID, INSERTED.ROLE_NAME VALUES (@role_name)"
    );
  const object = result.recordset[0];
  sql.close();
  return object;
}

export async function deleteUserRole(sql, config, role_id) {
  const role_exists = getUserRoleById(sql, config, role_id);
  const pool = await sql.connect(config);
  const result = await pool
    .request()
    .input("role_id", sql.Int, role_id)
    .query(
      "DELETE FROM USER_ROLES OUTPUT DELETED.role_id, DELETED.role_name WHERE ROLE_ID = @role_id"
    );
  const object = result.recordset[0];
  sql.close();
  return object;
}
