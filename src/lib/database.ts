import { MongoClient, Db } from "mongodb";

type MongoCache = {
  clientPromises?: Map<string, Promise<MongoClient>>;
};

const globalForMongo = globalThis as typeof globalThis & MongoCache;

const DEFAULT_DB_NAME = "sosync_portfolio";

/**
 * Extract database name from MONGODB_URI or fallback to default
 */
export function getDatabaseName(): string {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    `mongodb://localhost:27017/${DEFAULT_DB_NAME}`;
  const lastSegment = uri.split("/").pop() || "";
  const withoutQuery = lastSegment.split("?")[0];
  const dbName = withoutQuery.trim();
  return dbName || DEFAULT_DB_NAME;
}

/**
 * Get or initialize cached MongoClient instance with serverless-optimized pool
 */
export async function getMongoClient(uri?: string): Promise<MongoClient> {
  const targetUri =
    uri ||
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    `mongodb://localhost:27017/${DEFAULT_DB_NAME}`;

  if (!globalForMongo.clientPromises) {
    globalForMongo.clientPromises = new Map();
  }

  const existing = globalForMongo.clientPromises.get(targetUri);
  if (existing) {
    return existing;
  }

  const clientPromise = (async () => {
    const client = new MongoClient(targetUri, {
      // Keep pool small per Vercel serverless instance to avoid Atlas connection spikes
      maxPoolSize: 1,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 20_000,
      connectTimeoutMS: 20_000,
    });

    await client.connect();
    return client;
  })().catch((error) => {
    // Delete failed promise so future attempts re-connect
    globalForMongo.clientPromises?.delete(targetUri);
    throw error;
  });

  globalForMongo.clientPromises.set(targetUri, clientPromise);
  return clientPromise;
}

/**
 * Get connected Db instance for direct native Mongo operations
 */
export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName || getDatabaseName());
}

/**
 * Single function call helper to execute queries with automatic connection handling,
 * reducing concurrent open connections across Vercel serverless instances.
 */
export async function withDatabase<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const db = await getDatabase();
  return await fn(db);
}

