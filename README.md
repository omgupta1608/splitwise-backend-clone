# Splitwise Backend Clone

This repository is a clone of the splitwise backend server with some of its functionalities.

## Author Details

- Om Gupta
- omgupta1608@gmail.com

## How to run it locally

- Clone the repository

`git clone https://github.com/omgupta1608/splitwise-backend-clone.git`

- Run `npm install` to install the dependencies

- Run `npm start` to spin up the server

- The server will start at port `4000` if not specified

## API Docs

### Add new User

- POST `/api/v1/user`
- Request
  json

```
{
    "name": "Alice",
    "email": "hello@example.com"
}
```

- Response (data)
  json

```
{
    "id":"nd91nd",
    "name": "Alice",
    "email": "hello@example.com"
}
```

### Add new Group

- POST `/api/v1/group`
- Request
  json

```
{
    "name": "Trip to Amsterdam",
    "users: [
        {
            "name":"Bob",
            "email":"bob@example.com"
        },
        {
            "name":"Catherine",
            "email":"cat@example.com"
        }
    ],
    "userId":"nd91nd"
}
```

- Response (data)
  json

```
{
    "id":"uk2ee"
    "name": "Trip to Amsterdam",
    "users: [
        {
            "id":"f13d13",
            "name":"Bob",
            "email":"bob@example.com"
        },
        {
            "id":"adk103",
            "name":"Catherine",
            "email":"cat@example.com"
        }
    ],
    "userId":"nd91nd"
}
```

### Add user to a group

- POST `/api/v1/group/add/user`
- Request
  json

```
{
    "gid":"uk2ee",
    "user": {
        "name":"David",
        "email":"dav@example.com"
    },
    "userId":"nd91nd"
}
```

- Response (data)
  json

```
{

        "id":"kdd132",
        "name":"David",
        "email":"dav@example.com"
}
```

### Add expense to a group

- POST `/api/v1/group/add/expense`
- Request
  json

```
{
    "name": "Air Tickers",
    "description":"Lufthansa Airlines",
    "totalAmount": 170000,
    "payer": "kdd132",
    "splitType:":"equally" OR "percentage",
    "percentageSplit": : {
        "kdd132": 45,
        "f13d13":15,
        "adk103": 40
    } if "splitType" is percentage
}
```

- Response (data)
  json

```
{
    "id":"uk2ee"
    "name": "Air Tickers",
    "description":"Lufthansa Airlines",
    "totalAmount": 170000,
    "payer": "kdd132",
    "splitType:":"equally" OR "percentage",
    "percentageSplit": : {
        "kdd132": 45,
        "f13d13":15,
        "adk103": 40
    } if "splitType" is percentage
}
```

### List Expenses

- GET `/api/v1/group/expenses/:gid`
- Response (data)
  json

```
[
    {
        "name": "Air Tickers",
        "description":"Lufthansa Airlines",
        "totalAmount": 170000,
        "payer": "kdd132",
        "splitType:":"equally" OR "percentage",
        "percentageSplit": : {
            "kdd132": 45,
            "f13d13":15,
            "adk103": 40
        } if "splitType" is percentage
    }
]
```

### List Total Group Spending, Total You Paid, Your total Share

- GET `/api/v1/group/spending-details/:gid`
- Response
  json

```
{ "myTotalShare": 15, "myTotalSpending": 15000, "totalGrpSpending": 100000 }
```

### List Balances

- GET `/api/v1/group/balances/:gid`
- Response (data)
  json

```
[
    "kdd132": {
        "amount": 7000
        "type": "back"
    },
    "f13d13":{
        "amount": 10000
        "type": "back"
    },
    "adk103": {
        "amount": 5000
        "type": "owe"
    }
]
```
