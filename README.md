<div align="center">

<img src="https://res.cloudinary.com/dyq2t6mgd/image/upload/w_1200,h_400,c_fill,r_20/v1759670370/banner-pathguard_a0bt4c.png" alt="PathGuard API Banner" width="100%" />

<h1>🛡️ PathGuard API</h1>

<p><strong>Next-Generation KYC Verification System</strong></p>
<p>Intelligent risk scoring • Real-time fraud detection • Enterprise-grade security</p>

<p>
  <a href="#quick-start"><strong>Quick Start</strong></a> •
  <a href="#features"><strong>Features</strong></a> •
  <a href="#api-reference"><strong>API Docs</strong></a> •
  <a href="#examples"><strong>Examples</strong></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5.0-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

</div>

---

<a id="features"></a>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Security & Verification

- **Advanced Risk Scoring** - ML-inspired algorithm
- **Real-time Analysis** - Instant fraud detection
- **Document Validation** - Multi-format support
- **Email Intelligence** - Domain reputation checks

</td>
<td width="50%">

### ⚡ Developer Experience

- **Interactive Swagger UI** - Live API playground
- **Mock Data System** - Test without DB setup
- **Clean Architecture** - Maintainable codebase
- **Type Safety** - Zod schema validation

</td>
</tr>
</table>

### 🎯 Core Capabilities

```mermaid
graph LR
    A[Client Request] --> B[Validation Layer]
    B --> C[Risk Analysis Engine]
    C --> D[Decision Engine]
    D --> E[Response + Score]
    style C fill:#4169E1
    style D fill:#339933
```

- 🛡️ **Enterprise Security** - Helmet, CORS, input sanitization
- 📊 **Smart Pagination** - Efficient data retrieval
- 🚨 **Custom Middleware** - Swagger pollution prevention
- 🏗️ **Layered Design** - Controllers → Services → Models
- ⚙️ **Production Ready** - Structured logging & error handling

---

<a id="quick-start"></a>

## 🚀 Quick Start

Get PathGuard API running in **less than 2 minutes**:

```bash
# Clone repository
git clone https://github.com/thmslfb/pathguard-api.git
cd pathguard-api

# Install dependencies
npm install

# Start development server (uses mock data by default)
npm run dev
```

> **🎮 Live Playground:** Open http://localhost:3000/api/v1/docs to interact with the API through Swagger UI

### 🎯 First API Call

```bash
curl -X POST http://localhost:3000/api/v1/kyc/verifications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Dupont",
    "email": "alice@company.com",
    "documentType": "id_card"
  }'
```

**Response:**

```json
{
  "verification_id": "ver_123e4567-e89b-12d3-a456-426614174000",
  "status": "approved",
  "risk_score": 0.1,
  "checks_performed": ["name", "email", "documentType"],
  "timestamp": "2025-10-05T14:30:00.000Z"
}
```

---

## 🛠️ Tech Stack

