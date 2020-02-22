# A Grasp fork
**Enhanced web snippets for org-mode notes**

This is a fork of Dmitrii Gerasimov's [Grasp](https://github.com/karlicoss/grasp), a browser extension for Chrome and Firefox which adds a button/keybinding to capture snippets and details from web pages including:
 * Current page title and url
 * Selected text
 * Additional comments
 * Tags

—and adding it into an [Org Mode](https://orgmode.org/) file of your choice.

After trying every note-taking/bookmark snippet platform around and being disappointed with having every company take my notes hostage, I decided to adopt org-mode so that I can take notes on my own terms.

I ran into Grasp on [Twitter](https://twitter.com/karlicoss/status/1226193108817367049) and decided to fiddle around with it after I realized it suited my needs for capturing snippets without having Emacs painstakingly configured across multiple environments. There's a flexibility inherent to plain text files has no compare.

New features added to this version include:
* [Rich text](https://orgmode.org/manual/Markup-for-Rich-Contents.html) Capturing
* Image retrieval & [inline image links](https://orgmode.org/manual/Images.html#Images)
* OCR support for captured images, to aid in full-text search of notes

The following is a demo of the original tool sans new features:
[Screenshot](https://user-images.githubusercontent.com/291333/51799721-a984eb80-221c-11e9-9612-8eb7f553dc01.png), [short demo](https://www.youtube.com/watch?v=Z8Bk-IazdGo).

For more information, check out the [official repository](https://github.com/karlicoss/grasp). The official README has a comparison between org-capture utilities, details on testing, and publishing to the extension web stores if that's what you're into. Modified sections are kept here to note fork differences and to get things running quickly from a dev environment.

# Running
In the simplest setup, the server runs locally, and you can use 'localhost' version of the extension. If you have to work on a computer where you can't run python scripts, or your target capture file is just not there, you can selfhost the server part elsewhere and use the 'any host' version. Don't forget to set the endpoint in extension settings!

1. Install python server dependencies by running `pip3 install -r requirements.txt` in the `server` directory
2. Install the server as a systemd service (to autostart it): `server/setup --path /path/to/your/capture.org [--port <custom port>] [--template <custom org-capture template>]`.

    Or alternatively, just run it directly if you don't want to autostart it: `server/grasp_server.py --path /path/to/your/capture.org [--port <custom_port>] [--template <custom org-capture template>]`.
3. Install browser extension and configure hotkeys

That's it! If you're using a custom port make sure it's the same as in the extension settings (default is `12212`).

# Dependencies
* `python3`
  * `requests`
  * `pytesseract`

# Permissions used
* `http://localhost/capture` for talking with the backend

   If you want to use an external URL as an endpoint, you will be prompted for a permission dynamically.

* `storage` for settings
* `notifications` for showing notification
* `activeTab` for requesting page info

# Building & developing
You need `npm` for building the extension.

    npm install
    ./build --target <browser> # e.g. ./build --target chrome or ./build --target firefox

After that you can find the extension in `dist` directory and **Load unpacked** if necessary. There is also Flow and Eslint set up.

# Credits
* [Dmitrii Gerasimov](https://github.com/karlicoss) for writing grasp and giving me a springboard for implementing a wish list of features I've been wanting to see in snippet managers
* Icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com/) licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
* [Original Org Capture extension](https://github.com/sprig/org-capture-extension)
* [Boilerplate for Webpack Chrome extension](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)
