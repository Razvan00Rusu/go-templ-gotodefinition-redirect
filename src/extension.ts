import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.goToDefinitionRedirect",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const position = editor.selection.active;
      const document = editor.document;
      const word = document.getText(document.getWordRangeAtPosition(position));
      console.log(position, document, word);

      // Call the default go to definition command
      const definitions = await vscode.commands.executeCommand<
        vscode.LocationLink[]
      >("vscode.executeDefinitionProvider", document.uri, position);

      console.log(definitions);
      if (!definitions || definitions.length === 0) {
        return;
      }

      for (const def of definitions) {
        console.log("def:", def);
        const test = def as any;
        console.log(JSON.stringify(test));
        const targetUri = test["uri"]["path"];
        console.log(targetUri);

        if (targetUri.endsWith("_templ.go")) {
          const templateFilePath = targetUri.replace(/_templ\.go$/, ".templ");
          console.log("templateFilePath: ", templateFilePath);
          if (fs.existsSync(templateFilePath)) {
            const templateDocument = await vscode.workspace.openTextDocument(
              templateFilePath
            );
            const templateEditor = await vscode.window.showTextDocument(
              templateDocument
            );

            // Search for the token in the .templ file
            const text = templateDocument.getText();
            const index = text.indexOf(word);
            if (index !== -1) {
              const position = templateDocument.positionAt(index);
              templateEditor.selection = new vscode.Selection(
                position,
                position
              );
              templateEditor.revealRange(new vscode.Range(position, position));
            }
            return;
          }
        }
      }

      // If no template file is found, fall back to the default behavior
      vscode.commands.executeCommand("editor.action.revealDefinition");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
