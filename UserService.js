import db from './sql3_data.js';

class UserService {
  async create(user) {
    const lastId = await new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (name, age) VALUES ($1, $2)`, [user.name, user.age], function(err) {
        if (err) {
          reject(err);
        } else {
            resolve(this.changes);
        }
      });
    });
    return { id: lastId, ...user };
  }

  async getAll() {
    try {
      const users = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      return users;
    } catch (err) {
      return null;
    }
  }

  async getOne(id) {
    const user = new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id = $1`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return user;
  }

  async update(id, updateData) {
    const changes = new Promise((resolve, reject) => {
      db.run(`UPDATE users SET name = $1, age = $2 WHERE id = $3`, [updateData.name, updateData.age, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
    if (changes === 0) {
      return null;
    }
    return this.getOne(id);
  }

  async delete(id) {
    console.log(id);
    const changes = new Promise((resolve, reject) => {
      db.run(`DELETE FROM users WHERE id = $1`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
    return changes > 0;
  }
}


export default new UserService();