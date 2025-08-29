import { printSchema } from "graphql";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { schema } from "../lib/graphql/schema.js";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Print the schema to a string
const schemaString = printSchema(schema);

// Write to file
const outputPath = resolve(__dirname, "../../schema.graphql");
writeFileSync(outputPath, schemaString);

console.log(`✅ Schema exported to ${outputPath}`);
