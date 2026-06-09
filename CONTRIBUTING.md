# Contributing

Thanks for your interest in improving AI Adventure Academy.

## Project Goals

- Keep the experience friendly for students ages 12-15
- Make AI concepts easy to understand through play
- Preserve a clean full-stack structure and clear documentation

## Development Setup

```bash
npm install
npm --workspace backend run seed
npm run dev
```

## Quality Checks

Before opening a pull request or submitting changes:

```bash
npm --workspace backend run test
npm --workspace backend run build
npm --workspace frontend run build
```

## Contribution Guidelines

- Prefer small, focused changes
- Keep UI language simple and student-friendly
- Preserve responsive behavior across mobile, tablet, and desktop
- Update docs when adding or changing major features
- Avoid committing local database files, screenshots, logs, or temporary artifacts

## Suggested Areas for Contribution

- New missions or challenge types
- Better animations, sounds, and visual polish
- AI API integrations for image generation or chat
- Accessibility improvements
- Additional automated tests

## Pull Request Notes

Include:

- What changed
- Why it changed
- How it was tested
- Any screenshots if UI behavior changed
