export const systemDesignIntroQuizQuestions = [
  {
    id: 1,
    question: "Which phase should be completed FIRST in a system design interview?",
    options: [
      "Database schema design",
      "Functional requirements clarification",
      "Technology stack selection",
      "Load balancing strategy"
    ],
    correctAnswer: 1,
    explanation: "Always start by understanding WHAT the system needs to do before deciding HOW to build it. Clarifying functional requirements helps define the problem scope clearly and guides all subsequent design decisions."
  },
  {
    id: 2,
    question: "For a system expecting 100M daily active users, which scaling approach is generally preferred?",
    options: [
      "Vertical scaling (scale up) - bigger, more powerful servers",
      "Horizontal scaling (scale out) - more servers of the same size",
      "Always use the latest cutting-edge technology",
      "Optimize for perfect consistency at all costs"
    ],
    correctAnswer: 1,
    explanation: "Horizontal scaling is preferred for large-scale systems because it's cost-effective (commodity hardware is cheaper), provides fault tolerance (system remains available if individual servers fail), allows linear growth, and eliminates single points of failure."
  },
  {
    id: 3,
    question: "For a social media feed system, which CAP theorem combination would you typically choose?",
    options: [
      "Consistency + Partition Tolerance (sacrifice Availability)",
      "Availability + Partition Tolerance (sacrifice Consistency)",
      "Consistency + Availability (sacrifice Partition Tolerance)",
      "All three equally (CAP theorem doesn't apply)"
    ],
    correctAnswer: 1,
    explanation: "Social media feeds typically choose AP over C because users expect the app to always work, eventual consistency is acceptable (slightly delayed posts/likes won't break the experience), and global systems must handle network partitions."
  },
  {
    id: 4,
    question: "If a system has 10M DAU and each user performs 20 actions per day, what's the average QPS?",
    options: [
      "200 QPS",
      "2,000 QPS",
      "2,315 QPS",
      "20,000 QPS"
    ],
    correctAnswer: 2,
    explanation: "Total actions per day: 10M × 20 = 200M actions/day. Seconds per day: 24 × 60 × 60 = 86,400 seconds. Average QPS: 200,000,000 ÷ 86,400 = 2,315 QPS. Remember: peak traffic is typically 3-5x average."
  },
  {
    id: 5,
    question: "Which database type is best for storing user relationship data (friends, followers)?",
    options: [
      "Relational Database (MySQL, PostgreSQL)",
      "Document Database (MongoDB)",
      "Graph Database (Neo4j)",
      "Key-Value Store (Redis)"
    ],
    correctAnswer: 2,
    explanation: "Graph databases excel at relationship queries because relationships are first-class citizens, traversal efficiency is optimized (finding 'friends of friends'), complex queries are easy (mutual connections, shortest paths), and performance doesn't degrade with data size."
  },
  {
    id: 6,
    question: "For a read-heavy system (90% read, 10% write), which caching pattern is most appropriate?",
    options: [
      "Write-through cache",
      "Write-behind (write-back) cache",
      "Cache-aside (lazy loading)",
      "Refresh-ahead cache"
    ],
    correctAnswer: 2,
    explanation: "Cache-aside is ideal for read-heavy workloads because it's efficient (only frequently accessed data gets cached), simple (application controls what and when to cache), memory-optimized (doesn't waste cache space), and flexible (easy cache invalidation)."
  },
  {
    id: 7,
    question: "What's the main principle for decomposing a monolith into microservices?",
    options: [
      "One service per database table",
      "Services should be small and single-purpose",
      "Split by business domain boundaries",
      "Each team should own exactly one service"
    ],
    correctAnswer: 2,
    explanation: "Domain-driven design is the key principle. Business logic stays cohesive, deployments are independent, teams can own complete business capabilities, and each domain manages its own data. Examples: User Management, Order Processing, Content Management."
  }
]

