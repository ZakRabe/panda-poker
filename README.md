# panda-poker
free planning poker for the homies

## Features
- Create linkable Games for sprint planning poker.
- Customize your avatar and display name - no login required.
- View relationships between votes and players in an interactive force graph.
- Each player can vote in secret, then all votes are revealed to the group. 
- BONK people who are AFK and need to vote.
- Calculate average vote and group consensus.
- Share notes in the Game. URLs are parsed and turned into links.

## Setup

1. `yarn install`
2. add environment variables for youir firebase realtime database

```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

3. `yarn start`
