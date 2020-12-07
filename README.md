# TwitchTTS

TwitchTTS is a tool for streamers that reads out highlighted messages form chat.

## 📚 Table of contents

- [🎈 How to use](#-How-to-use)
- [🔧 Installing the project](#-Installing-the-project)
- [🚀 The future](#-The-future)
- [🗺️ License](#%EF%B8%8F-license)
- [📝 Sources and credits](#-Sources-and-credits)

## 🎈 How to use

You can use this as a browser source inside OBS or have a browser window open.
When using this app in the browser make sure to at least click the page once so it is allowed to play audio.
You will not see any elements on the page as long as no highlighted messages are sent.

**Note**
For now, this only works with the default highlighted message reward so none of the custom ones.
You can download the project and edit the code to make it work with custom channel point rewards but takes a bit more effort to set up.

### Base url

When using the live version

`https://twitchtts.glitch.me/?`

When running locally

`http://localhost:3000/?`

### Parameters

You can add multiple parameters to a URL by chaining them using the `&` symbol, [see example](#Example)

#### Channel

`channel=firefox__`

#### Voice

You can select a different text to speech voice by adding the voice parameter. By default, this is set to Brian.
`voice=Brian`

These are the voices you should be able to use (Note that some might not work)

```
Aditi   | Amy     | Astrid   | Bianca   | Brian     | Camila   | Carla
Carmen  | Celine  | Chantal  | Conchita | Cristiano | Dora     | Emma
Enrique | Ewa     | Filiz    | Geraint  | Giorgio   | Gwyneth  | Hans
Ines    | Ivy     | Jacek    | Jan      | Joanna    | Joey     | Justin
Karl    | Kendra  | Kimberly | Lea      | Liv       | Lotte    | Lucia
Lupe    | Mads    | Maja     | Marlene  | Mathieu   | Matthew  | Maxim
Mia     | Miguel  | Mizuki   | Naja     | Nicole    | Penelope | Raveena
Ricardo | Ruben   | Russell  | Salli    | Seoyeon   | Takumi   | Tatyana
Vicki   | Vitoria | Zeina    | Zhiyu
```

#### Text to Speech

`tts=true`

### Example

This is an example on how your URL might look:
`https://twitchtts.glitch.me/?channel=Firefox__&tts=true&voice=Brian`

First, we have the base URL, then we set the channel to `Firefox__` using `channel=Firefox__` then we turn the text to speech function on using `tts=true` and last but not least we set the text to speech voice to `Brian` using the voice parameter.

## 🔧 Installing the project

If you want to tinker on the project, see how it work or customize it to fit your needs, you can!

First of all, make sure you have **Node.js**, **NPM** and **Git** installed.

1. Choose or make a new directory to clone the project to
2. Clone the repository using
   `git clone git@github.com:Vuurvos1/twitchTTS.git`
3. Cd into the project folder
4. Run `npm install` to install the needed npm packages

### 🚀 Launch the project

You can start the project by running `npm start` in your console.
By default, the project will be hosted on [localhost:3000](http://localhost:3000)

#### Developing

If you are a developer and want to work on the project you can use `npm run dev`, this will start the project using Nodemon and will automatically restart the project once you make changes to a file.

## 🚀 The future

List of possible future features

- [ ] Config files
- [ ] Custom rewards support
- [ ] More voices from different service
- [ ] Sub only mode
- [ ] Character limit
- [ ] Word blacklist

## 🗺️ License

Author: [Vuurvos1](https://github.com/Vuurvos1), license by [MIT](https://github.com/Vuurvos1/twitchTTS/blob/master/LICENSE)

## 📝 Sources and credits

This project is based on HighlightOfMyChat by Instafluff,
find it at [github.com/instafluff/HighlightOfMyChat](https://github.com/instafluff/HighlightOfMyChat)
