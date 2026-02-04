# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## MongoDB setup (API server)

This project now includes a minimal Express API server to connect to MongoDB.

**Database design**
- Database name: `highway40` (set via `MONGODB_DB`)
- Collections:
  - `reservations` for table bookings
  - `delivery_orders` for delivery orders

1. Copy the example environment file and set your connection string:

```sh
cp .env.example .env
```

2. Start the API server (in a separate terminal):

```sh
npm run server:dev
```

3. Verify the connection:

```sh
curl http://localhost:3001/api/health
```

4. Create a reservation:

```sh
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","phone":"(812) 555-0123","email":"john@example.com","guests":"2","date":"2026-02-14","time":"6:30 PM","specialRequests":"Window seat"}'
```

5. Create a delivery order:

```sh
curl -X POST http://localhost:3001/api/delivery-orders \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Jane Doe","phone":"(812) 555-0456","address":"123 Main St","city":"Brazil","zipCode":"47834","notes":"Leave at door","items":[{"id":"bs2","name":"Classic Cheeseburger","price":9.29}],"total":9.29}'
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
