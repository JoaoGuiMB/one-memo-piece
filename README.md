## Why I made this

I enjoy playing such games with friends and co-workers. I also like One Piece very much =). I also wanted to try new tools like Liveblocks for handling realtime communication and the newest version of Next.js for the frontend.

## Tech stack 💻

- [Liveblocks](https://liveblocks.io/) for multiplayer
- [Tailwind](https://tailwindcss.com/) for styling
- [Shadcn](https://ui.shadcn.com/) for components
- [Next.js](https://nextjs.org/) for fullstack dev
- [Turso](https://orm.drizzle.team/) database
- [Drizzle](https://orm.drizzle.team/) for orm and database (SQLite)
- [Clerk](https://clerk.com/) for authentication
- [Vercel](https://vercel.com/) for hosting and web analytics

## Cloning & running 🏄

1. Clone the repo: `git clone https://github.com/JoaoGuiMB/one-memo-piece`
2. Create a `.env` file.
3. Run `npm install` and `npm run dev` to install dependencies and run locally

For your `.env` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

LIVEBLOCKS_SERVER_KEY=
```

## Bugs & Contributing 🐛

I assume you've it up and running by yourself.

If you find a bug, create an issue.

If you want to contribute, make sure an issue is already created and ASSIGNED to you. Don't waste your time making a PR that won't be merged.

If it's something that I think should be addressed, we can discuss the solution in the github issue, and then you can go ahead and make a PR.

## License

This project is licensed under the MIT License ❤️
