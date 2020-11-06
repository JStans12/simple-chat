## About
This project is a simple chat app build with node, express.js, mongodb and socket.io.

## Setup

#### Install Dependencies

You will need node and npm. I recommend installing with [homebrew](https://brew.sh/).

```
brew install node
```

I used a local MongoDB connection for this project. There is a detailed guide for getting set up [here](https://zellwk.com/blog/local-mongodb/)

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

I challenged myself to get a "real" chat app going with a bare bones front end.

![](https://media.giphy.com/media/BQuKOT8oPVj3Slripc/giphy.gif)

If you want to check out the front end, you will need to use two different browsers to avoid cookie problems.

## API
