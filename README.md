# Engineers Hub

**Engineers Hub** is an open-source community project where developers from around the world can contribute and showcase their profiles.

The goal is to build a global directory of developers where engineers, programmers, DevOps specialists, designers, and tech enthusiasts can collaborate and be part of an open-source community.

## Project idea

This repository contains the code for a website that displays developer profiles from the `developers/` folder.

Anyone can contribute by adding a developer profile JSON file and opening a pull request.

## Getting started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## How to contribute (add your profile)

1. Fork the repository
2. Clone your fork
3. Add your profile in `developers/` as `developers/yourname.json`
4. Commit and push
5. Open a pull request

Example profile format:

```json
{
  "name": "Your Name",
  "role": "Full Stack Developer",
  "avatar": "/your-photo.png",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "portfolio": "https://yourwebsite.com",
  "country": "Your Country"
}
```

Put your photo in the `public/` folder and set `avatar` to its path (e.g. `"/your-photo.png"`). If you omit `avatar`, your initials will be shown instead.

## Contribution guidelines

See `CONTRIBUTING.md`.

## License

MIT
