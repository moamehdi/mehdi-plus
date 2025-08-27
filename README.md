# VIBE+ & RETRODOC+ – Custom Chat Modes Copilot

Extension qui installe deux modes de chat globaux pour GitHub Copilot :

- **VIBE+** : assistant de développement sécurisé / productivité.
- **RETRODOC+** : orchestration de rétro‑documentation (génération table des matières, index, suivi, rédaction, reprise, vérification finale).

Les deux fichiers sont créés (ou vérifiés) dans le dossier utilisateur VS Code `User/prompts` :
- `VIBE+.chatmode.md`
- `RETRODOC+.chatmode.md`

Anciennes instructions projet (`.github/copilot-instructions.md`) désactivées.

## Fonctionnalités détaillées

### VIBE+
Objectif : fournir un copilote de développement orienté sécurité, maintenabilité et qualité, avec un style de réponse concis et opérationnel.

Comportement clé intégré dans le fichier `VIBE+.chatmode.md` :
- Cadre d'identité (rôle senior full‑stack + sécurité) et priorités (sécurité → maintenabilité → performance → simplicité).
- Processus structuré (analyse → planification → exécution → vérification) imposé au modèle via le prompt système.
- Directives de communication (ton clair, concis, orienté action; pas de verbosité inutile).
- Principes pour éviter l'arrêt prématuré et favoriser l'exécution complète des tâches.
- Règles de structuration des listes de tâches et gestion minimale des explications.

Utilisation typique :
1. Sélectionner le mode VIBE+ dans Copilot Chat.
2. Formuler une demande (ex: "Audit rapide des points de sécurité dans ce service" ou "Refactor de ce module pour réduire duplication").
3. Le mode force l'IA à : analyser, proposer un plan, exécuter par étapes, vérifier.

Valeur ajoutée : cohérence méthodologique, réduction du bruit, focalisation sécurité/qualité.

### RETRODOC+
Objectif : orchestrer automatiquement une rétro‑documentation complète d'une application à partir du code source (#codebase) et produire tous les artefacts structurés.

Phases automatisées (séquencées) :
1. Collecte de métadonnées (questions interactives obligatoires/optionnelles) : nom, description, volumétrie, techno, objectifs, public, niveau de détail, contraintes.
2. Génération de la Table des matières (`./doc/tabledesmatiere.md`).
3. Génération du fichier de suivi (`./doc/check.md`) avec cases à cocher + pourcentage.
4. Génération de l'Index (`./doc/index.md`) mappant sections ↔ fichiers/répertoires/points d'entrée/dépendances.
5. Rédaction section par section (`./doc/section_X.md`) avec :
	- Exemples de code commentés
	- Diagrammes Mermaid (architecture / flux)
	- Références croisées
	- Mise à jour automatique de `check.md` (progression + date)
6. Reprise après interruption (reconstruction d'état → prochaine section).
7. Vérification finale (statuts complète/partielle/non documentée) + rapport qualité (`./doc/rapport_verification.md`) + proposition d'ajout de liens hypertexte dans la table des matières + liens retour dans chaque section.

Artefacts produits (dans `./doc/`) :
- `tabledesmatiere.md` : structure hiérarchique exhaustive.
- `check.md` : suivi progression (cases, ratio, %).
- `index.md` : correspondance sections ↔ code (fichiers, répertoires, dépendances critiques).
- `section_X.md` : documentation détaillée par grande section.
- `rapport_verification.md` : audit de complétude et recommandations.

Logique de reprise : si l'utilisateur dit "reprendre" / "continue" le mode exécute la phase de synchronisation (réanalyse `./doc`) puis reprend au bon endroit.

Sécurité & robustesse : chaque création vérifie l'existence préalable pour éviter d'écraser un contenu déjà pertinent (sauf régénération explicite).

### Sélection & chargement
Les deux modes deviennent disponibles dans la liste des modes Copilot après création/reload. Si un mode n'apparaît pas :
- Vérifier existence des fichiers `VIBE+.chatmode.md` et `RETRODOC+.chatmode.md` dans `User/prompts`.
- Recharger la fenêtre VS Code.

## Utilisation
1. Installer l’extension (Copilot requis).
2. Recharger la fenêtre si notification (ou palette: Reload Window) pour prise en compte des nouveaux modes.
3. Ouvrir Copilot Chat et sélectionner le mode souhaité (VIBE+ ou RETRODOC+).

## Commandes
### VIBE+
- `Vibe+ : Appliquer / Vérifier le mode` (`vibeplus.applyMode`)
- `Vibe+ : Ouvrir le fichier de mode` (`vibeplus.openModeFile`)
- `Vibe+ : Régénérer le fichier de mode` (`vibeplus.recreateModeFile`)

### RETRODOC+
- `RETRODOC+ : Appliquer / Vérifier le mode` (`retrodoc.applyMode`)
- `RETRODOC+ : Ouvrir le fichier de mode` (`retrodoc.openModeFile`)
- `RETRODOC+ : Régénérer le fichier de mode` (`retrodoc.recreateModeFile`)



## Résolution de problèmes
- Mode absent : recharger la fenêtre et vérifier que les fichiers `.chatmode.md` existent dans `User/prompts`.
- Besoin de forcer mise à jour : utiliser la commande de régénération correspondante.

## Licence
Copyright © 2025 Orange. MIT
