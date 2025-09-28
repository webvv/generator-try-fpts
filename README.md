
<h1 align="center">
  <br>
  <a href="">
  <img src="https://raw.githubusercontent.com/webvv/generator-try-fpts/main/assets/try_icon.png" alt="My image" onerror="this.onerror=null; this.src='./assets/try_icon.png';" alt="try-fpts" width="200">
  </a>
  <br>
  Try fp-ts
  <br>
</h1>

<h4 align="center">Yeoman generator to scaffold an ephemeral playground for quickly experimenting fp-ts.</h4>


<p align="center">
  <a href="#requirements">Requirements</a> •
  <a href="#how-to-use">How to Use</a> •
  <a href="#how-to-develop">How to Develop</a> •
  <a href="#support">Support</a> •
  <a href="#license">License</a> •
  <a href="#credits">Credits</a>
</p>

## Requirements

This generator assumes you have these already setup:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/)
- [Yeomon](https://yeoman.io/)

## How to Use

> **Note:** The idea behind this generator is to simply open a terminal in any directory, and run `yo try-fpts`. It immediately opens a playground in your favorite editor.

>**Can't see your favorite editor?** Open the configuration file located at `~/.yo-rc.try-fpts.json` and edit the editors field.

Run below and answer questions one by one:
```sh
yo try-fpts
```
Or answer everything at once:
```sh
yo try-fpts --projectParentPath ~/try-playground \
            --projectName try_fpts \
            --selectedEditorId vscode
```

## How to Develop

Clone and link the project:

```sh
git clone https://github.com/webvv/generator-try-fpts.git
cd generator-try-fpts
npm install
npm link
```

You are now ready to scaffold from your local try-fpts generator:

```sh
yo try-fpts
```

## Support ♥️

If you like this project and it helped you, please consider supporting me on <a href="https://www.patreon.com/webvv" target="_blank">Patreon</a>.

## License

MIT

## Credits
> Author [Sahand Javid]() &nbsp;&middot;&nbsp;
> GitHub [@webvv](https://github.com/webvv) &nbsp;&middot;&nbsp;
> Youtube [webvv](https://youtube.com/webvv)

