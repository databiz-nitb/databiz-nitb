# Contributing to DataBiz

Thank you for your interest in contributing to DataBiz v2! Contributions of all
sizes are welcome, including bug fixes, improvements to the user experience,
documentation updates, and new features.

## Getting started

1. Fork the repository and clone your fork.
2. Create a branch for your work:

   ```bash
   git checkout -b feature/short-description
   ```

3. Install dependencies for both applications:

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

4. Create `server/.env` from `server/.env.example` and fill in the required
   values. Do not commit credentials, tokens, or other secrets.
5. Start the applications in separate terminals:

   ```bash
   # Terminal 1
   cd client
   npm run dev

   # Terminal 2
   cd server
   npm run dev
   ```

## Project structure

- `client/` contains the React, TypeScript, Tailwind CSS, and Vite frontend.
- `server/` contains the Express API, MongoDB models, services, and tests.

## Making changes

- Keep changes focused and consistent with the existing project structure.
- Use TypeScript types and existing shared utilities in the client.
- Keep API validation, authentication, and error handling consistent with the
  existing server patterns.
- Do not include secrets or personal environment files in commits.
- Update relevant documentation when behavior or setup changes.

## Testing and checks

Run the checks relevant to the code you changed before opening a pull request:

```bash
# Client lint and production build
cd client
npm run lint
npm run build

# Server test suite
cd ../server
npm test
```

If a check cannot be run locally, explain why in the pull request description.

## Commit and pull request guidelines

- Use a clear commit message that describes the change.
- Explain what changed and why in the pull request description.
- Keep pull requests focused on one feature or fix.
- Include screenshots or a short recording for user-interface changes.
- Mention any database, environment-variable, or migration requirements.
- Make sure existing tests pass and respond to review feedback.

## Reporting bugs and requesting features

Before opening an issue, search existing issues to avoid duplicates. Include
clear reproduction steps, expected and actual behavior, relevant logs, and
browser or runtime details when reporting a bug. Feature requests should
describe the user problem and the proposed outcome.

## Code of conduct

Be respectful, inclusive, and constructive. Harassment, discrimination, and
personal attacks are not acceptable in project discussions or contributions.
