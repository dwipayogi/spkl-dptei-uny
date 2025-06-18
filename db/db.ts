import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres');

export default sql;