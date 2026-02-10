# n8n-nodes-absorblms

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides seamless integration with AbsorbLMS, enabling automation of learning management operations. With 1 resource implemented, it offers comprehensive user management capabilities including account creation, profile updates, enrollment tracking, and certificate management.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![AbsorbLMS](https://img.shields.io/badge/AbsorbLMS-API%20v2-orange)
![Learning Management](https://img.shields.io/badge/Learning-Management-green)
![User Management](https://img.shields.io/badge/User-Management-purple)

## Features

- **User Management** - Create, update, and retrieve user accounts with comprehensive profile information
- **Enrollment Tracking** - Monitor user course enrollments and learning progress across your organization
- **Certificate Management** - Access and manage user certificates and completion records
- **Manager Hierarchy** - Retrieve direct reports and organizational structure for management oversight
- **Flexible Filtering** - Query users by department, email, username, and other criteria
- **Paginated Results** - Handle large datasets efficiently with built-in pagination support
- **Department Integration** - Organize users by departments with full department ID support
- **Secure Authentication** - API key-based authentication for secure access to your AbsorbLMS instance

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-absorblms`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-absorblms
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-absorblms.git
cd n8n-nodes-absorblms
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-absorblms
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| Company Name | Your AbsorbLMS company identifier (used in subdomain) | Yes |
| API Key | Your AbsorbLMS API key from the admin panel | Yes |
| Base URL | Custom base URL (defaults to https://[company].myabsorb.com/api/rest/v2) | No |

## Resources & Operations

### 1. Users

| Operation | Description |
|-----------|-------------|
| Get Users | Retrieve list of users with optional filtering by username, email, or department |
| Create User | Create a new user account with username, email, and profile information |
| Update User | Update existing user information including profile details and department assignment |
| Get User Enrollments | Retrieve all course enrollments for a specific user |
| Get User Certificates | Get all certificates earned by a specific user |
| Get Direct Reports | Retrieve direct reports for a manager user in the organizational hierarchy |

## Usage Examples

```javascript
// Create a new user with department assignment
{
  "username": "john.doe",
  "email": "john.doe@company.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "SecurePass123!",
  "departmentId": "12345"
}
```

```javascript
// Get users filtered by department
{
  "operation": "getUsers",
  "departmentId": "12345",
  "limit": 50,
  "offset": 0
}
```

```javascript
// Update user profile information
{
  "operation": "updateUser",
  "userId": "67890",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@company.com",
  "departmentId": "54321"
}
```

```javascript
// Get user enrollments with pagination
{
  "operation": "getUserEnrollments",
  "userId": "67890",
  "limit": 25,
  "offset": 0
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid API key or expired credentials | Verify API key in AbsorbLMS admin panel and update credentials |
| 403 Forbidden | Insufficient permissions for requested operation | Check user permissions in AbsorbLMS admin settings |
| 404 Not Found | User or resource not found | Verify user ID exists and is accessible with current permissions |
| 422 Unprocessable Entity | Invalid data format or missing required fields | Check required fields and data validation rules |
| 429 Too Many Requests | API rate limit exceeded | Implement delays between requests or contact AbsorbLMS support |
| 500 Internal Server Error | AbsorbLMS server error | Check AbsorbLMS status page or contact their support team |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-absorblms/issues)
- **AbsorbLMS API Documentation**: [https://support.absorblms.com/hc/en-us/articles/115002870353](https://support.absorblms.com/hc/en-us/articles/115002870353)
- **AbsorbLMS Developer Portal**: [https://absorblms.com/developers](https://absorblms.com/developers)