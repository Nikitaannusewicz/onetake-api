# OneTake API

*Written by AI! - Bound to be updated by a real human*

**The Collaborative Audio Ledger** - _GitHub for Music Producers_

OneTake is a centralized platform for music producers and artists to manage the complete lifecycle of audio assets with context-aware features, version control, and collaborative workspaces.

---

## Table of Contents

- [Overview](#overview)
- [The Problem We're Solving](#the-problem-were-solving)
- [User Personas](#user-personas)
- [Core Features](#core-features)
- [Technical Architecture](#technical-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Status](#development-status)
- [API Documentation](#api-documentation)

---

## Overview

Unlike generic cloud storage (Dropbox/Google Drive), OneTake is **context-aware**: it understands BPM, Key, and Instrument types. Unlike social platforms (SoundCloud), it focuses on the **creation process**—allowing granular version control, stem sharing, and private collaborative workspaces.

OneTake bridges the gap between file storage and creative collaboration by treating audio files as first-class citizens with intelligent metadata, versioning, and attribution tracking.

---

## The Problem We're Solving

### 1. **"WeTransfer" Fatigue**
Producers currently share demos via expiring links or email attachments. Context is lost; files expire after 7 days.

### 2. **Version Hell**
Projects end up with filenames like `beat_v3_final_REAL_master.wav`. There is no linear history of how a track evolved.

### 3. **Lost Attribution**
When a loop or melody is shared freely, the original creator loses track of who is using it and where it ends up.

---

## User Personas

### The Architect (Producer)
Uploads raw loops, beats, and stems. Wants to track who downloads them and manage versions.

### The Vocalist (Artist)
Browses beats, downloads "tagged" versions to record vocals over, uploads the vocal stems back to the project.

### The Engineer
Needs access to high-fidelity `.wav` files (stems) for mixing, not just the MP3 preview.

---

## Core Features

### A. Asset Management (The "Bank")

- **Upload & Parsing**: Upload audio files (WAV/MP3) with automatic metadata extraction
  - Duration, Size, MIME type
  - Auto-detect BPM & Musical Key
- **Stem Grouping**: Projects contain multiple audio files (Kick, Snare, Melody) bundled together
- **Streaming**: Audio playable in-browser without downloading full high-quality file

### B. Version Control (The "Time Machine")

- **Iterative Updates**: Upload new versions of specific tracks
- **History**: Toggle between versions (v1.0 vs v2.0) to hear differences
- **Immutability**: Locked versions cannot be overwritten, only superseded

### C. Collaboration & Social (The "Network")

- **Workspaces**: Private collaborative spaces (Producer + Artist)
- **Public/Private Toggles**: Mark beats as "Public" (Showcase) or "Private" (Vault)
- **Timestamp Commenting**: Comment on specific waveform timestamps (e.g., "At 1:04, drop the bass")

---

## Technical Architecture

### Non-Functional Requirements

| Requirement | Target | Description |
|-------------|--------|-------------|
| **Availability** | High | Read operations (playback) must work even if upload service is down |
| **Latency** | < 200ms | Audio playback must start within 200 milliseconds |
| **Scalability** | Horizontal | Metadata (small, relational) separated from audio blobs (large, static) |
| **Security** | Strict ACL | Private assets protected; "guessable" URLs must not grant access |

### Asset Processing Pipeline

```
UPLOADED → PROCESSING → READY
                     ↘ FAILED
```

1. User uploads audio file
2. System extracts metadata (Duration, Size, MIME)
3. Transcoding service creates streamable version
4. Audio analysis extracts BPM & Key
5. Asset marked as READY for playback

---

## Tech Stack

### Backend
- **NestJS 11** - Progressive Node.js framework
- **TypeScript 5.7** - Type-safe development
- **Express.js** - HTTP server

### Planned Integrations
- **Database**: PostgreSQL / MongoDB (TBD)
- **Object Storage**: AWS S3 / MinIO for audio files
- **Audio Processing**: FFmpeg for transcoding
- **Analysis**: Essentia / Librosa for BPM/Key extraction
- **Authentication**: JWT / OAuth 2.0

### Development Tools
- Jest - Testing framework
- ESLint & Prettier - Code quality
- Supertest - API testing

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd onetake-api

# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Run tests
npm test

# Build for production
npm run build
npm run start:prod
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start with hot-reload (watch mode) |
| `npm run start:debug` | Start with debugger attached |
| `npm run start:prod` | Run production build |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Generate test coverage report |
| `npm run test:e2e` | Run end-to-end tests |

---

## Project Structure

```
onetake-api/
├── src/
│   ├── main.ts                      # Application entry point
│   ├── app.module.ts                # Root module
│   └── modules/
│       ├── assets/                  # Audio file & asset management
│       │   ├── domain/              # Business logic & entities
│       │   ├── application/         # Use cases & services
│       │   ├── infrastructure/      # Database repositories
│       │   └── presentation/        # Controllers & DTOs
│       ├── collaboration/           # Workspaces & sharing
│       └── versioning/              # Version control system
├── test/                            # E2E tests
├── package.json
├── tsconfig.json
└── README.md
```

### Architecture Pattern

The project follows **Clean Architecture** principles:

- **Domain Layer**: Core business entities and rules (e.g., `Asset` entity)
- **Application Layer**: Use cases and business workflows
- **Infrastructure Layer**: External services (database, file storage, APIs)
- **Presentation Layer**: HTTP controllers, DTOs, and request/response handling

---

## Development Status

### Current Implementation (v0.1.0-alpha)

- [x] NestJS project scaffolding
- [x] Domain model for Asset entity
- [x] Module structure (assets, collaboration, versioning)
- [x] Development tooling (testing, linting, formatting)

### In Progress

- [ ] Database integration (ORM setup)
- [ ] Asset upload endpoints
- [ ] File storage service
- [ ] Audio transcoding pipeline
- [ ] BPM/Key extraction

### Planned Features

- [ ] Authentication & authorization
- [ ] User management
- [ ] Workspace collaboration
- [ ] Version control system
- [ ] Waveform visualization
- [ ] Timestamp commenting
- [ ] Public/private asset toggles
- [ ] Download tracking & analytics

---

## API Documentation

### Asset Entity

```typescript
{
  id: string                    // UUID v4
  originalFileName: string      // Original uploaded filename
  mimeType: string             // File MIME type (audio/wav, audio/mpeg)
  size: number                 // File size in bytes
  duration: number             // Duration in seconds
  filePath: string             // Path to original file
  transcodedFilePath?: string  // Path to transcoded stream-optimized file
  ownerId: string              // User who owns the asset
  createdAt: Date              // Upload timestamp
  updatedAt: Date              // Last modification timestamp
  status: AssetStatus          // Processing state
  bpm?: number                 // Beats per minute (auto-detected)
  key?: string                 // Musical key (auto-detected)
}
```

### Asset Status Enum

- `UPLOADED` - File received but not processed
- `PROCESSING` - Currently being transcoded/analyzed
- `READY` - Fully processed and ready for playback
- `FAILED` - Processing encountered an error

---

## Contributing

This project is in active development. Contribution guidelines will be published once the core features are stabilized.

---

## License

[License TBD]

---

## Contact

For questions or collaboration inquiries, please open an issue or contact the development team.
