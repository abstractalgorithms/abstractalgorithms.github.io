#!/bin/bash

# Script to create GitHub issues for blog content topics
# This script creates issues for all suggested blog topics with appropriate labels

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}GitHub CLI (gh) is not installed. Please install it first:${NC}"
    echo "https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}Please authenticate with GitHub CLI first:${NC}"
    echo "gh auth login"
    exit 1
fi

echo -e "${BLUE}Creating GitHub issues for Abstract Algorithms blog content...${NC}"

# Security Series Issues
echo -e "${GREEN}Creating Security Series issues...${NC}"

gh issue create \
    --title "🔒 Threat Modeling with STRIDE" \
    --body "## Overview
Create a comprehensive guide on threat modeling using the STRIDE methodology.

## Content Outline
- Introduction to threat modeling
- STRIDE framework breakdown (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
- Practical examples and case studies
- Tools for threat modeling (Microsoft Threat Modeling Tool, OWASP Threat Dragon)
- Integration with development workflow

## Target Audience
Security engineers, software architects, senior developers

## SEO Keywords
- threat modeling
- STRIDE methodology
- application security
- security architecture

## Estimated Time
2-3 weeks (research + writing + diagrams)" \
    --label "content-type:tutorial,topic:security,difficulty:intermediate,priority:high,status:research"

gh issue create \
    --title "🔐 Secure Session Management Deep Dive" \
    --body "## Overview
Complete guide to secure session management including cookie flags, token expiry, and refresh rotation.

## Content Outline
- Session vs Token-based authentication
- Cookie security flags (HttpOnly, Secure, SameSite)
- Token expiry strategies
- Refresh token rotation
- Session fixation and hijacking prevention
- Implementation examples in different frameworks

## Target Audience
Full-stack developers, security engineers

## SEO Keywords
- session management
- cookie security
- JWT tokens
- authentication security

## Estimated Time
2 weeks" \
    --label "content-type:deep-dive,topic:security,difficulty:intermediate,priority:high,status:research"

gh issue create \
    --title "🧩 OAuth2 vs OpenID vs SAML Comparison" \
    --body "## Overview
Visual comparison of OAuth2, OpenID Connect, and SAML with diagrams and use cases.

## Content Outline
- Protocol overview and history
- Flow diagrams for each protocol
- Use case scenarios
- Security considerations
- Implementation examples
- When to use which protocol

## Target Audience
Backend developers, security architects, DevOps engineers

## SEO Keywords
- OAuth2 vs SAML
- OpenID Connect
- authentication protocols
- SSO comparison

## Estimated Time
3 weeks (complex diagrams needed)" \
    --label "content-type:tutorial,topic:security,difficulty:intermediate,priority:high,status:research"

gh issue create \
    --title "💣 Common OAuth Misconfigurations & How to Avoid Them" \
    --body "## Overview
Practical guide to OAuth security pitfalls and best practices.

## Content Outline
- Common misconfiguration patterns
- Real-world vulnerability examples
- Security best practices
- Configuration checklists
- Testing and validation strategies

## Target Audience
Backend developers, security engineers

## SEO Keywords
- OAuth security
- OAuth vulnerabilities
- authentication security
- OWASP OAuth

## Estimated Time
2 weeks" \
    --label "content-type:tutorial,topic:security,difficulty:intermediate,priority:high,status:research"

# Algorithms & Data Structures Issues
echo -e "${GREEN}Creating Algorithms & Data Structures issues...${NC}"

gh issue create \
    --title "📊 Advanced Data Structures: Trie, Segment Tree, and DSU" \
    --body "## Overview
Deep dive into advanced data structures with visual explanations and practical applications.

## Content Outline
- Trie (Prefix Tree) implementation and use cases
- Segment Tree for range queries
- Disjoint Set Union (DSU) with path compression
- Performance analysis and comparisons
- Real-world applications

## Target Audience
Intermediate to advanced developers, interview candidates

## SEO Keywords
- trie data structure
- segment tree
- disjoint set union
- advanced algorithms

## Estimated Time
3-4 weeks (complex visualizations needed)" \
    --label "content-type:deep-dive,topic:algorithms,difficulty:advanced,priority:medium,status:research"

gh issue create \
    --title "🧭 Graph Algorithms with Interactive Visualizations" \
    --body "## Overview
Visual guide to graph algorithms including DFS, BFS, Dijkstra, and A* with interactive demos.

## Content Outline
- Graph representation methods
- Depth-First Search (DFS) with visualization
- Breadth-First Search (BFS) with visualization
- Dijkstra's shortest path algorithm
- A* pathfinding algorithm
- Interactive playground

## Target Audience
Computer science students, interview candidates, game developers

## SEO Keywords
- graph algorithms
- Dijkstra algorithm
- A star pathfinding
- algorithm visualization

## Estimated Time
4-5 weeks (interactive components needed)" \
    --label "content-type:tutorial,topic:algorithms,difficulty:intermediate,priority:medium,status:research"

gh issue create \
    --title "🧵 Time-Space Complexity Tradeoffs in Real Systems" \
    --body "## Overview
Practical guide to complexity analysis in production systems with real-world examples.

## Content Outline
- Big O notation review
- Space-time tradeoff examples
- Caching strategies and complexity
- Database query optimization
- Memory vs computation tradeoffs
- Performance profiling techniques

## Target Audience
Senior developers, system architects, performance engineers

## SEO Keywords
- time complexity
- space complexity
- algorithm optimization
- performance tuning

## Estimated Time
2-3 weeks" \
    --label "content-type:deep-dive,topic:algorithms,difficulty:intermediate,priority:medium,status:research"

gh issue create \
    --title "🧩 Cache Invalidation Algorithms: LRU, LFU, and ARC" \
    --body "## Overview
Comprehensive guide to cache replacement algorithms with implementation examples.

## Content Outline
- Cache invalidation strategies
- LRU (Least Recently Used) implementation
- LFU (Least Frequently Used) implementation
- ARC (Adaptive Replacement Cache) algorithm
- Performance comparisons
- Use case scenarios

## Target Audience
Backend developers, system architects, performance engineers

## SEO Keywords
- cache invalidation
- LRU algorithm
- LFU algorithm
- cache replacement

## Estimated Time
2-3 weeks" \
    --label "content-type:deep-dive,topic:algorithms,difficulty:intermediate,priority:medium,status:research"

# System Design Issues
echo -e "${GREEN}Creating System Design issues...${NC}"

gh issue create \
    --title "🧮 Designing a URL Shortener (Complete System)" \
    --body "## Overview
End-to-end system design for a URL shortener service like bit.ly with Redis, rate limiting, and analytics.

## Content Outline
- Requirements gathering and estimation
- Database design and sharding
- URL encoding algorithms (Base62)
- Redis caching strategy
- Rate limiting implementation
- Analytics and tracking
- CDN and geographic distribution
- Monitoring and alerting

## Target Audience
Senior developers, system architects, interview candidates

## SEO Keywords
- system design interview
- URL shortener design
- distributed systems
- system architecture

## Estimated Time
3-4 weeks (comprehensive system design)" \
    --label "content-type:deep-dive,topic:system-design,difficulty:advanced,priority:high,status:research"

gh issue create \
    --title "💬 Designing a Scalable Chat System" \
    --body "## Overview
Complete guide to designing a real-time chat system with WebSockets, message delivery guarantees, and scaling strategies.

## Content Outline
- Real-time communication protocols
- WebSocket vs Server-Sent Events
- Message delivery guarantees
- Database design for chat history
- Presence and typing indicators
- Push notifications
- Horizontal scaling strategies
- Message encryption

## Target Audience
Full-stack developers, system architects, real-time system developers

## SEO Keywords
- chat system design
- WebSocket scaling
- real-time messaging
- distributed chat

## Estimated Time
3-4 weeks" \
    --label "content-type:deep-dive,topic:system-design,difficulty:advanced,priority:high,status:research"

gh issue create \
    --title "🪵 Log Aggregation Architectures: ELK vs Loki vs FluentBit" \
    --body "## Overview
Comparison of log aggregation systems with implementation guides and performance analysis.

## Content Outline
- Log aggregation patterns
- ELK Stack (Elasticsearch, Logstash, Kibana) setup
- Grafana Loki architecture
- FluentBit vs Fluentd comparison
- Performance and cost analysis
- Monitoring and alerting setup
- Best practices for log management

## Target Audience
DevOps engineers, SRE, backend developers

## SEO Keywords
- log aggregation
- ELK stack
- Grafana Loki
- FluentBit
- observability

## Estimated Time
3-4 weeks" \
    --label "content-type:tutorial,topic:devops,difficulty:intermediate,priority:medium,status:research"

gh issue create \
    --title "🔄 Async Messaging Design: Kafka vs RabbitMQ" \
    --body "## Overview
Complete guide to asynchronous messaging patterns with Kafka and RabbitMQ, including retries and idempotency.

## Content Outline
- Message broker comparison
- Kafka architecture and partitioning
- RabbitMQ routing and exchanges
- Retry mechanisms and dead letter queues
- Idempotency patterns
- Performance characteristics
- Use case scenarios

## Target Audience
Backend developers, system architects, distributed systems engineers

## SEO Keywords
- message queue
- Apache Kafka
- RabbitMQ
- asynchronous messaging
- event driven architecture

## Estimated Time
3-4 weeks" \
    --label "content-type:deep-dive,topic:system-design,difficulty:advanced,priority:high,status:research"

# Developer 101 Series
echo -e "${GREEN}Creating Developer 101 Series issues...${NC}"

gh issue create \
    --title "🧪 Unit Testing in Real Projects" \
    --body "## Overview
Practical guide to unit testing with mocking, coverage analysis, and flaky test detection.

## Content Outline
- Testing pyramid and strategies
- Mocking frameworks and best practices
- Code coverage analysis and interpretation
- Flaky test detection and prevention
- Test-driven development (TDD) in practice
- Integration with CI/CD pipelines

## Target Audience
Junior to mid-level developers, QA engineers

## SEO Keywords
- unit testing
- test driven development
- mocking frameworks
- code coverage

## Estimated Time
2-3 weeks" \
    --label "content-type:tutorial,topic:career,difficulty:beginner,priority:medium,status:research"

gh issue create \
    --title "🔍 Advanced Debugging Techniques in Modern IDEs" \
    --body "## Overview
Comprehensive debugging guide for VS Code, Rider, and PyCharm with advanced techniques.

## Content Outline
- Debugging fundamentals and mindset
- Breakpoint strategies and conditional debugging
- Memory and performance profiling
- Remote debugging techniques
- Log-based debugging strategies
- Debugging in different environments (local, staging, production)

## Target Audience
All levels of developers

## SEO Keywords
- debugging techniques
- VS Code debugging
- IDE debugging
- software debugging

## Estimated Time
2-3 weeks" \
    --label "content-type:tutorial,topic:career,difficulty:beginner,priority:medium,status:research"

gh issue create \
    --title "🗃️ Git Beyond Basics: Interactive Rebase, Bisect, and Blame" \
    --body "## Overview
Advanced Git techniques for professional development workflows.

## Content Outline
- Interactive rebase for clean history
- Git bisect for bug hunting
- Advanced branching strategies
- Git hooks and automation
- Troubleshooting common Git issues
- Best practices for team collaboration

## Target Audience
All levels of developers, team leads

## SEO Keywords
- advanced git
- git rebase
- git bisect
- version control

## Estimated Time
2 weeks" \
    --label "content-type:tutorial,topic:career,difficulty:intermediate,priority:medium,status:research"

# Cloud & DevOps Issues
echo -e "${GREEN}Creating Cloud & DevOps issues...${NC}"

gh issue create \
    --title "🏗️ Infrastructure as Code: Terraform vs Pulumi vs CDK" \
    --body "## Overview
Comprehensive comparison of Infrastructure as Code tools with practical examples.

## Content Outline
- IaC principles and benefits
- Terraform configuration and state management
- Pulumi multi-language approach
- AWS CDK for cloud-native development
- Comparison matrix and use cases
- Migration strategies between tools

## Target Audience
DevOps engineers, cloud architects, SRE

## SEO Keywords
- infrastructure as code
- Terraform vs Pulumi
- AWS CDK
- cloud automation

## Estimated Time
3-4 weeks" \
    --label "content-type:tutorial,topic:devops,difficulty:intermediate,priority:medium,status:research"

gh issue create \
    --title "🔐 Secrets Management: AWS SSM vs HashiCorp Vault" \
    --body "## Overview
Complete guide to secrets management in cloud environments with practical implementations.

## Content Outline
- Secrets management principles
- AWS Systems Manager Parameter Store
- HashiCorp Vault architecture
- Integration with CI/CD pipelines
- Rotation strategies and automation
- Security best practices

## Target Audience
DevOps engineers, security engineers, cloud architects

## SEO Keywords
- secrets management
- HashiCorp Vault
- AWS SSM
- security automation

## Estimated Time
2-3 weeks" \
    --label "content-type:tutorial,topic:devops,difficulty:intermediate,priority:medium,status:research"

# Interview Prep & Career Issues
echo -e "${GREEN}Creating Interview & Career issues...${NC}"

gh issue create \
    --title "🧠 System Design Interview Framework" \
    --body "## Overview
Complete framework for system design interviews with practice problems and solutions.

## Content Outline
- System design interview process
- Requirements gathering framework
- Estimation and capacity planning
- Architecture design patterns
- Practice problems with solutions
- Common mistakes and how to avoid them

## Target Audience
Interview candidates, senior developers, engineering managers

## SEO Keywords
- system design interview
- software engineer interview
- technical interview
- system architecture interview

## Estimated Time
4-5 weeks (comprehensive guide)" \
    --label "content-type:series,topic:career,difficulty:intermediate,priority:high,status:research"

gh issue create \
    --title "👨‍💻 How to Think Like an Enterprise Architect" \
    --body "## Overview
Guide to developing enterprise architecture thinking and decision-making frameworks.

## Content Outline
- Enterprise architecture principles
- Decision-making frameworks
- Technology evaluation criteria
- Stakeholder management
- Architecture documentation
- Migration planning strategies

## Target Audience
Senior developers, technical leads, aspiring architects

## SEO Keywords
- enterprise architecture
- software architecture
- technical leadership
- architecture patterns

## Estimated Time
3-4 weeks" \
    --label "content-type:deep-dive,topic:career,difficulty:advanced,priority:medium,status:research"

# Interactive Content Issues
echo -e "${GREEN}Creating Interactive Content issues...${NC}"

gh issue create \
    --title "🔍 Interactive Hash Table Playground" \
    --body "## Overview
Interactive web application to visualize hash table operations, collisions, and load factor effects.

## Content Outline
- Hash function visualization
- Collision resolution strategies (chaining vs open addressing)
- Load factor impact demonstration
- Performance comparison tools
- Interactive problem-solving exercises

## Target Audience
Computer science students, visual learners, interview candidates

## SEO Keywords
- hash table visualization
- data structure interactive
- hash collision
- algorithm playground

## Estimated Time
5-6 weeks (significant development work)" \
    --label "content-type:tutorial,topic:algorithms,difficulty:intermediate,priority:low,status:research"

gh issue create \
    --title "📊 System Design Sandbox" \
    --body "## Overview
Interactive drag-and-drop system design tool for learning and practicing architecture design.

## Content Outline
- Drag-and-drop component library
- Architecture validation tools
- Performance estimation calculator
- Sharing and collaboration features
- Template gallery

## Target Audience
System design learners, interview candidates, architecture students

## SEO Keywords
- system design tool
- architecture design
- system design practice
- interactive learning

## Estimated Time
8-10 weeks (major development project)" \
    --label "content-type:tutorial,topic:system-design,difficulty:advanced,priority:low,status:research"

echo -e "${GREEN}✅ All issues created successfully!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Visit your GitHub repository's Issues tab"
echo "2. Create a new GitHub Project"
echo "3. Add these issues to your project board"
echo "4. Organize them into the suggested columns"
echo "5. Start working on high-priority items first"

echo -e "${YELLOW}Pro tip:${NC} Use GitHub's issue templates to standardize future content planning!"
