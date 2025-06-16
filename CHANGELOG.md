# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Automated GitHub Release creation for every successful deployment
- Comprehensive release notes with changelog, contributors, and technical details
- Automatic cleanup of old releases (keeps latest 10)
- Enhanced deployment workflow with tracking and rollback capabilities
- Status badges for deployment and build workflows
- Improved README with deployment and release information

### Changed
- Updated package.json build scripts for better static site generation
- Enhanced deployment workflow with better error handling and status updates

### Technical
- GitHub Actions workflows for automated CI/CD
- Release versioning based on date and run number
- Deployment tracking for rollback purposes

---

*This changelog will be automatically updated with each release. For detailed commit history, see the [releases page](https://github.com/abstractalgorithms/abstractalgorithms.github.io/releases).*

## Release Format

Each release follows this format:
- **Version**: `v{YYYY.MM.DD}-{run_number}`
- **Content**: Automated changelog from commits
- **Links**: Live site, deployment details, rollback workflow
- **Technical Details**: Build information, deployment ID, contributors

## How Releases Work

1. **Trigger**: Push to main branch (non-Android changes)
2. **Build**: Next.js static site generation
3. **Deploy**: GitHub Pages deployment
4. **Release**: Automatic GitHub release creation
5. **Cleanup**: Remove old releases (keep latest 10)

## Rollback Process

If you need to rollback a deployment:
1. Go to [Actions](https://github.com/abstractalgorithms/abstractalgorithms.github.io/actions)
2. Run the "Rollback Website Deployment" workflow
3. Specify the target commit or leave empty for last successful deployment
4. Provide a reason for the rollback

The rollback will:
- Deploy the previous version
- Create a rollback release
- Update deployment status
- Preserve rollback history
