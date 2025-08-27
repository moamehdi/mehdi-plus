# VIBE+ – Custom Chat Mode Copilot

Cette extension crée automatiquement un mode de chat personnalisé **Vibe+** pour GitHub Copilot.

## Ce que ça fait
- Génère (et régénère sur demande) le fichier global `vibe-plus.chatmode.md` dans le dossier utilisateur VS Code (`User/prompts`).
- Propose une commande pour ouvrir ou régénérer ce fichier.
- Affiche une notification (première installation / mise à jour) suggérant un Reload pour que Copilot recharge les modes.

> Aucune autre logique de configuration projet n’est maintenue (les anciennes instructions `.github/copilot-instructions.md` sont désactivées).

## Utilisation
1. Installer l’extension (Copilot doit être présent).
2. Recharger la fenêtre si demandé (ou manuellement via Command Palette: Reload Window).
3. Ouvrir Copilot Chat et sélectionner le mode Vibe+ (nom dérivé du fichier `vibe-plus.chatmode.md`).

## Commandes
- `Vibe+ : Ouvrir le fichier de mode` (`vibeplus.openModeFile`)
- `Vibe+ : Régénérer le fichier de mode` (`vibeplus.recreateModeFile`)
- (Optionnelles) utilitaires prompt : `copilotPrompt.ask`, `copilotPrompt.listCopilotCommands`

## Développement local
```bash
npm install
npm run compile
```
Lancer avec F5.

## Résolution de problèmes
- Le mode n’apparaît pas : recharger VS Code et vérifier la présence de `vibe-plus.chatmode.md` dans `User/prompts`.
- Contenu modifié perdu : la commande de régénération réécrit le fichier (éviter si personnalisation locale).

## Licence
MIT
