import sql from '../lib/db';

export async function getBookmarks() {
  try {
    const bookmarks = await sql`SELECT * FROM bookmarks ORDER BY id DESC`;
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw new Error('Failed to fetch bookmarks');
  }
}

export async function addBookmark(bookmark: { title: string; url: string; description?: string }) {
  try {
    const newBookmark = await sql`
      INSERT INTO bookmarks (title, url, description)
      VALUES (${bookmark.title}, ${bookmark.url}, ${bookmark.description})
      RETURNING *
    `;
    return newBookmark[0];
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw new Error('Failed to add bookmark');
  }
}