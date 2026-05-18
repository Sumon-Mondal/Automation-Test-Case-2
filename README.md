# Automation Test Case 2

Playwright automation suite for the Demo App scenario:

1. Login to Demo App.
2. Navigate to `Web Application`.
3. Verify `Fix navigation bug` is in the `To Do` column.
4. Confirm the task has the `Bug` tag.

## Setup

```sh
npm install
npx playwright install chromium
```

## Run

```sh
npm test
```

The suite uses these defaults:

- `DEMO_APP_URL=https://animated-gingersnap-8cf7f2.netlify.app/`
- `DEMO_APP_USERNAME=admin`
- `DEMO_APP_PASSWORD=password123`

Override them with environment variables when needed.
