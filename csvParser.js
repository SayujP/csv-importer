// csvParser.js
// Custom CSV parser: handles commas inside quotes, trims values, and builds nested objects

// Parse a single CSV line into an array of values
function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      // Handling escaped double quotes inside quoted field
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }

  result.push(cur);

  // Trim whitespace for non-empty fields
  return result.map(s => (s === '' ? '' : s.trim()));
}

//  nested JSON object from dot-notated keys and values
function buildNestedObject(keys, values) {
  const out = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = values[i] === '' ? null : values[i]; // empty string => null
    const parts = key.split('.');
    let node = out;

    for (let p = 0; p < parts.length; p++) {
      const part = parts[p];

      if (p === parts.length - 1) {
        node[part] = val;
      } else {
        if (!node[part] || typeof node[part] !== 'object') {
          node[part] = {};
        }
        node = node[part];
      }
    }
  }

  return out;
}

module.exports = { parseCSVLine, buildNestedObject };
