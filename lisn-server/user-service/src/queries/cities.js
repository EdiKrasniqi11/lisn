export async function getCities(sql, config) {
  const pool = await sql.connect(config);
  const result = await pool.request().query("SELECT * FROM CITIES");
  const dataset = result.recordset;
  return dataset;
}

export async function getCityById(sql, config, id) {
  const pool = await sql.connect(config);
  const result = await pool
    .request()
    .input("city_id", sql.Int, id)
    .query("SELECT * FROM CITIES WHERE CITY_ID = @city_id");
  const dataset = result.recordset;
  return dataset;
}

export async function createCity(sql, config, city_name, country_id) {
  const pool = await sql.connect(config);
  const result = await pool
    .request()
    .input("city_name", sql.VarChar, city_name)
    .input("country_id", sql.Int, country_id)
    .query(
      "INSERT INTO CITIES(CITY_NAME, COUNTRY_ID) OUTPUT INSERTED.CITY_ID, INSERTED.CITY_NAME, INSERTED.COUNTRY_ID VALUES (@city_name, @country_id)"
    );
  const object = result.recordset[0];
  return object;
}

export async function updateCity(sql, config, city_id, city_name, country_id) {
  const pool = await sql.connect(config);
  const result = await pool
    .request()
    .input("city_id", sql.Int, city_id)
    .input("city_name", sql.VarChar, city_name)
    .input("country_id", sql.Int, country_id)
    .query(
      "UPDATE CITIES SET CITY_NAME = @city_name, COUNTRY_ID = @country_id OUTPUT INSERTED.CITY_ID, INSERTED.CITY_NAME, INSERTED.COUNTRY_ID WHERE CITY_ID = @city_id"
    );
  const object = result.recordset[0];
  return object;
}

export async function deleteCity(sql, config, city_id) {
  const pool = await sql.connect(config);
  const result = await pool
    .request()
    .input("city_id", sql.Int, city_id)
    .query(
      "DELETE FROM CITIES OUTPUT DELETED.city_id, DELETED.city_name WHERE CITY_ID = @city_id"
    );
  const object = result.recordset[0];
  return object;
}
