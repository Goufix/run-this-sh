import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let runScript = vscode.commands.registerCommand("run-this-shell.run", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    let currentFilePath = vscode.window.activeTextEditor?.document.uri.fsPath;
    currentFilePath = currentFilePath?.split("\\").join("/");
    console.log("currentFilePath", currentFilePath);

    if (!currentFilePath) {
      return;
    }
    if (vscode.window.activeTextEditor?.document.languageId === "shellscript") {
      const terminal =
        vscode.window.terminals.length > 0
          ? vscode.window.terminals[0]
          : vscode.window.createTerminal();
      terminal.show();
      terminal.sendText(`bash ${currentFilePath}`);
    }
  });

  context.subscriptions.push(runScript);

  const button = loadButton();

  context.subscriptions.push(button);
}

function loadButton() {
  const runButton = vscode.window.createStatusBarItem(
    "run-this-shell.run", // id
    vscode.StatusBarAlignment.Left
  );
  runButton.text = "$(play) Run shell";
  runButton.command = "run-this-shell.run";
  runButton.show();

  return runButton;
}

// This method is called when your extension is deactivated
export function deactivate() {}
