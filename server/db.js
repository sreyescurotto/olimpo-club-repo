import mysql from 'serverless-mysql'

const database = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
})

export async function excuteQuery ({ query, values }) {
  try {
    const results = await database.query({
      sql: query,
      values
    })
    await database.end()
    return results
  } catch (error) {
    return { error }
  }
}
