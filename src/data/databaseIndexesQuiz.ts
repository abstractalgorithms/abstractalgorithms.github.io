export const databaseIndexesQuizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a database index?",
    options: [
      "To store data in compressed format",
      "To improve the speed of data retrieval operations",
      "To ensure data consistency across transactions", 
      "To backup database data automatically"
    ],
    correctAnswer: 1,
    explanation: "Database indexes are data structures that improve the speed of data retrieval operations on database tables, though they come with additional space and maintenance overhead."
  },
  {
    id: 2,
    question: "Which index type is most commonly used in relational databases?",
    options: [
      "Hash Index",
      "Bitmap Index", 
      "B-Tree Index",
      "Full-Text Index"
    ],
    correctAnswer: 2,
    explanation: "B-Tree indexes are the most common type used in relational databases because they support range queries, sorting operations, and equality searches efficiently."
  },
  {
    id: 3,
    question: "What is the time complexity of a lookup operation in a well-designed B-Tree index?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    correctAnswer: 1,
    explanation: "B-Tree indexes provide O(log n) time complexity for lookup operations because they maintain a balanced tree structure where you can eliminate half the remaining data at each level."
  },
  {
    id: 4,
    question: "When are Hash indexes most appropriate?",
    options: [
      "For range queries like WHERE age BETWEEN 25 AND 35",
      "For sorting operations with ORDER BY",
      "For exact equality searches only",
      "For full-text search operations"
    ],
    correctAnswer: 2,
    explanation: "Hash indexes are optimized for exact equality searches only. They cannot support range queries, sorting operations, or partial matches."
  },
  {
    id: 5,
    question: "What is a composite index?",
    options: [
      "An index that combines multiple tables",
      "An index built on multiple columns",
      "An index that stores compressed data",
      "An index that supports multiple data types"
    ],
    correctAnswer: 1,
    explanation: "A composite index (also called multi-column index) is built on multiple columns of a table and can optimize queries that filter or sort on those columns."
  },
  {
    id: 6,
    question: "Which database operation becomes slower when you add more indexes to a table?",
    options: [
      "SELECT operations",
      "JOIN operations",
      "INSERT operations",
      "Query planning"
    ],
    correctAnswer: 2,
    explanation: "INSERT operations become slower with more indexes because each index must be updated when new data is inserted. UPDATE and DELETE operations are also affected."
  },
  {
    id: 7,
    question: "What is a covering index?",
    options: [
      "An index that covers multiple tables",
      "An index that includes all columns needed for a query",
      "An index that covers the entire database",
      "An index that protects against data corruption"
    ],
    correctAnswer: 1,
    explanation: "A covering index includes all the columns needed to satisfy a query, allowing the database to return results directly from the index without accessing the table data."
  },
  {
    id: 8,
    question: "In which scenario would you consider using a partial index?",
    options: [
      "When you want to index all rows in a table",
      "When you only need to index rows that meet certain conditions",
      "When you want to split an index across multiple disks",
      "When you need to index large text fields"
    ],
    correctAnswer: 1,
    explanation: "Partial indexes are useful when you only need to index a subset of rows that meet specific conditions, reducing index size and maintenance overhead."
  },
  {
    id: 9,
    question: "What is index fragmentation?",
    options: [
      "When an index is split across multiple files",
      "When index pages are not stored in logical order",
      "When an index contains duplicate values",
      "When an index is corrupted"
    ],
    correctAnswer: 1,
    explanation: "Index fragmentation occurs when index pages are not stored in logical order on disk, leading to decreased performance. Regular maintenance can help reduce fragmentation."
  },
  {
    id: 10,
    question: "Which index type is best suited for data warehousing with low-cardinality columns?",
    options: [
      "B-Tree Index",
      "Hash Index",
      "Bitmap Index",
      "Full-Text Index"
    ],
    correctAnswer: 2,
    explanation: "Bitmap indexes are ideal for data warehousing scenarios with low-cardinality columns (few distinct values) as they provide efficient storage and fast analytical queries."
  },
  {
    id: 11,
    question: "What is the primary benefit of clustered indexes?",
    options: [
      "They take up less storage space",
      "They can be created on multiple columns",
      "Data rows are stored in the same order as the index",
      "They support faster INSERT operations"
    ],
    correctAnswer: 2,
    explanation: "Clustered indexes physically order the data rows in the same sequence as the index key, which can significantly improve performance for range queries and ordered access."
  },
  {
    id: 12,
    question: "When designing indexes for a high-traffic e-commerce application, what should be your primary consideration?",
    options: [
      "Create indexes on every column to maximize speed",
      "Only create indexes on primary keys",
      "Balance query performance with write overhead",
      "Use only hash indexes for maximum performance"
    ],
    correctAnswer: 2,
    explanation: "The key is balancing query performance improvements with the overhead of maintaining indexes during write operations. Too many indexes can slow down writes significantly."
  }
]
