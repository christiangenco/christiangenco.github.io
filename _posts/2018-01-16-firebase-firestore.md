---
title: Firebase Firestore Summary
image:
image_small:
excerpt: "A high level guide to using the Firebase Firestore database."
---

This post is of a series of my guided notes on [firebase](/firebase).

## create

```javascript
// add a document with id `cgenco` to the `people` collection:
db.doc("people/cgenco").set({
  name: "Christian Genco",
  email: "christian@gen.co",
  age: 25
})

// don't care about the document id? add your document to a collection and one will be generated:
db.collection("people").add({
  name: "Bill Murray",
  email: "billmurray@aol.com",
  age: 67
}).then(docRef => {
  console.log("generated id: " + docRef.id)
  docRef.get().then(doc => console.log(doc.data()))
}).catch(err => {
  console.error(err)
})

// save the generated id inside the document
// (this may be an antipattern)
const person = db.collection("people").doc();
person.set({ id: person.id, name: "Joe", email: "joe@email.com", age: 16 })

```

## read

```javascript
db.collection("people").doc("cgenco").get().then(doc => console.log(doc.data()))
db.doc("people/cgenco").get().then(doc => console.log(doc.data())) // same as above
// {email: "christian@gen.co", name: "Christian Genco"}

// read a collection of multiple documents
db.collection("comments").get()
.then(collection => {
  const comments = collection.docs.map(doc => doc.data());
  console.log(comments);
});
```

Subscribe to pushed updates:

```javascript
db.collection("comments").onSnapshot(collection => {
  const comments = collection.docs.map(doc => doc.data());
  console.log(comments);
  // update UI
});
```

`onSnapshot` is even called with local modifications if you're offline!

More advanced reading is in the "querying" section below.

## update

Simple edits just use `update` instead of `set`:

```javascript
db.doc("people/cgenco").update({
  age: 26,
  updatedAt: firebase.firestore.FieldValue.serverTimestamp()
})
```

To update a nested field (ex: a field of an object in a document), use dot notation:

```javascript
db.doc("people/cgenco").update({
  "address.city": "Dallas",
  age: 27
})
```