export const urlShortenerQuizQuestions = [
  {
    id: 1,
    question: "What are the main trade-offs between counter-based and hash-based URL encoding?",
    options: [
      "Counter-based is always better due to simplicity",
      "Hash-based is always better due to distribution",
      "Counter-based: no collisions but sequential patterns; Hash-based: distributed but possible collisions",
      "Both approaches are identical in performance and security"
    ],
    correctAnswer: 2,
    explanation: "Counter-based approach has no collisions and simple implementation but creates sequential patterns and has a single point of failure. Hash-based allows distributed generation with no central counter but has possible collisions requiring collision handling."
  },
  {
    id: 2,
    question: "Why should a URL shortener use 301 redirect instead of 302 for most use cases?",
    options: [
      "301 redirects are faster to process",
      "301 redirects can be cached by browsers, reducing server load",
      "302 redirects don't work with all browsers",
      "301 redirects use less bandwidth"
    ],
    correctAnswer: 1,
    explanation: "301 (Permanent Redirect) allows browsers to cache the redirect, reducing server load and providing better SEO. The trade-off is that it's harder to change the destination URL later. Use 302 for temporary campaigns or A/B testing where flexibility is needed."
  },
  {
    id: 3,
    question: "How would you handle a viral URL that suddenly gets 1M clicks per minute?",
    options: [
      "Increase database connection pool size only",
      "Add more web servers and hope for the best",
      "Implement CDN caching, circuit breakers, auto-scaling, and read replicas",
      "Rate limit all users to prevent the spike"
    ],
    correctAnswer: 2,
    explanation: "A comprehensive approach includes: CDN caching at edge locations, circuit breakers to protect analytics service, auto-scaling for web servers, database read replicas for load distribution, plus long-term solutions like pre-warming and intelligent rate limiting."
  },
  {
    id: 4,
    question: "What's the optimal approach for generating 7-character short codes that can handle 3.5 trillion URLs?",
    options: [
      "Use UUID and truncate to 7 characters",
      "Use Base62 encoding with auto-incrementing counter",
      "Use MD5 hash and take first 7 characters",
      "Use timestamp-based encoding"
    ],
    correctAnswer: 1,
    explanation: "Base62 encoding (a-z, A-Z, 0-9) with auto-incrementing counter provides 62^7 = 3.5 trillion possible URLs, guarantees no collisions, has predictable generation, and is simple to implement. Use multiple counter ranges across servers for high availability."
  },
  {
    id: 5,
    question: "For a URL shortener with 100:1 read/write ratio, what's the best caching strategy?",
    options: [
      "Cache only database queries, not URL mappings",
      "Multi-layer caching: browser cache, CDN, application cache with 99% hit ratio target",
      "Cache writes but not reads to improve performance",
      "Use database caching only, no application-level cache"
    ],
    correctAnswer: 1,
    explanation: "Multi-layer caching maximizes efficiency: browser cache (1 hour TTL for 301 redirects), CDN cache (popular URLs at edge), application cache (Redis with 24-hour TTL, LRU eviction, targeting 99% hit ratio). This handles the read-heavy workload optimally."
  }
]

export const chatSystemQuizQuestions = [
  {
    id: 1,
    question: "For a chat system handling 1 billion users, what's the most critical architectural decision?",
    options: [
      "Choosing between REST and GraphQL APIs",
      "Selecting the right database (SQL vs NoSQL)",
      "Designing for real-time communication with WebSockets and message ordering",
      "Implementing user authentication and authorization"
    ],
    correctAnswer: 2,
    explanation: "Real-time communication is the core challenge of chat systems. This requires WebSocket connections for instant messaging, message ordering guarantees, presence management, and handling connection drops/reconnections across global scale."
  },
  {
    id: 2,
    question: "How should you handle message delivery guarantees in a distributed chat system?",
    options: [
      "Use database transactions for every message",
      "Implement at-least-once delivery with idempotent message processing",
      "Use exactly-once delivery for all messages",
      "Cache all messages in memory for speed"
    ],
    correctAnswer: 1,
    explanation: "At-least-once delivery with idempotent processing is practical for chat systems. Messages may be delivered multiple times during network issues, but idempotent processing (using message IDs) ensures duplicates are handled gracefully. Exactly-once is theoretically impossible in distributed systems."
  },
  {
    id: 3,
    question: "For group chat with 500 members, what's the best message fanout strategy?",
    options: [
      "Send individual messages to each member synchronously",
      "Use message queues with async fanout to handle delivery",
      "Store message once and let members poll for updates",
      "Use broadcast to all users and filter client-side"
    ],
    correctAnswer: 1,
    explanation: "Async fanout using message queues allows the system to handle group message delivery efficiently. The message is queued once and workers fan out to individual member connections, handling offline users and delivery failures gracefully."
  },
  {
    id: 4,
    question: "How should you implement online presence status for millions of concurrent users?",
    options: [
      "Update database on every user action",
      "Use heartbeat mechanism with eventual consistency and TTL-based status",
      "Poll all users every few seconds",
      "Maintain presence in application memory only"
    ],
    correctAnswer: 1,
    explanation: "Heartbeat mechanism with TTL (time-to-live) based status is efficient: clients send periodic heartbeats, server maintains presence with TTL expiration, eventual consistency is acceptable for presence (slight delays won't break user experience), and it scales to millions of users."
  },
  {
    id: 5,
    question: "What's the optimal database strategy for chat message storage?",
    options: [
      "Single global database for all messages",
      "Shard by user ID for even distribution",
      "Shard by conversation ID to keep related messages together",
      "Use only in-memory storage for performance"
    ],
    correctAnswer: 2,
    explanation: "Sharding by conversation ID keeps related messages on the same shard, enabling efficient conversation history queries, message ordering within conversations, and optimal query performance. User-based sharding would scatter conversation messages across shards."
  }
]

