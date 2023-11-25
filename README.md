# L2-assignment02

## Prerequisites

If you want to clone this repository and try to setup this project locally, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/AR-Tausif/mongosh-crud.git
   cd mongosh-crud
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

<!-- ## Configuration

1. **Copy the `.env.example` file to `.env`:**

   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file with your configuration values.**

   ```env
   PORT=5000
   ``` -->

## Usage

Start the application:

```bash
npm run start:dev
```

## API Endpoints

#### Get all users

```http
  GET /api/users
```

#### Get specific users

```http
  GET /api/users/:userId
```

| Parameter | Type   | Description                       |
| :-------- | :----- | :-------------------------------- |
| `id`      | number | **Required**. Id of item to fetch |

```http
  Example: /api/users/123
```

#### Get specific user orders

```http
  GET /api/users/:userId/orders
```

| Parameter | Type   | Description                       |
| :-------- | :----- | :-------------------------------- |
| `id`      | number | **Required**. Id of item to fetch |

```http
  Example: /api/users/123/orders
```

#### Get specific user orders price total sum

```http
  GET /api/users/:userId/orders/total-price
```

| Parameter | Type   | Description                       |
| :-------- | :----- | :-------------------------------- |
| `id`      | number | **Required**. Id of item to fetch |

```http
  Example: api/users/123/orders/total-price
```

If you try to check these examples then you'll get truly response from backend and will get data from database with hit these url.

Thank you so much for visit...
