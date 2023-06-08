# CS571-S23 HW8 API Documentation

## At a Glance

All routes are relative to `https://www.cs571.org/s23/hw8/api/`

| Method | URL | Purpose | Return Codes |
| --- | --- | --- | --- |
| `GET`| `/bakery/items` | Get all bakery items with their associated name, price, image url, and upper bound order limit. | 200, 304 |
| `GET` | `/bakery/images/:itemName`| Get the image for the specified item. | 200, 304, 404 |
| `GET` | `/bakery/order` | Get the most recent orders. | 200, 304 |
| `POST` | `/bakery/order` | Make an order. | 200, 400, 401, 413 |

An unexpected server error `500` *may* occur during any of these requests. It is likely to do with your request. Make sure that you have included the appropriate headers and, if you are doing a POST, that you have a properly formatted JSON body. If the error persists, please contact a member of the course staff.

## In-Depth Explanations

### Getting all Bakery Items
`GET` `https://www.cs571.org/s23/hw8/api/bakery/items`

A `200` (new) or `304` (cached) response will be sent with an *object* (not *list*) of all bakery items.

```json
{
    "muffin": {
        "price": 1.5,
        "img": "https://www.cs571.org/s23/hw8/api/bakery/images/muffin",
        "upperBound": 12
    },
    "donut": {
        "price": 1,
        "img": "https://www.cs571.org/s23/hw8/api/bakery/images/donut",
        "upperBound": 24
    },
    "pie": {
        "price": 6.75,
        "img": "https://www.cs571.org/s23/hw8/api/bakery/images/pie",
        "upperBound": 6
    },
    "cupcake": {
        "price": 2,
        "img": "https://www.cs571.org/s23/hw8/api/bakery/images/cupcake",
        "upperBound": 12
    },
    "croissant": {
        "price": 0.75,
        "img": "https://www.cs571.org/s23/hw8/api/bakery/images/croissant",
        "upperBound": 12
    }
}
```

The name of each item is guaranteed to be unique and can be used as a key.

### Getting A Bakery Image

`GET` `https://www.cs571.org/s23/hw8/api/bakery/images/:itemName`

There is no get all images; you must get an image for a particular `:itemName`. This returns a `200` or `304` with the associated PNG image. If you request an invalid `:itemName`, a `404` will be returned.

Unlike all other endpoints, getting an image does *not* require an `X-CS571-ID` header.

### Getting Recent Orders
`GET` `https://www.cs571.org/s23/hw8/api/bakery/order`

A `200` or `304` with the 25 most recent orders will be returned, including the order's id, number of items ordered, who placed the order, and when the order was placed.

```json
{
    "msg": "Successfully got the latest orders!",
    "orders": [
        {
            "id": 2,
            "username": "CTNELSON2",
            "numMuffin": 4,
            "numDonut": 1,
            "numPie": 0,
            "numCupcake": 1,
            "numCroissant": 1,
            "placedOn": "2022-10-31 15:54:05"
        },
        {
            "id": 1,
            "username": "CTNELSON2",
            "numMuffin": 2,
            "numDonut": 2,
            "numPie": 0,
            "numCupcake": 0,
            "numCroissant": 0,
            "placedOn": "2022-10-31 15:44:37"
        }
    ]
}
```

The `placedOn` field contains the time that the server processed the order formatted as a SQLite UTC string.

### Creating an Order

`POST` `https://www.cs571.org/s23/hw8/api/bakery/order`

An order can be placed by performing a `POST` to the order endpoint. An order must contain the number of items being ordered. An order must have more than 0 items being bought, but fewer than the upper-bound for that item.

**Example Request Body**

```json
{
    "muffin": 3,
    "donut": 2,
    "pie": 0,
    "cupcake": 0,
    "croissant": 2
}
```

Furthermore, you can specify 0 for a particular item, or omit it from the request body, e.g. the following request is equivalent...

**Example Request Body**

```json
{
    "muffin": 3,
    "donut": 2,
    "croissant": 2
}
```

Upon a successful order, a `200` will be returned...

```json
{
    "msg": "Successfully made order!",
    "id": 10,
    "placedOn": "2022-10-31 17:00:25"
}
```

The `placedOn` field contains the time that the server processed the order formatted as a SQLite UTC string.

If an invalid item is requested (e.g. 'mango'), a `400` will be returned...

```json
{
    "msg": "A request may only be made for <items>. Baked goods are case-sensitive (and heat-sensitive!)."
}
```

Only positive, whole numbers may be provided. If anything else is provided, a `400` will be returned...

```json
{
    "msg": "You may only request positive whole numbers of baked goods!"
}
```

If too many items are ordered, a `413` will be returned...

```json
{
    "msg": "You request too much of us! This is a small town bakery."
}
```

If no items are ordered, a `418` will be returned. Go tea-ke your business somewhere else!

```json
{
    "msg": "You must order something!"
}
```
