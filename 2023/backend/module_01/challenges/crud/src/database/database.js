import fs from 'node:fs/promises';

const DATABASE_PATH = new URL('db.json', import.meta.url);

class Database {
  #database = {
    tasks: [],
  };

  constructor() {
    fs.readFile(DATABASE_PATH, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  find(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex >= 0) {
      return this.#database[table][rowIndex];
    }

    return null;
  }

  insert(table, data) {
    this.#database[table].push(data);

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex >= 0) {
      this.#database[table][rowIndex] = {
        id,
        ...data,
      };

      this.#persist();

      return this.#database[table][rowIndex];
    } else {
      throw new Error('Register not found');
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex >= 0) {
      this.#database[table].splice(rowIndex, 1);

      this.#persist();
    } else {
      throw new Error('Register not found');
    }
  }
}

const db = new Database();

export { db };
