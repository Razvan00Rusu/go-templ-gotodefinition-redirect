# go-templ-gotodefinition-redirect README

An extension that hijacks go-to-definition requests in `.go` files if the definition will be in a `*_templ.go` file.
If so, it will redirect the browser to `*.templ` instead, and find the token in the file.

The default keybinding is `CMD+Shift+D` (This was developed on Mac). This can be changed by changing the `extension.goToDefinitionRedirect` keybinding in settings.

NOTE: This was made super quickly (<10 mins) with the help of ChatGPT - contributions are welcome, just open a PR! 

##Installation
1. Download the VSIX file from the 'Releases' tab
2. Go to your `Extensions` tab in VSCode
3. Click the 3 dots at the top (on the right of `Extensions`) and click `Install from VSIX...`
