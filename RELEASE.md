# Publication / Release

Ce document décrit comment publier l’extension sur le Visual Studio Code Marketplace.

## 1. Mettre à jour les placeholders
Éditer `package.json` et remplacer :
- `publisher`: identifiant exact du Publisher Marketplace (créé une seule fois).
- `repository.url`, `bugs.url`, `homepage`: URL réelles du repo Git.

Vérifier aussi :
- `version` (suivre SemVer, ex: 0.1.0, puis patch/minor/major)
- `icon` (fichier présent: `images/icon.png`)

## 2. Créer le Publisher (si pas déjà fait)
Aller sur https://marketplace.visualstudio.com/manage -> Create Publisher.
Noter l’identifiant (il doit correspondre au champ `publisher`).

## 3. Générer un Personal Access Token (Azure DevOps)
- Scope: Marketplace (Manage + Acquire)
- Conserver le token de façon sécurisée (ne pas commit).

## 4. Login avec vsce
```
npx vsce login <publisher>
```
Coller le token.

## 5. Vérifications pré-release
```
npm ci
npm run lint
npm run compile
```
Optionnel: test packaging local
```
npx vsce package
```

## 6. Publier
Incrémenter la version puis publier :
```
npm version patch   # ou minor / major
npx vsce publish
```
Git push (tags inclus) :
```
git push origin main --tags
```

## 7. Tester sur une installation propre
Télécharger depuis Marketplace OU :
```
code --install-extension mehdi-plus-<version>.vsix
```
Ouvrir un workspace et vérifier que le mode `vibeplus` apparaît dans le sélecteur des chat modes.

## 8. Checklist pré-release
- [ ] Placeholders remplacés
- [ ] Version incrémentée
- [ ] Lint OK
- [ ] Compile OK
- [ ] CHANGELOG mis à jour
- [ ] Tag créé
- [ ] Publication vsce effectuée

## 9. Open VSX (optionnel)
```
npx ovsx publish --pat <token_openvsx>
```

## 10. Sécurité
- Ne publie jamais le token dans le dépôt.
- Utiliser variables d’environnement local/CI pour automation.

## 11. Automation (CI) (idée)
Un job GitHub Actions peut déclencher `vsce publish` si `package.json` version change sur branche main + tag signé.