export const socialMediaQuizQuestions = [
  {
    id: 1,
    question: "For a social media feed serving 500M users, what's the biggest architectural challenge?",
    options: [
      "User authentication and security",
      "Timeline generation and content delivery at scale",
      "Database schema design",
      "Image and video storage"
    ],
    correctAnswer: 1,
    explanation: "Timeline generation is the core challenge: aggregating posts from thousands of friends, ranking content by relevance/time, handling real-time updates, and delivering personalized feeds to millions of users simultaneously while maintaining sub-second response times."
  },
  {
    id: 2,
    question: "Which timeline generation strategy works best for users with many followers (celebrities)?",
    options: [
      "Push model: pre-compute all followers' timelines",
      "Pull model: generate timeline on request",
      "Hybrid model: push for normal users, pull for celebrities",
      "Cache all possible combinations"
    ],
    correctAnswer: 2,
    explanation: "Hybrid approach optimizes for different user types: push model for normal users (pre-compute timelines for faster reads), pull model for celebrities (avoid fanout explosion to millions), and smart caching strategies. This balances write amplification with read performance."
  },
  {
    id: 3,
    question: "How should you handle viral content that gets millions of interactions?",
    options: [
      "Use stronger database servers",
      "Implement aggressive caching, CDN distribution, and rate limiting",
      "Temporarily disable the viral post",
      "Increase all server capacities equally"
    ],
    correctAnswer: 1,
    explanation: "Viral content requires: aggressive caching at multiple layers (CDN, application, database), global CDN distribution for static content, intelligent rate limiting to prevent system overload, auto-scaling for compute resources, and graceful degradation strategies."
  },
  {
    id: 4,
    question: "What's the optimal approach for storing and serving user-generated content (images, videos)?",
    options: [
      "Store everything in the main database",
      "Use object storage (S3) with CDN for global distribution",
      "Use local file system on web servers",
      "Cache all media in application memory"
    ],
    correctAnswer: 1,
    explanation: "Object storage (S3, Google Cloud Storage) with CDN provides: virtually unlimited scalability, 99.999999999% durability, global edge distribution for fast access, automatic compression and format optimization, and cost-effective storage tiers for different access patterns."
  },
  {
    id: 5,
    question: "How should you implement real-time notifications for likes, comments, and mentions?",
    options: [
      "Poll the database every few seconds",
      "Use WebSockets with message queues for reliable delivery",
      "Send email notifications only",
      "Update notifications in batch jobs"
    ],
    correctAnswer: 1,
    explanation: "Real-time notifications require: WebSocket connections for instant delivery, message queues for reliable processing, fanout services for mentions/tags, push notification services for mobile, graceful fallback for connection issues, and user preference controls."
  }
]

