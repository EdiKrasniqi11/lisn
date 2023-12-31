import sql from "mssql";

export async function getCountries(pool) {
  const result = await pool.request().query("SELECT * FROM COUNTRIES");
  const dataset = result.recordset;
  return dataset;
}

export async function getCountryById(pool, id) {
  const result = await pool
    .request()
    .input("country_id", sql.Int, id)
    .query("SELECT * FROM COUNTRIES WHERE COUNTRY_ID = @country_id");
  const dataset = result.recordset;
  return dataset;
}

export async function createCountry(pool, country_name, country_icon) {
  const result = await pool
    .request()
    .input("country_name", sql.VarChar, country_name)
    .input("country_icon", sql.VarChar, country_icon)
    .query(
      "INSERT INTO COUNTRIES(COUNTRY_NAME, COUNTRY_ICON) OUTPUT INSERTED.COUNTRY_ID, INSERTED.COUNTRY_NAME, INSERTED.COUNTRY_ICON VALUES (@country_name, @country_icon)"
    );
  const object = result.recordset[0];
  return object;
}

export async function updateCountry(
  pool,
  country_id,
  country_name,
  country_icon
) {
  const result = await pool
    .request()
    .input("country_id", sql.Int, country_id)
    .input("country_name", sql.VarChar, country_name)
    .input("country_icon", sql.VarChar, country_icon)
    .query(
      "UPDATE COUNTRIES SET COUNTRY_NAME = @country_name, COUNTRY_ICON = @country_icon OUTPUT INSERTED.COUNTRY_ID, INSERTED.COUNTRY_NAME WHERE COUNTRY_ID = @country_id"
    );
  const object = result.recordset[0];
  return object;
}

export async function deleteCountry(pool, country_id) {
  const result = await pool
    .request()
    .input("country_id", sql.Int, country_id)
    .query(
      "DELETE FROM COUNTRIES OUTPUT DELETED.country_id, DELETED.country_name WHERE COUNTRY_ID = @country_id"
    );
  const object = result.recordset[0];
  return object;
}
