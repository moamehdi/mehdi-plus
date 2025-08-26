import * as vscode from 'vscode';
import { promises as fs } from 'fs';
import * as path from 'path';

// NOTE: Les commandes 'github.copilot.*' sont internes et non garanties stables.

const VIBE_PROMPT_FILE_RELATIVE = path.posix.join('.github', 'copilot-instructions.md');
const VIBE_MODE_DIR = path.posix.join('.github', 'chatmodes');
const VIBE_MODE_FILE = path.posix.join(VIBE_MODE_DIR, 'vibeplus.chatmode.md');
const VIBE_MODE_MARKER = 'VIBEPLUS_MODE';

// Contenu système Vibe+ (doit rester aligné avec la source).
const VIBE_SYSTEM_PROMPT = `---\n\ntools: ['changes', 'codebase', 'editFiles', 'extensions', 'fetch', 'findTestFiles', 'githubRepo', 'new', 'openSimpleBrowser', 'problems', 'runCommands', 'runNotebooks', 'runTasks', 'runTests', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure', 'usages', 'vscodeAPI', 'configurePythonEnvironment', 'getPythonEnvironmentInfo', 'getPythonExecutableCommand', 'installPythonPackage', 'assessApplication', 'buildFix_agent', 'createMigrationPlan', 'createMigrationSummary', 'migrateCode', 'uploadAssessSummaryReport', 'build_java_project', 'confirm_upgrade_plan_for_java_project', 'generate_tests_for_java', 'generate_upgrade_plan_for_java_project', 'run_tests_for_java', 'summarize_upgrade', 'upgrade_java_project_using_openrewrite', 'validate_behavior_changes_for_java', 'validate_cves_for_java'] \n\n---\n\n<system> ... (tronqué – voir fichier généré)\n`;


async function ensureVibeInstructions(workspaceFolder: vscode.WorkspaceFolder | undefined) {
  if (!workspaceFolder) {
    vscode.window.showWarningMessage('Aucun workspace ouvert : impossible de créer .github/copilot-instructions.md');
    return;
  }
  const target = path.join(workspaceFolder.uri.fsPath, VIBE_PROMPT_FILE_RELATIVE);
  const dir = path.dirname(target);
  const finalContentMarker = '<system>';
  // On ne ré-insère pas tout le long prompt ici car il est déjà stocké dans le fichier ajouté au repo.
  try {
    await fs.mkdir(dir, { recursive: true });
    let existing: string | undefined;
    try { existing = await fs.readFile(target, 'utf8'); } catch { /* ignore */ }
    // Si le fichier n'existe pas, on ne le recrée pas ici : il est géré par le dépôt (créé initialement).
    if (!existing) {
      // Rien – le fichier initial doit être versionné. (Si besoin on pourrait écrire VIBE_SYSTEM_PROMPT minimal.)
      return;
    }
    if (!existing.includes(finalContentMarker)) {
      // Fichier corrompu ou vide — on ré-écrit minimal.
      await fs.writeFile(target, VIBE_SYSTEM_PROMPT, 'utf8');
      vscode.window.setStatusBarMessage('Vibe+ instructions ré-initialisées.', 5000);
      return;
    }
    // Pour futur : possibilité d'injecter diff dynamiquement.
  } catch (e:any) {
    vscode.window.showErrorMessage('Erreur création instructions Vibe+: ' + e.message);
  }
}

async function ensureVibeChatMode(workspaceFolder: vscode.WorkspaceFolder | undefined, force = false) {
  if (!workspaceFolder) return;
  const root = workspaceFolder.uri.fsPath;
  const absFile = path.join(root, VIBE_MODE_FILE);
  const dir = path.dirname(absFile);
  const modeContent = `---\n` +
    `description: Mode Vibe+ (Orange DSI) priorise sécurité, maintenabilité, performance raisonnée, élégance. Assistance experte full-stack.` + `\n` +
    `tools: ['codebase','search','usages','fetch','findTestFiles','githubRepo','runCommands','runTests','problems']\n` +
    `---\n` +
    `# Vibe+ Chat Mode (${VIBE_MODE_MARKER})\n` +
    `Vous adoptez le rôle Vibe+ tel que défini dans le fichier principal d'instructions (.github/copilot-instructions.md).\n` +
    `Conduis :\n` +
    `1. Sécurité & conformité\n2. Maintenabilité & lisibilité\n3. Performance raisonnée\n4. Simplicité & élégance\n` +
    `## Directives\n- Analyse systématique, plan clair avant exécution.\n- Réponses concises, structurées, listant tâches + validations.\n- Proposer améliorations sécurité/tests.\n- Pas d'actions destructrices sans confirmation explicite.\n` +
    `## Références\nVoir le fichier d'instructions complet pour workflow détaillé.\n`;
  try {
    await fs.mkdir(dir, { recursive: true });
    let exists = false;
    try { await fs.access(absFile); exists = true; } catch { /* */ }
    if (exists && !force) {
      const current = await fs.readFile(absFile, 'utf8');
      if (current.includes(VIBE_MODE_MARKER)) return; // déjà bon
    }
    await fs.writeFile(absFile, modeContent, 'utf8');
  } catch (e: any) {
    vscode.window.showErrorMessage('Erreur création chat mode Vibe+: ' + e.message);
  }
}

