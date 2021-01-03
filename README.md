# Mac OS Big Sur Web

This open source project aims to replicate some of the Mac OS(Big Sur, at the time)'s desktop experience on web, using standard web technologies like HTML, CSS and JS

# Why

I've always been very fascinated with macOS, and have never owned a Mac/book. So I'm making the most beautiful aspect of macOS, it's desktop, myself. For web. Inspired from [WinXP](https://winxp.now.sh/).

# Stack

- Framework - React (`create-react-app` style)
- Bundler - Snowpack, for super fast development. On build, it churns out optimized ES Modules. Not considering older browsers right now.
- Component Library - None!! It used Material UI before, but MUI had to be removed because of high lag in Typescript Intellisense. See [microsoft/TypeScript#34801](https://github.com/microsoft/TypeScript/issues/34801)
- Styling Solution - Styled Components.

# Roadmap

## v1

- [x] Basic wallpaper
- [x] Basic dock with its cool hovering animations
- [x] Basic toolbar
- [x] Everything to built with theme switching in mind

## v2

- [ ] Interactive toolbar elements(Action center, just for show) 🧠
- [ ] Light/Dark mode switcher 💡

## v3

- [ ] A wallpaper switcher app. Offers automatic day/light wallpapers too
- [ ] Probably Safari. Uses Iframe and basic tabs functionality.
- [ ] A text editor. Like VSCode or Notepad, haven't thought ¯\\\_(ツ)\_/¯

## v4

- All kinds of crazy apps like clock, weather, and much more. Would be great if community jumped in to make some of these apps.

# What has been done till now?

v1 is done. v2 in progress.

# When will it be ready?

![Who knows?](https://i.imgur.com/6xfbPzs.gif)

# Can I contribute?

I would really really love contributions from the community.

However, for now, I need the contributors to be well versed in React(Or Preact, Svelte, Vue, Angular, Stencil or just any framework), and be confident with complex\[and dirty! 💩] code(That's an oxymoron for every developer with Imposter Syndrome, but hey, that's all of us).

## Why can't beginners contribute?

I'd really want the beginners to jump in, and improve their own skills. I was a beginner once, and wished I had found an oppurtunity to learn alongside other developers from a complex project. But beginners would need lots of mentoring, and this being primarily a personal project(For now 😉), I simply do not have time to prime beginners.

When this project grows into a considerably big community, we can indulge into mentorship and priming beginners.