export const videoStreamingQuizQuestions = [
  {
    id: 1,
    question: "What's the most critical component for a global video streaming service like YouTube?",
    options: [
      "High-performance database servers",
      "Content Delivery Network (CDN) with global edge locations",
      "Advanced video compression algorithms",
      "User authentication and security"
    ],
    correctAnswer: 1,
    explanation: "CDN is critical for video streaming: reduces latency by serving content from nearby edge locations, handles massive bandwidth requirements (videos are large), provides scalability for global audience, and reduces origin server load by caching popular content worldwide."
  },
  {
    id: 2,
    question: "How should you handle video processing for a platform receiving 500 hours of video uploads per minute?",
    options: [
      "Process videos synchronously as they're uploaded",
      "Use async processing with multiple quality formats and queues",
      "Store original videos only, process on demand",
      "Limit upload quality to reduce processing needs"
    ],
    correctAnswer: 1,
    explanation: "Async processing is essential: videos are queued for background processing, multiple formats/qualities generated (240p, 480p, 720p, 1080p, 4K), different codecs for device compatibility (H.264, VP9, AV1), and thumbnail generation. This prevents blocking uploads and handles scale."
  },
  {
    id: 3,
    question: "What's the optimal storage strategy for video files that can be petabytes in size?",
    options: [
      "Store everything on high-performance SSDs",
      "Use tiered storage: hot (SSD), warm (HDD), cold (archive)",
      "Compress all videos to reduce storage costs",
      "Delete old videos to manage storage"
    ],
    correctAnswer: 1,
    explanation: "Tiered storage optimizes cost and performance: hot tier (SSD) for recently uploaded/popular content, warm tier (HDD) for moderately accessed content, cold tier (archive/glacier) for old content. This balances access speed with storage costs for different usage patterns."
  },
  {
    id: 4,
    question: "How should you implement adaptive bitrate streaming for varying network conditions?",
    options: [
      "Always stream highest quality available",
      "Let users manually select video quality",
      "Generate multiple quality segments and switch based on bandwidth",
      "Use single quality with compression"
    ],
    correctAnswer: 2,
    explanation: "Adaptive bitrate streaming (HLS, DASH) creates multiple quality segments, monitors client bandwidth and buffer health, automatically switches quality to prevent buffering, provides smooth viewing experience across devices and network conditions, and optimizes for both quality and reliability."
  },
  {
    id: 5,
    question: "What's the best approach for handling live streaming with minimal latency?",
    options: [
      "Use traditional video processing pipelines",
      "Implement WebRTC for real-time communication",
      "Use optimized protocols (WebRTC, SRT) with edge processing",
      "Increase server capacity for faster processing"
    ],
    correctAnswer: 2,
    explanation: "Low-latency live streaming requires: optimized protocols (WebRTC for sub-second, SRT for broadcast), edge computing for processing closer to users, reduced segment sizes in streaming protocols, specialized encoding for real-time constraints, and global infrastructure for minimal hops."
  }
]

export const distributedCacheQuizQuestions = [
  {
    id: 1,
    question: "What's the primary challenge when designing a distributed cache like Redis at scale?",
    options: [
      "Memory capacity limitations",
      "Data consistency and replication across nodes",
      "Network bandwidth optimization",
      "User authentication and access control"
    ],
    correctAnswer: 1,
    explanation: "Data consistency and replication are critical: ensuring data consistency across cache nodes, handling node failures gracefully, managing cache invalidation strategies, balancing consistency vs performance, and implementing proper replication strategies (master-slave, master-master)."
  },
  {
    id: 2,
    question: "For a distributed cache serving 1M QPS, what's the optimal partitioning strategy?",
    options: [
      "Random distribution across all nodes",
      "Consistent hashing with virtual nodes",
      "Range-based partitioning by key",
      "Manual assignment of keys to nodes"
    ],
    correctAnswer: 1,
    explanation: "Consistent hashing with virtual nodes provides: even load distribution across nodes, minimal data movement when nodes are added/removed, hot spot prevention through virtual nodes, predictable key location for routing, and scalability without global coordination."
  },
  {
    id: 3,
    question: "How should you handle cache eviction when memory is full?",
    options: [
      "Random eviction of any keys",
      "First In, First Out (FIFO) eviction",
      "Least Recently Used (LRU) with TTL considerations",
      "Never evict, just add more memory"
    ],
    correctAnswer: 2,
    explanation: "LRU with TTL provides optimal eviction: removes least recently used keys first, respects explicit TTL expiration, maintains cache efficiency by keeping hot data, handles both time-based and access-based eviction, and adapts to changing access patterns automatically."
  },
  {
    id: 4,
    question: "What's the best approach for cache warming in a distributed system?",
    options: [
      "Load all data at startup",
      "Predictive loading based on access patterns and gradual warming",
      "Wait for cache misses to populate data",
      "Copy data from another cache cluster"
    ],
    correctAnswer: 1,
    explanation: "Predictive cache warming: analyzes historical access patterns, gradually warms cache to avoid thundering herd, prioritizes high-value/frequently accessed data, coordinates warming across cluster nodes, and balances between proactive loading and resource utilization."
  },
  {
    id: 5,
    question: "How should you implement cache invalidation in a multi-region setup?",
    options: [
      "Invalidate all regions simultaneously",
      "Use eventual consistency with conflict resolution",
      "Pub/Sub notifications with eventual consistency across regions",
      "Manual invalidation per region"
    ],
    correctAnswer: 2,
    explanation: "Pub/Sub with eventual consistency: publishes invalidation events to all regions, handles network partitions gracefully, allows regions to operate independently, provides eventual consistency across global deployments, and includes conflict resolution for concurrent updates."
  }
]
