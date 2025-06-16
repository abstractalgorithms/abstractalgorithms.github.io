# PowerShell script to create GitHub issues for blog content topics
# Requires GitHub CLI (gh) to be installed and authenticated

param(
    [switch]$DryRun = $false,
    [string]$Repo = ""
)

Write-Host "🧪 Creating GitHub Issues for Abstract Algorithms Blog Content" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan

# Check if GitHub CLI is installed
try {
    $ghVersion = & gh --version
    Write-Host "✓ GitHub CLI found: $($ghVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub CLI (gh) is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Check if authenticated
try {
    & gh auth status 2>$null
    Write-Host "✓ GitHub CLI authenticated" -ForegroundColor Green
} catch {
    Write-Host "❌ Please authenticate with GitHub CLI first:" -ForegroundColor Red
    Write-Host "gh auth login" -ForegroundColor Yellow
    exit 1
}

if ($DryRun) {
    Write-Host "🔍 DRY RUN MODE - No issues will be created" -ForegroundColor Yellow
}

# Function to create an issue
function New-ContentIssue {
    param(
        [string]$Title,
        [string]$Body,
        [string]$Labels
    )
    
    if ($DryRun) {
        Write-Host "Would create: $Title" -ForegroundColor Cyan
        return
    }
    
    try {
        if ($Repo) {
            & gh issue create --repo $Repo --title $Title --body $Body --label $Labels
        } else {
            & gh issue create --title $Title --body $Body --label $Labels
        }
        Write-Host "✓ Created: $Title" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to create: $Title" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

# Security Series Issues
Write-Host "`n🔐 Creating Security Series issues..." -ForegroundColor Blue

New-ContentIssue -Title "🔒 Threat Modeling with STRIDE" -Body @"
## Overview
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
2-3 weeks (research + writing + diagrams)
"@ -Labels "content-type:tutorial,topic:security,difficulty:intermediate,priority:high,status:research"

New-ContentIssue -Title "🔐 Secure Session Management Deep Dive" -Body @"
## Overview
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
2 weeks
"@ -Labels "content-type:deep-dive,topic:security,difficulty:intermediate,priority:high,status:research"

New-ContentIssue -Title "🧩 OAuth2 vs OpenID vs SAML Comparison" -Body @"
## Overview
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
3 weeks (complex diagrams needed)
"@ -Labels "content-type:tutorial,topic:security,difficulty:intermediate,priority:high,status:research"

# System Design Issues
Write-Host "`n🧱 Creating System Design issues..." -ForegroundColor Blue

New-ContentIssue -Title "🧮 Designing a URL Shortener (Complete System)" -Body @"
## Overview
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
3-4 weeks (comprehensive system design)
"@ -Labels "content-type:deep-dive,topic:system-design,difficulty:advanced,priority:high,status:research"

New-ContentIssue -Title "💬 Designing a Scalable Chat System" -Body @"
## Overview
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
3-4 weeks
"@ -Labels "content-type:deep-dive,topic:system-design,difficulty:advanced,priority:high,status:research"

# Algorithms & Data Structures Issues
Write-Host "`n🧠 Creating Algorithms & Data Structures issues..." -ForegroundColor Blue

New-ContentIssue -Title "📊 Advanced Data Structures: Trie, Segment Tree, and DSU" -Body @"
## Overview
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
3-4 weeks (complex visualizations needed)
"@ -Labels "content-type:deep-dive,topic:algorithms,difficulty:advanced,priority:medium,status:research"

New-ContentIssue -Title "🧭 Graph Algorithms with Interactive Visualizations" -Body @"
## Overview
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
4-5 weeks (interactive components needed)
"@ -Labels "content-type:tutorial,topic:algorithms,difficulty:intermediate,priority:medium,status:research"

# Interview Prep & Career Issues
Write-Host "`n🧑‍🎓 Creating Interview & Career issues..." -ForegroundColor Blue

New-ContentIssue -Title "🧠 System Design Interview Framework" -Body @"
## Overview
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
4-5 weeks (comprehensive guide)
"@ -Labels "content-type:series,topic:career,difficulty:intermediate,priority:high,status:research"

New-ContentIssue -Title "👨‍💻 How to Think Like an Enterprise Architect" -Body @"
## Overview
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
3-4 weeks
"@ -Labels "content-type:deep-dive,topic:career,difficulty:advanced,priority:medium,status:research"

# Developer 101 Series
Write-Host "`n🧰 Creating Developer 101 Series issues..." -ForegroundColor Blue

New-ContentIssue -Title "🧪 Unit Testing in Real Projects" -Body @"
## Overview
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
2-3 weeks
"@ -Labels "content-type:tutorial,topic:career,difficulty:beginner,priority:medium,status:research"

New-ContentIssue -Title "🔍 Advanced Debugging Techniques in Modern IDEs" -Body @"
## Overview
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
2-3 weeks
"@ -Labels "content-type:tutorial,topic:career,difficulty:beginner,priority:medium,status:research"

# Interactive Content Issues
Write-Host "`n📦 Creating Interactive Content issues..." -ForegroundColor Blue

New-ContentIssue -Title "🔍 Interactive Hash Table Playground" -Body @"
## Overview
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
5-6 weeks (significant development work)
"@ -Labels "content-type:tutorial,topic:algorithms,difficulty:intermediate,priority:low,status:research"

Write-Host "`n✅ Issue creation process completed!" -ForegroundColor Green

if (-not $DryRun) {
    Write-Host "`n📋 Next steps:" -ForegroundColor Blue
    Write-Host "1. Visit your GitHub repository's Issues tab"
    Write-Host "2. Create a new GitHub Project (Projects tab)"
    Write-Host "3. Add these issues to your project board"
    Write-Host "4. Organize issues into columns: Ideas & Research → Drafting → Review → Ready to Publish → Published"
    Write-Host "5. Start working on high-priority items first"
    
    Write-Host "`n🎯 Content Strategy Recommendation:" -ForegroundColor Yellow
    Write-Host "Start with Security Series (high priority) → System Design → Interview Prep → Algorithms → Interactive Content"
}

Write-Host "`n💡 Pro tip: Use GitHub's milestone feature to group related issues into content series!" -ForegroundColor Cyan
