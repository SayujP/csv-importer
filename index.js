const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { pool } = require('./db');
const { parseCSVLine, buildNestedObject } = require('./csvParser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to import CSV
app.post('/import', async (req, res) => {
  try {
    const filePath = path.resolve(process.env.CSV_FILE_PATH);
    const data = fs.readFileSync(filePath, 'utf-8').split('\n').filter(l => l.trim() !== '');
    
    const headers = parseCSVLine(data[0]);
    const rows = data.slice(1);

    let inserted = 0;

    for (const row of rows) {
      const values = parseCSVLine(row);
      const jsonObj = buildNestedObject(headers, values);

      const name = `${jsonObj.name.firstName} ${jsonObj.name.lastName}`;
      const age = parseInt(jsonObj.age, 10);
      const address = jsonObj.address ? JSON.stringify(jsonObj.address) : null;

      // Remove mandatory fields for additional_info
      const additionalInfo = { ...jsonObj };
      delete additionalInfo.name;
      delete additionalInfo.age;
      delete additionalInfo.address;

      await pool.query(
        'INSERT INTO users(name, age, address, additional_info) VALUES($1, $2, $3, $4)',
        [name, age, address, additionalInfo]
      );

      inserted++;
    }

    console.log(`Inserted ${inserted} rows`);

    // Calculate age distribution
    const result = await pool.query('SELECT age FROM users');
    const ages = result.rows.map(r => r.age);

    const total = ages.length;
    const distribution = {
      '< 20': (ages.filter(a => a < 20).length / total * 100).toFixed(2),
      '20 to 40': (ages.filter(a => a >= 20 && a <= 40).length / total * 100).toFixed(2),
      '40 to 60': (ages.filter(a => a > 40 && a <= 60).length / total * 100).toFixed(2),
      '> 60': (ages.filter(a => a > 60).length / total * 100).toFixed(2),
    };

    console.log('Age-Group | % Distribution');
    for (const group in distribution) {
      console.log(`${group} | ${distribution[group]}%`);
    }

    res.send(`Imported ${inserted} rows and printed age distribution to console.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error importing CSV');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(parseCSVLine, buildNestedObject);

const csv = require('./csvParser');
console.log(csv);

