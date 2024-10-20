import { neon, neonConfig } from '@neondatabase/serverless';

neonConfig.fetchConnectionCache = true;

const sql = neon(import.meta.env.VITE_DATABASE_URL);

export default sql;