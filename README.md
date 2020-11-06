## About
This project is a simple chat app built with node, express.js, mongodb and socket.io.

## Setup

#### Install Dependencies

You will need node and npm. I recommend installing with [homebrew](https://brew.sh/).

```
brew install node
```

I used a local MongoDB connection for this project. There is a detailed guide for getting set up [here](https://zellwk.com/blog/local-mongodb/).

#### Clone The Repo

```
git clone git@github.com:JStans12/simple-chat.git
```

#### Install Node Modules

```
npm install
```

#### Run The Project

```
npm run dev
```

## Design

I chose node for this project for a number of reasons.
* It's fast
* Websockets are easy to implement with socket.io
* There are a number of good options for NoSQL databases

I think that all of these things are ideal for a chat app.

I chose an implementation with 3 models; `User`, `Message` and `Conversation`.
```js
const UserSchema = new Schema({
  name: String
});

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation"
  },
  createdAt: Date,
  content: String
});

const ConversationSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});
```

A major benefit of this design is that it leaves room to add a group chat feature in the future. Another nice benefit was that I got to play around with MongoDB and [mongoose](https://mongoosejs.com/). A slightly more complicated schema allowed me to get more familiar with these tools that I had not used before.

There were also some hurdles to this approach. I originally intended to not store the `recipients` on the `Message`. However, the requirement that `messages can be requested for a recipient from a specific sender` makes that very difficult. I had hoped to normalize my data structure, but in NoSQL, it can sometimes be [advantageous to denormalize](https://mongoosejs.com/docs/populate.html#query-conditions). After adding recipients to the messages, I was able to simplify my queries and likely increase performance, at the cost of some storage space.

## API Docs

[curl](https://curl.haxx.se/) is a great way to test and familiarize yourself with an API. I'll provide sample requests so you can follow along.

Follow these steps in order. You will need to login and start a conversation before you can start sending messages.

#### Login - POST /login

All you need is a name. Your messages are totally secure...

```
curl --request POST --url http://localhost:8080/login \
--data '{ "sender": "Jerry }'
```

A successful login will return a userId. This is required for the next steps.
```
{"id":"5fa56b1e9e5b2a427441779c"}
```

#### Start a Conversation - POST /conversations

For this step, you'll need your `id` from login and the name of a friend to chat with.

```
curl --request POST --url http://localhost:8080/conversations \
--data-urlencode "sender=5fa56b1e9e5b2a427441779c" \
--data-urlencode "recipient==Stacey"
```

This will return you a `conversationId` that can be used to chat.

```
{"conversationId":"5fa5726af6a703439a95d546"}
```

#### Send a message - POST /conversations/:conversationId/users/:userId/messages

Now you're ready to chat

```
curl --request POST --url http://localhost:8080/conversations/5fa5726af6a703439a95d546/users/5fa56b1e9e5b2a427441779c/messages \
--data '{ content: "Send it!" }'
```

You'll get a 200 OK response back. Not too exciting. If you want a supreme chat experience you have to wait til the end...

#### Message Queries - GET /messages

You can use this endpoint for all your message querying needs.

There are 4 supported query params:
* limit `?limit=5` - Limits the amount of returned results.
* recent `?recent=true` - Returns only results from the last 30 days.
* sender `?sender=Jerry` - Retuns only messages sent by Jerry.
* recipient `?recipient=Stacey` - Returns only messages received by Stacy.

```
curl --request GET   --url http://localhost:8080/messages
```

The response looks like this:
```
{"data":[{"sender":"Jerry","recipients":["Stacey"],"content":"Send it!"}]}
```

## Something Fun

I challenged myself to get a "real" chat app going with a bare bones front end.

![](https://media.giphy.com/media/BQuKOT8oPVj3Slripc/giphy.gif)

If you want to check out the front end, you will need to use two different browsers to avoid cookie problems.
