# Crowdlist GraphQL API

Crowdlist is a tool for collaborative list creation. With this API, lists can be created and deleted, Items can be added to lists and other users can vote items up.

A .env file with the following properties is needed (replace tags):

```env
DATABASE_URL="mongodb+srv://<USERNAME>:<PASSWORD>@<BASE_URL>/<DATABASE>?retryWrites=true&w=majority"
```

## Types

A list contains multiple list items.

```graphql
type List {
  id: String!
  items: [ListItem!]!
  name: String!
}
```

A list item contains multiple votes. The votes array is an array of user IDs.

```graphql
type ListItem {
  id: String!
  list: List!
  listId: String!
  name: String!
  votes: [String!]!
}
```

## Queries

```graphql
type Query {
  getAllItems: [ListItem!]!
  getItemsFromList(listId: String!): [ListItem!]!
  lists: [List!]!
}
```

## Mutations

The **addItem** mutation can be used to add an item to a list. Along with adding the item, it automatically attaches a vote to this item by the user, who added the item. When there already is an item with the exact same name, a vote is added to this item instead. If the user already voted for this item, nothing happens.

The **voteItem** mutation can be used to vote for an item. If the user already voted for this item, the vote is removed instead. If there is no vote remaining on an item, the item is going to be deleted.

```graphql
type Mutation {
  addItem(listId: String!, name: String!, userId: String!): ListItem!
  addList(name: String!): List!
  deleteList(id: String!): List!
  voteItem(itemId: String!, userId: String!): ListItem!
}
```

## Changelog

* `1.0.0` **2022-07-10** Initial release
