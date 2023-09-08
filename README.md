# Soma- An OPen-Source Project That Allows Users To Easily Discover and Download New Books

[![Most Used Language](https://img.shields.io/github/languages/top/athenacats/soma?style=for-the-badge)](https://github.com/athenacats/soma)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)]
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]
[![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)]
[![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)]


[![Code Size](https://img.shields.io/github/languages/code-size/athenacats/soma?color=9cf&style=for-the-badge)]
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/esther-lonyangapuo/)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:chenalonya@gmail.com)

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Setup](#setup)
- [Project Status](#project-status)
- [Challenges Faced](#challenges-faced)
- [Future Implementation](#future-implementation)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Introduction

"Soma" is a Swahili word that means "to read". Admittedly, living in a third-world country means that for one to access current fiction or non-fiction books, they have to either spend to buy said books (which isn't a reality afforded to most), rely on getting outdated second-hand copies from westernized countries (which may take years), or go through what's considered less than legal means to access the books. 

Ethics and morality issues and standings aside, this app has been created to make it easier for users to access lists of the just-released books or search for whichever book they would like, and have direct links redirecting them to sites on which they can download the books in whichever format they want.

The website makes use of data from just-released books from Barnes and Noble, which is updated daily, limited to displaying 8 books at a time in order to keep the integrity of the website. Book searches and displays are made through API calls from Open Library. 

Users can sign up, search for books, rate books, see their rated books, and easily download EPUB or audiobook versions of the book- if the links are available on the provided linked websites. Users are advised to use a VPN while downloading the books.

To see the website in action, [click here](https://soma-production.up.railway.app/). Please note it takes the website some time to load up as it is hosted on the free plan.

## Technologies

The application runs on:
- React 18.2
- Bootstrap 5.3.1
- Mongoose 7.5.0
- Express 4.18.2
- Typescript 5.106

## Setup

To run this project:
- Clone the repository
- Install dependencies and dev dependencies found in package.json

```
$ npm run build
$ npm start
```

## Project Status

The project is complete.

## Challenges Faced

Accessing, collecting, and transmitting the data required for the various API calls was complicated but proved to be an interesting challenge to conquer. Goodreads API would have been perfect but is not public anymore.

## Future Implementation

- Include sign-in/up via Google and perhaps Goodreads
- Link a user's lists and books from Goodreads, which could prove problematic as Goodreads' API is not public
- Save all loaded books in MongoDB. Currently only saved data is a user's info and their saved books. Cannot aggregate ratings on the website itself.


## Licence

Soma is open-source and released under the [MIT License(https://github.com/swarupe7/MedPlant/blob/main/LICENSE)].

## Contact

Reach me on
[LinkedIn](https://www.linkedin.com/in/esther-lonyangapuo/)
[Email](mailto:chenalonya@gmail.com)
