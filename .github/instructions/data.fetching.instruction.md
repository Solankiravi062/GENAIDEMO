---
description: Read this file to learn how to fetch data from the database in your application.
---
# Data Fetching Guidelines 
This document provides guidelines on how to fetch data from the database in your application. It covers best practices, recommended libraries, and important constraints to ensure efficient and secure data fetching.

## 1. Use server components for data fetching
In Next.js, ALWAYS using server components for data fetching. NEVER use client Components to fetch data.
 
## 2. Data Fetching Methods
ALWAYS use the helper function in the /data directory to fech data. NEVER fetch data directly in the components.

ALL helper function in the /data directory should use Drizzle ORM for database interactions.
