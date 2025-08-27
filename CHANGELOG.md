# Changelog

## 1.1.0
- Ajout du mode global **RETRODOC+** pour orchestrer la rétro‑documentation (questions initiales, génération table des matières, check, index, rédaction section par section, reprise, vérification finale).
- Commands RETRODOC+ (apply/open/recreate) ajoutées.
- Unification des modes globaux (VIBE+.chatmode.md & RETRODOC+.chatmode.md) dans `User/prompts`.
- Nettoyage README (suppression instructions de dev locales, clarification usages).
- Mise à jour description extension & licence (attribution Orange).

## 0.0.3
- Création du fichier global de chat mode `vibe-plus.chatmode.md` dans le dossier utilisateur VS Code (`User/prompts`) au lieu de seulement le workspace.
- Rétrocompat : génération toujours tentée dans l'ancien emplacement `.github/chatmodes/` (et variante typo) sans écraser si présent.
- Notification (première installation / mise à jour) proposant un bouton Reload pour recharger la fenêtre et garantir que Copilot recharge les nouveaux modes.
- Regénération forcée via commande conserve les anciens emplacements + global.
- Code durci (évite ré-écritures inutiles, logs discrets en cas d'erreur de compatibilité).

## 0.0.1 (initial)
- Génération automatique du fichier d'instructions `.github/copilot-instructions.md` (si présent/corrompu).
- Génération automatique du custom chat mode `vibeplus.chatmode.md`.
- Commandes : appliquer, ouvrir, régénérer le mode + prompts Copilot.
- Dépendance GitHub Copilot déclarée.
- Icône placeholder.
