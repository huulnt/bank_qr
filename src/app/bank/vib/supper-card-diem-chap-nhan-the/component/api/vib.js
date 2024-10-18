import { createClient } from '@vercel/postgres';
 
async function queryPosts(text ='') {
  const client = createClient();
  await client.connect();
 
  try {
    const { rows, fields } =
      await client.sql`SELECT * FROM vib_supper_card WHERE name like ${text} OR type like ${text} OR note like ${text};`;

      console.log('rows: ',rows);
      
  } finally {
    await client.end();
  }
}

export {
  queryPosts
}