export function parseJsonToSql(jsonString) {
  try {
    const json = JSON.parse(jsonString);
    if (!Array.isArray(json) || json.length === 0 || typeof json[0] !== 'object') {
      return 'Invalid JSON format. Must be an array of objects.';
    }

    const tableName = 'my_table';
    const columns = Object.keys(json[0]);

    const createTableSQL = `CREATE TABLE ${tableName} (\n  ${columns.map(col => `${col} TEXT`).join(',\n  ')}\n);`;

    const insertStatements = json.map(obj => {
      const values = columns.map(col => {
        const value = obj[col] ?? ''; 
        return `'${String(value).replace(/'/g, "''")}'`;
      });
      return `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});`;
    });

    return `${createTableSQL}\n\n${insertStatements.join('\n')}`;
  } catch (error) {
    return 'Invalid JSON input. Please ensure it is correctly formatted.';
  }
}
