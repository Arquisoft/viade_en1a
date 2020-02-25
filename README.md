[![Build Status](https://travis-ci.org/Arquisoft/viade_en1a.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_en1a)
[![codecov](https://codecov.io/gh/Arquisoft/viade_en1a/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_en1a)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/023c3cc59c984813bbc123d68bacf079)](https://www.codacy.com/gh/Arquisoft/viade_en1a?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_en1a&amp;utm_campaign=Badge_Grade)

# VIADE EN1A

This repository contains a skeleton of the VIADE project.

This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

The app is deployed at [https://arquisoft.github.io/viade_en1a/](https://arquisoft.github.io/viade_en1a/) which also contains a [technical documentation](https://arquisoft.github.io/viade_en1a/docs).

More information about how this project has been setup is available [in the wiki](https://github.com/Arquisoft/viade_en1a/wiki).

## Contributors

- [Jose Emilio Labra Gayo](http://labra.weso.es)
- Lucía Blanco Llera
- Víctor Gonzalo Cristóbal
- [Daniel Rückert García](https://polectron.xyz)
- Adrián Pérez Manso
- Daniel Adrian Mare
- Nut Bandera González
- Sofía García Barbés


## Requirements

- Node.js
- Ruby
- Asciidoctor and Asciidoctor Diagram

```
sudo apt-get update
sudo apt-get -y install ruby nodejs
sudo gem install asciidoctor asciidoctor-diagram
sudo apt-get -y install graphviz
```

## Running project

```
npm install
npm start
```

## Building documentation

```
Node and Ruby are required. 
npm install
gem install asciidoctor
gem install asciidoctor-diagram 
npm run docs

Note: if the command gem install asciidoctor-diagram takes a long time to finish, do Ctrl+C, and you will see magic.

```` 
