import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import image from "@rollup/plugin-image";
import { exec } from "child_process";

import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import purgecss from "@fullhuman/postcss-purgecss";

// Minifier
import terser from "@rollup/plugin-terser";

// Post CSS
import postcss from "rollup-plugin-postcss";

// Inline to single html
import htmlBundle from "rollup-plugin-html-bundle";

// Typescript
import typescript from "@rollup/plugin-typescript";
import cssnano from "cssnano";

const production = !process.env.ROLLUP_WATCH;

import del from 'rollup-plugin-delete';

export default {
  input: 'src/assets/js/main.js', // replace with the entry point of your app
  output: {
    dir: './dist',
    format: 'esm',
  },
  plugins: [
    del({ targets: './dist/*' }), // equivalent to emptyOutDir: true
    postcss({
      plugins: [
        autoprefixer(),
        postcssPresetEnv(),
        purgecss({
          content: ["./**/*.html"],
        }),
        cssnano()
      ],
      inject: false, // assuming you want to create a separate CSS file and not inline it
    }),
    terser(), // assuming you want to minify the JavaScript,
    htmlBundle({
        template: "index.html",
        target: "dist/index.html",
        inline: true,
      }),
  ]
};


// /**
//  * @type {import('rollup').RollupOptions} //aonde q ta o link entre esse rollupoptions com o array de configuraçao ?
//  */
// export default
//   {
//     input: ["src/assets/js/main.js"],
//     output: [
//       {
//         format: "umd",
//         name: "ui",
//         file: "dist/main.js",
//         sourcemap: "inline",
        
//       }
//     ],
//     watch: {
//       clearScreen: true,
//     },

//     plugins: [
//       // Handle external dependencies
//       resolve({
//         browser: true,
//         // dedupe: (importee) => importee === "svelte" || importee.startsWith("svelte/"),
//         // extensions: [".svelte", ".mjs", ".js", ".json", ".node", ".ts"],
//         // mainFields: ["svelte", "browser", "module", "main"],
//         // exportConditions: ["svelte"],
//       }),

//       commonjs({ transformMixedEsModules: true }),
//       // Typescript
//       typescript(),

//       // Post CSS config
//       postcss({
//         extensions: [".css", ".scss", ".sass"],
//         plugins: [autoprefixer,
//             postcssPresetEnv(),
//             purgecss({
//                 content: ["./**/*.html"],
                
//             }),
//             cssnanoPlugin
//         ],
//       }),
//       image(),
//       // This inject the bundled version of main.js
//       // into the the template
//       htmlBundle({
//         template: "src/index.html",
//         target: "dist/",
//         inline: true,
//       }),

//       // If dev mode, serve and livereload
//       !production && livereload("dist"),
//       !production && serve(),

//       // If prod mode, we minify
//       production && terser(),
//     ],
//   };

// function serve() {
//   return {
//     writeBundle() {
//       exec(`osascript rerun-plugin.applescript`, (error, stdout, stderr) => {
//         if (error) {
//           console.log(`Rerun: ${error.message}`);
//           return;
//         }
//         if (stderr) {
//           console.log(`Rerun: ${stderr}`);
//           return;
//         }
//         console.log(`Rerun: ${stdout}`);
//       });
//     },
//   };
// }
