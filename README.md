# Vibe+ Copilot Mode / Prompt Helper

Extension VS Code qui :
1. Fournit un mode IA personnalisé "Vibe+" à GitHub Copilot (priorités sécurité, maintenabilité, performance raisonnée, élégance).
2. Génère / maintient un fichier global de chat mode (`vibe-plus.chatmode.md`) placé dans le dossier utilisateur VS Code (`User/prompts`).
3. Propose des commandes utilitaires pour envoyer rapidement des prompts à Copilot Chat (usage interne des commandes non stables `github.copilot.*`).

## Fonctionnement
À l'activation :
- Vérifie / ré-initialise le fichier `.github/copilot-instructions.md` si corrompu (présence du marqueur `<system>`).
- Crée le fichier global `vibe-plus.chatmode.md` (si absent).
- Laisse, pour rétrocompat, un fichier dans le workspace (`.github/chatmodes/vibe-plus.chatmode.md`) sans écraser les modifications locales existantes.
- Sur première installation ou mise à jour : affiche une notification avec bouton Reload pour recharger la fenêtre (recommandé afin que Copilot rescane les modes).

## Commandes
| Commande | Effet |
|----------|-------|
| `copilotPrompt.ask` | Saisie rapide d’un prompt et tentative d’envoi direct à Copilot Chat. |
| `copilotPrompt.listCopilotCommands` | Liste les commandes internes Copilot détectées. |
| `vibeplus.applyMode` | Vérifie / réapplique instructions + chat mode. |
| `vibeplus.openModeFile` | Ouvre le fichier global `vibe-plus.chatmode.md`. |
| `vibeplus.recreateModeFile` | Régénère (force) le chat mode global. |

## Installation (développement local)
```bash
npm install
npm run compile
```
F5 pour lancer la session Extension Development Host.

## Installation depuis Marketplace
1. Rechercher "Mehdi+" dans Extensions.
2. Installer (dépendance: GitHub Copilot).
3. Une notification peut proposer Reload (recommandé au premier démarrage / upgrade).
4. Ouvrir Copilot Chat, sélectionner le mode `vibe-plus` si listé.

### Via fichier VSIX
```bash
code --install-extension mehdi-plus-<version>.vsix
```

## Mode Vibe+
Le contenu système (rôle, workflow, principes) est embarqué dans le fichier global. Modifier avec prudence : une régénération forcée via `vibeplus.recreateModeFile` réécrira le contenu standard.

## Limitations
- Pas d’API officielle pour piloter Copilot → les commandes internes peuvent cesser de fonctionner.
- Le rechargement est recommandé pour que Copilot prenne immédiatement en compte un nouveau chat mode.

## CLI (expérimental)
```bash
code chat -m vibe-plus "Explique la structure du projet"
```
(Le nom effectif peut dépendre de l’indexation interne des modes.)

## Dépannage
- Chat mode introuvable : recharger la fenêtre (Ctrl+Shift+P → Reload Window) et vérifier que le fichier global existe dans `User/prompts`.
- Envoi prompt échoué : la commande interne Copilot peut avoir changé; ouvrir le panneau et coller manuellement.
- Fichier écrasé : utiliser le contrôle de version local ou désactiver la régénération automatique (`vibeplus.autoApplyOnStartup = false`).

## Release
Voir `RELEASE.md` pour le flux complet (versioning, publication). Changelog dans `CHANGELOG.md`.

## Roadmap / Idées futures
- Historique local des prompts
- UI graphique pour sélection de modes
- Analyse automatique du repo et suggestions de tests
- Diff/merge intelligent des instructions

## Licence
MIT
