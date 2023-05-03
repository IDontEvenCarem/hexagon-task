# HexOcean recrutation project by Kajetan Owczarek
This is a small project that I have build for the frontend react developer
job recrutation at HexOcean. The technologies this project uses are:
 - Vite - build system
 - React - UI framework
 - Redux - State management (not really used here)
 - redux-form - Form support

## Developement Setup
To run this project, you should have Node.js and npm installed. Once you have those, getting the project working should be as simple as:
```bash
npm install
npm run dev
```

After running that command, the Vite server should start serving the project, as well as providing HMR for live preview.
> NOTE: Vite's live preview does not properly reload redux-form validation functions. It might have issues with other parts of the code, but that's the only one I have encountered. For logic changes, I recomend a full page reload. For UI changes, HMR works well.

Project developed using Node.js version 17.2.0 and npm version 8.13.2.

## Total time taken:
2:31h of doing dedicated coding, not including writing this readme. 
