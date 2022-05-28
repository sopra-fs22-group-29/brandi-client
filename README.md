# Brändi Dog Client - SoPra FS22 
Brändi Dog is an awesome board game played by 4 people and now you are able to play it online. It is exciting because not only luck but also tactics and strategy play an imporntant part. Two people form a team and play togehter with the aim to be the first who moved their marbles into their finish.

## Built With
- [Blender](https://www.blender.org) - Used for 3D-modelling
- [ThreeJS](https://threejs.org) - Used to display 3D-objects 
- [ReactJS](https://reactjs.org) - Used to build UI


## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites and Installation

For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time.<br>
Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
You can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Release
TO ADD!

## Userflow 
After registering you get directed to the dashboard. Here you can create a new game or join a game using an existing game code. In the "Halted Games" section you will see all your unfinished games and will be able to rejoin them.<br>
<img width="720" alt="image" src="https://user-images.githubusercontent.com/91155540/170496155-9d908738-4c17-487b-8ecc-7b82824dbde1.png"><br>
You create a new game and give it the name "NewGame". You can copy the link to your clipboard and share it with your friends such that they can join your game. <br>
<img width="720" alt="image" src="https://user-images.githubusercontent.com/91155540/170496634-605c6d53-fce3-4c17-bac6-b5e2d6f29ff4.png"><br>
You join the "NewGame" game and wait until all other players joined. At the top left you can see which color you got assigned and who your partner is. When all players have joined you can do your first move. To do so click on the card you want to play, all marbles which can be moved by this card pop up. Click on one of the marbles and the field(s) you can move to get highlited. Choose a field and the marble moves to the field. Then it's the next players turn.<br>
![Gif_FirstMove](https://user-images.githubusercontent.com/91155540/170503391-ee1b3e65-710d-46f8-93e8-42430c86aeda.gif)
<br>
In a case that you cannot do any move a button gets displayed where you can put down your cards.

![Gif_PutCardsDown](https://user-images.githubusercontent.com/91155540/170505041-a7bde4d0-fdbb-40d4-a780-0a443d7f571a.gif)
<br>
Once your marble approaches your finish fields you need the exact values in order to move your marble into the fields.
![Gif_MoveIntoFinish](https://user-images.githubusercontent.com/91155540/170506435-45b8d66b-8d67-4231-abd1-e4fcf7e2fc6c.gif)
<br>
There are some special cards. For example with the card 4 you can move either 4 fields forwards or 4 fields backwards.
![Gif_Move4](https://user-images.githubusercontent.com/91155540/170508096-c371cb60-16b8-4cd7-b2ea-4cddc900d71e.gif)

You play along until one of the teams have all their marbles in the finish. You will get displayed a winning or loosing screen.
<img width="720" alt="Screenshot 2022-05-26 at 16 55 39" src="https://user-images.githubusercontent.com/91155540/170514944-f53ac174-303b-43c1-9ec5-f602295b1b68.png">


<img width="720" alt="Screenshot 2022-05-26 at 16 55 51" src="https://user-images.githubusercontent.com/91155540/170514852-b766e953-68ed-41f1-a119-db8b1fa141f9.png">


## Roadmap
- Exchange a card with your teammate everytime you get 6 cards
- Ranking over all users and played games

## Authors and Acknowledgement
- [Elena Graf](https://github.com/ElenaGrafUZH)
- [Eric Léger](https://github.com/EriCreator)
- [Szymon Modrzynski](https://github.com/shmnrr)
- [Dominik Sidler](https://github.com/SidlerD)

## License
MIT License

Copyright (c) [2022] [Elena Graf, Eric Léger, Szymon Modrzynski, Dominik Sidler]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
