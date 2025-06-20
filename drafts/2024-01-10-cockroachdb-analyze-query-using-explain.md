---
layout: post
title: CockroachDB:Analyze Query using Explain
date: '2024-01-10 22:20:28 +0530'
---

## Explain Command

```
explain SELECT * FROM movr.vehicles WHERE battery = 10;
```

```
distribution: local
vectorized: true

• filter
│ estimated row count: 1
│ filter: battery = 10
│
└── • scan
      estimated row count: 1 (100% of the table; stats collected 1 minute ago)
      table: vehicles@vehicles_pkey
      spans: FULL SCAN

index recommendations: 1
1. type: index creation
   SQL command: CREATE INDEX ON movr.public.vehicles (battery) STORING (in_use, vehicle_type);
```

It seems like you are looking at a query execution plan or a recommendation related to a database query. Let's break down the information provided:

1. **Distribution:** This query seems to be executed locally, which means it is not distributed across multiple nodes.

2. **Vectorized:** The query is vectorized, which implies that it is designed to process multiple elements at once, potentially leading to better performance.

3. **Filter:** The query is applying a filter on the "battery" column where the value should be equal to 10.

4. **Scan:** The scan operation on the "vehicles" table is estimating a row count of 1. It is a full scan, meaning it's going through the entire table.

5. **Index Recommendations:** There is a recommendation for creating an index on the "battery" column of the "vehicles" table, including the columns "in_use" and "vehicle_type" as stored columns in the index. This index is suggested to optimize the query's performance by allowing faster access to the rows that meet the filter condition.

Here is the suggested SQL command for creating the index:

```sql
CREATE INDEX ON movr.public.vehicles (battery) STORING (in_use, vehicle_type);
```

This index is expected to improve the performance of queries that filter based on the "battery" column and retrieve the values of "in_use" and "vehicle_type" without needing to perform additional lookups in the main table.

```
distribution: local
vectorized: true

• scan
  estimated row count: 1 (100% of the table; stats collected 19 minutes ago)
  table: vehicles@vehicles_battery_idx
  spans: [/10 - /10]
```

## Explain Analyze Command


```
explain analyze SELECT * FROM movr.vehicles WHERE battery = 10;
```



```
planning time: 537µs
execution time: 1ms
distribution: local
vectorized: true
rows read from KV: 4 (244 B, 1 gRPC calls)
cumulative time spent in KV: 1ms
maximum memory usage: 20 KiB
network usage: 0 B (0 messages)
regions: gcp-asia-southeast1
sql cpu time: 30µs
estimated RUs consumed: 0

• scan
  nodes: n1
  regions: gcp-asia-southeast1
  actual row count: 4
  KV time: 1ms
  KV contention time: 0µs
  KV rows read: 4
  KV bytes read: 244 B
  KV gRPC calls: 1
  estimated max memory allocated: 20 KiB
  sql cpu time: 30µs
  estimated row count: 4 (13% of the table; stats collected 22 seconds ago)
  table: vehicles@vehicles_battery_idx
  spans: [/10 - /10]
```

```
It looks like you have provided details about the execution of a query or operation in a database. Let's break down the information:

1. **Planning Time:** The time taken for query planning is 537µs (microseconds).

2. **Execution Time:** The actual execution time for the query is 1ms (milliseconds).

3. **Distribution:** The query is executed locally, indicating that it is not distributed across multiple nodes.

4. **Vectorized:** The query is vectorized, which means it is designed to process multiple elements at once for potential performance improvements.

5. **Rows Read from KV (Key-Value store):** The query read 4 rows from the Key-Value store, totaling 244 bytes. This operation required 1 gRPC call.

6. **Cumulative Time Spent in KV:** The total time spent interacting with the Key-Value store is 1ms.

7. **Maximum Memory Usage:** The maximum amount of memory used during the query execution is 20 KiB.

8. **Network Usage:** The query did not involve any network usage, as indicated by 0 bytes transferred in 0 messages.

9. **Regions:** The operation was performed in the "gcp-asia-southeast1" region.

10. **SQL CPU Time:** The CPU time spent executing the SQL statement is 30µs.

11. **Estimated RUs Consumed:** The estimated Resource Units (RUs) consumed by the query is 0, which suggests minimal impact on the database resources.

12. **Scan:** The main operation is a scan on the "vehicles_battery_idx" index. It reads 4 rows with a total estimated row count of 4 (13% of the table). The scan spans the range of keys corresponding to the value "/10 - /10" in the "battery" column.

This information provides insights into the performance and resource utilization of the specific query or operation. It's important to consider these metrics for optimization and monitoring the overall health of your database system.
```