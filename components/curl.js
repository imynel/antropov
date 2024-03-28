const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = 'a043efe016ff4260825d4289a6110edc';
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
})();