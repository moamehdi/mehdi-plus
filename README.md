# Vibe+ Copilot Mode / Prompt Helper

Extension VS Code pour :
1. Fournir un mode personnalisé "Vibe+" à GitHub Copilot via le fichier `.github/copilot-instructions.md`.
2. Accélérer (sans garantie) l'envoi d'un prompt vers Copilot Chat via des commandes internes.

## Limites
- Pas d'API publique stable pour piloter Copilot Chat.
- Les commandes internes peuvent changer.

## Commandes
- Copilot: Envoyer un prompt rapide (`copilotPrompt.ask`)
- Copilot: Lister les commandes internes disponibles (`copilotPrompt.listCopilotCommands`)
- Vibe+ : Activer le mode Copilot (`vibeplus.applyMode`) – (re)valide la présence du fichier `.github/copilot-instructions.md`.

## Installation (local dev)
```bash
npm install
npm run compile
```
F5 pour lancer.

## Installation depuis Marketplace (après publication)
1. Ouvrir l'onglet Extensions puis rechercher "Mehdi+".
2. Installer (GitHub Copilot sera requis automatiquement).
3. Ouvrir un workspace => le fichier `/.github/chatmodes/vibeplus.chatmode.md` est créé.
4. Ouvrir Copilot Chat (Ctrl+Alt+I) et choisir le mode `vibeplus`.

### Via fichier VSIX
```
code --install-extension mehdi-plus-0.0.1.vsix
```

## Mode Vibe+
Le fichier `.github/copilot-instructions.md` contient le prompt système Vibe+ (rôle, priorités, workflow). Vous pouvez l'adapter si besoin. Si le contenu est supprimé/corrompu, exécutez la commande `Vibe+ : Activer le mode Copilot`.

### Notes
Les commandes internes `github.copilot.*` ne sont pas stables : l'envoi direct peut échouer ou changer. Le custom chat mode repose sur la présence du fichier `.chatmode.md` (preview VS Code >=1.101).

### CLI
Lancer directement une session chat avec le mode :
```
code chat -m vibeplus "Explique la structure du projet"
```

## Idées futures
## Release
Voir `RELEASE.md` pour le processus détaillé (mise à jour publisher, version, packaging et publication Marketplace).
- Historique local des prompts
- Injection contextuelle (sélection, tests, erreurs)
- Interface graphique dédiée
- Validation d'intégrité du prompt et diff automatique

## Licence
MIT