async function sendPromptToCopilot(prompt: string) {
  const allCommands = await vscode.commands.getCommands(true);
  const candidateChatSend = [
    'github.copilot.chat.send',
    'github.copilot.chat.request',
    'github.copilot.generate'
  ].find(c => allCommands.includes(c));

  if (candidateChatSend) {
    try {
      await vscode.commands.executeCommand(candidateChatSend, { prompt });
      vscode.window.setStatusBarMessage(`Copilot: prompt envoyé (${candidateChatSend}).`, 4000);
      return;
    } catch (err) {
      console.warn('Echec envoi via', candidateChatSend, err);
    }
  }

  const openPanelCmd = 'github.copilot.openPanel';
  if (allCommands.includes(openPanelCmd)) {
    try {
      await vscode.commands.executeCommand(openPanelCmd);
      vscode.window.showInformationMessage('Panneau Copilot ouvert. Collez votre prompt : ' + prompt);
      return;
    } catch (err) {
      console.warn('Echec ouverture panneau Copilot', err);
    }
  }

  vscode.window.showWarningMessage("Impossible d'envoyer le prompt automatiquement. Copiez/collez : " + prompt);
}

export function activate(context: vscode.ExtensionContext) {
  const askDisposable = vscode.commands.registerCommand('copilotPrompt.ask', async () => {
    const prompt = await vscode.window.showInputBox({
      prompt: 'Entrez un prompt pour GitHub Copilot',
      placeHolder: 'Ex: Explique le code sélectionné',
      validateInput: value => value.trim().length === 0 ? 'Le prompt ne peut pas être vide.' : undefined
    });
    if (!prompt) return;
    await sendPromptToCopilot(prompt.trim());
  });

  const listDisposable = vscode.commands.registerCommand('copilotPrompt.listCopilotCommands', async () => {
    const all = await vscode.commands.getCommands(true);
    const filtered = all.filter(c => c.toLowerCase().includes('copilot'));
    const pick = await vscode.window.showQuickPick(filtered, { placeHolder: 'Commandes Copilot internes' });
    if (pick) {
      vscode.window.showInformationMessage('Commande: ' + pick);
    }
  });

  // Commande (sera activable quand ajoutée à package.json) pour régénérer.
  const applyDisposable = vscode.commands.registerCommand('vibeplus.applyMode', async () => {
    const folder = vscode.workspace.workspaceFolders?.[0];
    await ensureVibeInstructions(folder);
    await ensureVibeChatMode(folder);
    vscode.window.showInformationMessage('Mode Vibe+ appliqué (instructions présentes dans .github/copilot-instructions.md).');
  });

  const openModeFileDisposable = vscode.commands.registerCommand('vibeplus.openModeFile', async () => {
    const folder = vscode.workspace.workspaceFolders?.[0];
    if (!folder) { vscode.window.showWarningMessage('Pas de workspace.'); return; }
    await ensureVibeChatMode(folder); // s'assurer de l'existence
    const doc = await vscode.workspace.openTextDocument(path.join(folder.uri.fsPath, VIBE_MODE_FILE));
    await vscode.window.showTextDocument(doc, { preview: false });
  });

  const recreateModeDisposable = vscode.commands.registerCommand('vibeplus.recreateModeFile', async () => {
    const folder = vscode.workspace.workspaceFolders?.[0];
    if (!folder) { vscode.window.showWarningMessage('Pas de workspace.'); return; }
    await ensureVibeChatMode(folder, true);
    vscode.window.showInformationMessage('Fichier de mode Vibe+ régénéré.');
  });

  context.subscriptions.push(askDisposable, listDisposable, applyDisposable, openModeFileDisposable, recreateModeDisposable);
  // Auto ensure instructions si activé.
  const cfg = vscode.workspace.getConfiguration();
  if (cfg.get('vibeplus.autoApplyOnStartup') !== false) {
    const folder = vscode.workspace.workspaceFolders?.[0];
    ensureVibeInstructions(folder);
    ensureVibeChatMode(folder);
  }
  console.log('Vibe+ Copilot helper activé');
}

export function deactivate() {}
