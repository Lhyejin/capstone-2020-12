const { SQLDataSource } = require("datasource-sql");

const CACHE_TTL = 2;

class MediaDB extends SQLDataSource {
  async getMedia(id) {
    return await this.knex
      .select("*")
      .first()
      .from("media")
      .where({ id })
      .cache(CACHE_TTL);
  }
  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .first()
      .from("media")
      .where({ id })
      .cache(CACHE_TTL);
    return result[attrName];
  }
  async searchMedia({
    queryStr = "",
    location = "대한민국",
    yearFrom = 1900,
    yearTo = 2100,
  }) {
    return this.knex
      .from("media")
      .where(function () {
        // eslint-disable-next-line no-invalid-this
        this.where("title", "like", `%${queryStr}%`)
          .orWhere("description", "like", `%${queryStr}%`)
          .orWhere("category", "like", `%${queryStr}%`);
      })
      .andWhere("location", "like", `${location}%`)
      .andWhereBetween("year", [yearFrom, yearTo])
      .cache(CACHE_TTL);
  }
  async createMedia(args) {
    const result = await this.knex.insert(args).into("media").returning("*");
    return result[0];
  }
  async deleteMedia(id) {
    await this.knex("media").where({ id }).del();
    return true;
  }
}
class UserDB extends SQLDataSource {
  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .first()
      .from("user")
      .where({ id })
      .cache(CACHE_TTL);
    return result[attrName];
  }
  async createUser({ email, password, name }) {
    const result = await this.knex
      .insert({ email, password, name })
      .into("user")
      .returning("*");
    return result[0];
  }
  async getUserByEmail(email) {
    return this.knex.select("*").first().from("user").where({ email });
  }
}

class CommentDB extends SQLDataSource {
  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .from("comment")
      .where({ id })
      .cache(CACHE_TTL);
    return result[0][attrName];
  }
  async getCommentIdsByAuthorId(id) {
    return await this.knex
      .from("comment")
      .where({ authorId: id })
      .cache(CACHE_TTL);
  }
  async getCommentIdsByMediaId(id) {
    return await this.knex
      .from("comment")
      .where({ mediaId: id })
      .cache(CACHE_TTL);
  }
}

module.exports = {
  MediaDB,
  UserDB,
  CommentDB,
};