Complicated edits dependent on existing data should be done in [transactions](https://firebase.google.com/docs/firestore/manage-data/transactions#transactions). Up to 500 writes can be performed at once by [batching them](https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes).

## delete

To delete a Firestore document:

```javascript
db.doc("people/cgenco").delete().then(() => {
  console.log("Document successfully deleted!");
}).catch(error => {
  console.error("Error removing document: ", error);
});
```

To delete a field from a Firestore document:

```javascript
db.doc("people/cgenco").update({
  email: firebase.firestore.FieldValue.delete()
});
```

Weird, right? You could also just set it to null, which might be more practical.

To delete a collection, you need to [delete all documents in the collection one by one](https://cloud.google.com/firestore/docs/manage-data/delete-data).

## query

Let's set up some data to query:

```javascript
const cities = {
  SF: {
    name: "San Francisco",
    state: "CA",
    country: "USA",
    capital: false,
    population: 860000
  },
  LA: {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    capital: false,
    population: 3900000
  },
  DC: {
    name: "Washington, D.C.",
    state: null,
    country: "USA",
    capital: true,
    population: 680000
  },
  TOK: {
    name: "Tokyo",
    state: null,
    country: "Japan",
    capital: true,
    population: 9000000
  },
  BJ: {
    name: "Beijing",
    state: null,
    country: "China",
    capital: true,
    population: 21500000
  }
};

// insert into firestore
const citiesRef = db.collection("cities");
Object.keys(cities).forEach(id => {
  citiesRef.doc(id).set(cities[id]);
});

// handy function to get and print a query
const printQuery = query => query.get().then(snapshot =>
  console.log(JSON.stringify(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })), 0, 2))
)
```

Firestore data can be queried with the `where` method:

```javascript
query = db
  .collection("cities")
  .where("capital", "==", true)
printQuery(query)
//[
//  {
//    "capital": true,
//    "country": "China",
//    "name": "Beijing",
//    "population": 21500000,
//    "state": null,
//    "id": "BJ"
//  },
//  {
//    "capital": true,
//    "country": "USA",
//    "name": "Washington, D.C.",
//    "population": 680000,
//    "state": null,
//    "id": "DC"
//  },
//  {
//    "capital": true,
//    "country": "Japan",
//    "name": "Tokyo",
//    "population": 9000000,
//    "state": null,
//    "id": "TOK"
//  }
//]
```

`where` clauses are chainable:

```javascript
query = db
  .collection("cities")
  .where("country", "==", "USA")
  .where("state", "==", "CA")
```

Firestore's `where` clause supports **range comparisons** of `<`, `<=`, `==`, `>`, and `>=`, but multiple range comparisons can only be queried on a single field at a time.

If you want to use the equality operator (`==`) *with* a range comparison (`<`, `<=`, `>`, or `>=`) you need a [custom index](https://firebase.google.com/docs/firestore/query-data/indexing):

```javascript
db
  .collection("cities")
  .where("capital", "==", true)
  .where("population", ">=", 700000)
  .get()
// Error: The query requires an index. You can create it here: https://console.firebase.google.com/project/...

// until you add an index on `population`, then it's fine
```

### custom indexes

[Firestore indexes](https://firebase.google.com/docs/firestore/query-data/indexing) can be added in the [Firebase console](https://console.firebase.google.com/project/_/database/firestore/data) at Database / Indexes / Add Index, with the [firebase CLI](https://firebase.google.com/docs/cli), or in a project's `firestore.indexes.json` after running `firebase init`:

```json
{
  "indexes": [
    {
      "collectionId": "cities",
      "fields": [
        { "fieldPath": "capital", "mode": "ASCENDING" },
        { "fieldPath": "population", "mode": "ASCENDING" }
      ]
    }
  ]
}
```

If you try to run a query that requires an index, check the console for a handy link to automatically create the index you need.

### ordering

`limit` and `orderBy` are also supported:

```javascript
// ascending
query = db.collection("cities").orderBy("name")

// the last alphabetical city
query = db.collection("cities").orderBy("name", "desc").limit(1)

// order by state alphabetically, then population
query = db.collection("cities").orderBy("state").orderBy("population", "desc")
```

If your query has a `where` clause with a range comparison, your first ordering must be on the same field:

```javascript
// this works fine:
db.collection("cities").where("population", ">", 100000).orderBy("population")

// this doesn't:
db.collection("cities").where("population", ">", 100000).orderBy("country")
// Uncaught Error: Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field 'population' and so you must also use 'population' as your first Query.orderBy(), but your first Query.orderBy() is on field 'country' instead.
```

### pagination

Paginate queries with `orderBy`, `startAt` or `startAfter`, and `limit`:

```javascript
pageOne = await db
  .collection("cities")
  .orderBy("name")
  .startAfter(null)
  .limit(2)
  .get()
  .then(snapshot => Promise.resolve(snapshot.docs))

lastDoc = pageOne[pageOne.length - 1]

pageTwo = await db
  .collection("cities")
  .orderBy("name")
  .startAfter(lastDoc)
  .limit(2)
  .get()
  .then(snapshot => Promise.resolve(snapshot.docs))
```

## Security & Rules

https://firebase.google.com/docs/firestore/security/secure-data#conditional_logic
https://firebase.google.com/docs/firestore/solutions/role-based-access
https://firebase.google.com/docs/firestore/reference/security/

Check out [my Firebase Auth Guide](/firebase-auth) for how to authenticate a user.

TODO: high level intro about patter matching;

The default behavior is to disallow any action for any path. If there are multiple rules matching a given document, Cloud Firestore allows an operation to succeed if any of the matching rules allow it.

All documents in Cloud Firestore are stored in a path that begins with `/databases/<database name>/documents`:

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{cityId} {
      allow read, write: if true;
    }
  }
}
```

Rules for collections don't apply to documents within that collection. Adding =** to the end of a wildcard match will match all children of a collection or document:

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{path=**} {
      // rules go here for all documents and subcollections under /users/
    }

    // capture just userId instead of the whole path
    match /users/{userId} {
      match /{path=**} {
        // Rules added here would apply to documents in any subcollections
      }
    }
  }
}
```

DSL;

* Use == and != for equality checking, both for numbers and for strings.
* Use == null or != null to check whether a field or value exists within a document.
* Use is to verify that a piece of data is of a certain type. Valid types to check are string, int, float, bool, null, timestamp, list, and map.
* Use in to verify that a value is in a list or a map.
* Use the get() function to convert a document into a map.
* Use exists() to check whether or not a document exists in the database.

allow

{auth, time} = request
{data} = resource

allow read: get(/users/cgenco).admin == true

match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

allow get, list == allow read

* https://howtofirebase.com/firebase-security-rules-88d94606ce4a
