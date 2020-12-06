# TwitchTTS

TwitchTTS is a tool for streamers that reads out highlighted messages form chat

## 📚 Table of contents

- [🎈 How to use](#-How-to-use)
- [🔧 Installing the project](#-Installing-and-using-the-project)
- [🚀 The future](#-The-future)
- [🗺️ License](#%EF%B8%8F-license)
- [📝 Sources and credits](#-Sources-and-credits)

## 🎈 How to use

You can use this as a browser source inside OBS or have a browser window open.
When using this app in the browser make sure to at least click the page once so it is allowed to play audio.
You will not see any elements on the page as long as no highlighted messages are send.

**Note**
For now this only works with the default highlighted message reward so none of the custom ones.
You can download the project and edit the code to make it work with custom channelpoint rewards but takes a bit more effort to setup.

### Base url

When using the live version

`https://twitchtts.glitch.me/?`

When running localy

`http://localhost:3000/?`

### Parameters

#### Channel

`channel=firefox__`

#### Voice

You can select a different text to speach voice by adding the voice parameter, by default this is set to Brian
`voice=Brian`

You can choose from qutie a large selection of voices

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

(Some of these voices might not work)

#### Text to Speech

`tts=true`

### Example

`https://twitchtts.glitch.me/?channel=Firefox__&tts=true&voice=Brian`

## 🔧 Installing the project

If you want to tinker on the project, see how it work or customize it so it fits your needs. you can!

First of all, make sure you have **Node.js**, **NPM** and **Git** installed

1. Choose or make a new directory to clone the project to
2. Clone the repository
   `git@github.com:Vuurvos1/twitchTTS.git`
3. Cd into the project folder
4. Run `npm install` to install the needed npm packages

### 🚀 Launch the project

You can start the project using `npm start`
or run `npm run dev` if you are a developer

By default, the project will be hosted on **port 3000**

## 🚀 The future

List of possible future features

- [ ] Config files
- [ ] Custom rewards support
- [ ] More voices from different service
- [ ] Sub only mode
- [ ] Character limit
- [ ] Word blacklist

## 🗺️ License

Author: [Vuurvos1](https://github.com/Vuurvos1), license by [MIT](#)

## 📝 Sources and credits

This project is based on HighlightOfMyChat by Instafluff,
find it at [github.com/instafluff/HighlightOfMyChat](https://github.com/instafluff/HighlightOfMyChat)