| Category          | Technologies                                                                                                                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Runtime**       | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)                                                                                                                     |
| **Framework**     | ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)                                                                                                                     |
| **Database**      | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black) |
| **Validation**    | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)                                                                                                                                 |
| **Documentation** | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)                                                                                                                     |
| **Testing**       | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)                                                                                                                        |
| **Security**      | ![Helmet](https://img.shields.io/badge/Helmet-000000?style=flat-square)                                                                                                                                                    |

---

## 📦 Installation

<details>
<summary><b>📋 Prerequisites</b></summary>

Before you begin, ensure you have:

- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **PostgreSQL** - [Install Guide](https://www.postgresql.org/download/)
- ✅ **Git** - [Get Started](https://git-scm.com/)

</details>

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/thmslfb/pathguard-api.git
cd pathguard-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Configuration

```bash
cp .env.example .env
```

Create your `.env` file with the following structure:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/pathguard"

# Risk Scoring Thresholds
LOW_THRESHOLD=0.2
HIGH_THRESHOLD=0.5

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4️⃣ Database Setup

```bash
# Run migrations to create database schema
npm run migrate:apply
```

### 5️⃣ Launch Application

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

✅ **API Ready:** http://localhost:3000/api/v1  
📚 **Swagger UI:** http://localhost:3000/api/v1/docs

---

<a id="api-reference"></a>

## 📡 API Reference

| Method | Endpoint                    | Description              | Status |
| :----: | --------------------------- | ------------------------ | :----: |
| `GET`  | `/api/v1`                   | API information & health |   ✅   |
| `GET`  | `/api/v1/health`            | System health check      |   ✅   |
| `POST` | `/api/v1/kyc/verifications` | Create verification      |   ✅   |
| `GET`  | `/api/v1/kyc/verifications` | List verifications       |   ✅   |
| `GET`  | `/api/v1/docs`              | Swagger documentation    |   📚   |

### 🔗 Base URL

```
http://localhost:3000/api/v1
```

---

<a id="examples"></a>

## 🎯 Examples

### Request Examples

<details open>
<summary><b>✅ Low Risk - Approved</b></summary>

```bash
curl -X POST http://localhost:3000/api/v1/kyc/verifications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Dupont",
    "email": "alice@company.com",
    "documentType": "id_card"
  }'
```

**Response (200 OK):**

```json
{
  "verification_id": "ver_123e4567-e89b-12d3-a456-426614174000",
  "status": "approved",
  "risk_score": 0.1,
  "checks_performed": ["name", "email", "documentType"],
  "timestamp": "2025-10-05T14:30:00.000Z"
}
```

</details>

<details>
<summary><b>🟡 Medium Risk - Pending Review</b></summary>

```bash
curl -X POST http://localhost:3000/api/v1/kyc/verifications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@gmail.com",
    "documentType": "passport"
  }'
```

**Response (200 OK):**

```json
{
  "verification_id": "ver_234f5678-f90c-23e4-b567-537725285111",
  "status": "pending_review",
  "risk_score": 0.35,
  "checks_performed": ["name", "email", "documentType"],
  "timestamp": "2025-10-05T14:35:00.000Z"
}
```

</details>

<details>
<summary><b>❌ High Risk - Rejected</b></summary>

```bash
curl -X POST http://localhost:3000/api/v1/kyc/verifications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "X",
    "email": "test@10minutemail.com",
    "documentType": "passport"
  }'
```

**Response (200 OK):**

```json
{
  "verification_id": "ver_345g6789-g01d-34f5-c678-648836396222",
  "status": "rejected",
  "risk_score": 0.6,
  "checks_performed": ["name", "email", "documentType"],
  "timestamp": "2025-10-05T14:40:00.000Z"
}
```

</details>

### Listing Verifications

<details>
<summary><b>📋 GET /api/v1/kyc/verifications</b></summary>

Retrieve all KYC verifications with pagination support.

```bash
curl http://localhost:3000/api/v1/kyc/verifications?limit=10&offset=0
```

**Response (200 OK):**

```json
[
  {
    "verification_id": "ver_123e4567-e89b-12d3-a456-426614174000",
    "status": "approved",
    "risk_score": 0.1,
    "created_at": "2025-10-05T14:30:00.000Z"
  },
  {
    "verification_id": "ver_987fcdeb-51a2-43f1-b987-123456789abc",
    "status": "approved",
    "risk_score": 0.2,
    "created_at": "2025-10-05T13:15:00.000Z"
  },
  {
    "verification_id": "ver_456def78-90ab-12cd-34ef-567890abcdef",
    "status": "pending_review",
    "risk_score": 0.35,
    "created_at": "2025-10-05T12:45:00.000Z"
  }
]
```

</details>

### Query Parameters

| Parameter | Type    | Default | Description                            |
| --------- | ------- | ------- | -------------------------------------- |
| `limit`   | integer | `100`   | Number of results per page (max: 1000) |
| `offset`  | integer | `0`     | Number of results to skip              |

**Example:**

```bash
curl http://localhost:3000/api/v1/kyc/verifications?limit=20&offset=40
```

---

## 🧠 Risk Scoring Algorithm

PathGuard uses a sophisticated **multi-factor risk analysis engine** to evaluate KYC submissions:

### 📊 Scoring Methodology

The risk score is calculated by adding penalties for various risk factors:

```
Risk Score = Name Penalties + Email Penalties + Document Weight
```

**Risk Factors:**

- **Name too short** (< 2 chars): +0.1
- **Name too long** (> 50 chars): +0.05
- **Special characters in name**: +0.1
- **Invalid email format**: +0.2
- **Disposable email domain**: +0.3
- **Generic email domain**: +0.15
- **Document type weight**: +0.1 to +0.2

<table>
<tr>
<td width="33%">

#### 👤 Name Analysis

- Length validation
- Special character detection
- Pattern recognition
- Common name database

</td>
<td width="33%">

#### 📧 Email Verification

- Format validation
- Domain reputation
- Temporary email detection
- Business vs. personal

</td>
<td width="33%">

#### 📄 Document Assessment

- Type classification
- Validity checks
- Risk weighting
- Forgery indicators

</td>
</tr>
</table>

### 🎯 Decision Thresholds

| Score Range |        Status         | Action                       | Visual |
| :---------: | :-------------------: | ---------------------------- | :----: |
| `0.0 - 0.2` |    ✅ **Approved**    | Automatic approval           |   🟢   |
| `0.2 - 0.5` | 🟡 **Pending Review** | Manual verification required |   🟡   |
| `0.5 - 1.0` |    ❌ **Rejected**    | Automatic rejection          |   🔴   |

### 🔬 Response Structure

Each verification response includes the following fields:

```json
{
  "verification_id": "ver_123e4567-e89b-12d3-a456-426614174000",
  "status": "approved",
  "risk_score": 0.1,
  "checks_performed": ["name", "email", "documentType"],
  "timestamp": "2025-10-05T14:30:00.000Z"
}
```

**Field Descriptions:**

- `verification_id` - Unique identifier with 'ver\_' prefix
- `status` - Verification result (approved/pending_review/rejected)
- `risk_score` - Calculated risk score (0.0 - 1.0)
- `checks_performed` - List of validation checks executed
- `timestamp` - ISO 8601 timestamp of verification

---

## 🏗️ Architecture

```
pathguard-api/
├── controllers/       # HTTP request handlers
├── services/          # Business logic and risk scoring
├── models/            # Database layer with Drizzle ORM
├── middleware/        # Custom middleware (validation, security)
├── routes/            # API route definitions
├── schemas/           # Zod validation schemas
├── utils/             # Utilities and mock data
└── database/          # Database configuration and migrations
```

### 🔄 Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant Middleware
    participant Controller
    participant Service
    participant Database

    Client->>Express: POST /api/v1/kyc/verifications
    Express->>Middleware: Validate Input
    Middleware->>Controller: Valid Request
    Controller->>Service: Process Verification
    Service->>Service: Calculate Risk Score
    Service->>Database: Save Verification
    Database-->>Service: Confirmation
    Service-->>Controller: Verification Result
    Controller-->>Client: JSON Response
```

---

## 🎨 Available Scripts

```bash
npm run dev              # Development with hot reload
npm test                 # Run test suite with coverage
npm run migrate:generate # Generate new migrations
npm run migrate:apply    # Apply database migrations
npm start                # Production server
```

---

## 💼 Technical Highlights

| Feature                   | Implementation                                                    |
| ------------------------- | ----------------------------------------------------------------- |
| 🏛️ **Clean Architecture** | Separation of concerns (Routes → Controllers → Services → Models) |
| 🔒 **Security**           | Input validation, CORS, Helmet security headers                   |
| 📖 **Documentation**      | Interactive Swagger UI with live examples                         |
| 🗄️ **Database**           | PostgreSQL with Drizzle ORM and migrations                        |
| 🛡️ **Smart Middleware**   | Custom Swagger detection prevents doc pollution                   |
| ⚠️ **Error Handling**     | Centralized error management with proper HTTP codes               |
| ✨ **Code Quality**       | Conventional commits, modular structure                           |

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🎯 Open a Pull Request

---

## 💬 Support

Need help? Please [open an issue](https://github.com/thmslfb/pathguard-api/issues) in the repository.

---

## 👏 Acknowledgments

Built with modern web development best practices and industry-standard tools:

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [PostgreSQL](https://postgresql.org/) - Advanced open source database
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - API documentation
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Vitest](https://vitest.dev/) - Next generation testing framework

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ by [thmslfb](https://github.com/thmslfb)

</div>
