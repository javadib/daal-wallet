<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Wallet Service

This is a microservice for managing user wallet data using Nest.js and PostgreSQL.

## Requirements

- Node.js (version 16 or higher)
- PostgreSQL
- Docker (optional)

## Setup

### Using Docker

1. **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd wallet-service
    ```

2. **Build and start the containers:**

    ```bash
    docker-compose up --build
    ```

3. **Access the service:**

   The service will be available at `http://localhost:3000`.

### Without Docker

1. **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd wallet-service
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure the database connection:**

   Ensure your PostgreSQL database is running and update the connection settings in `src/app.module.ts`:

    ```typescript
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'wallet',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ```

4. **Run database migrations (if any):**

    ```bash
    npm run typeorm migration:run
    ```

5. **Start the application:**

    ```bash
    npm run start
    ```

6. **Access the service:**

   The service will be available at `http://localhost:3000`.

## API Endpoints

### GET /wallet/balance

Returns the current balance of a user.

- **Input:** `user_id` (query parameter)
- **Output:** JSON object containing the balance, e.g., `{ "balance": 4000 }`

**Example Request:**

```bash
curl -X GET 'http://localhost:3000/wallet/balance?user_id=1'
```

Example Response:
```
{
"balance": 4000
}
```


## Testing

To ensure the reliability of the service, we have included several test cases.

1. **Setup the test database:**

   Ensure your PostgreSQL test database is running and update the connection settings in `src/wallet/wallet.service.spec.ts`:

    ```typescript
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'wallet_test',
      entities: [User, Transaction],
      synchronize: true,
    }),
    ```

2. **Run the tests:**

    ```bash
    npm run test
    ```

## Logging

- **Transaction Logs:** All transactions are logged with sufficient detail for auditing purposes. Logs are stored in `logs/transactions.log`.
- **Daily Totals:** The total amount of transactions processed each day is logged in `logs/daily_totals.log`.

## Additional Considerations

### Data Types

Ensure to use appropriate field types in the database to match the input/output specifications.

### Containerization

The project is containerized using Docker. The `Dockerfile` and `docker-compose.yml` are provided to build and run the application in a containerized environment.

### Communication Protocols

While the primary communication protocol used is REST, exploring other protocols such as gRPC or GraphQL is encouraged.

### Design Decisions and Assumptions

1. **Balance Calculation:** User balance is calculated and updated with each transaction.
2. **Transaction Logging:** Each transaction is logged with a timestamp, user ID, amount, and transaction ID for auditing purposes.
3. **Daily Totals:** The service calculates and logs the total amount of transactions processed each day for reporting and auditing.

## Submission Guidelines

Please provide a GitHub repository link containing your project. Ensure the repository is public or shareable with specific accounts. Include this README with setup instructions and any other documentation you deem necessary.

## Contact

For any issues or questions, please contact [javadib67@gmail.com].

---

Thank you for using our Wallet Service!

