/**
 * TEMP MOCK DATABASE
 * -----------------
 * Supabase / PostgreSQL access not provided.
 * This mock allows the server to start without DB connection.
 */

export const db = {
  user: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => data,
  },
  product: {
    findMany: async () => [],
  },
} as any;
