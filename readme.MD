# Homie Hopper
Homie Hopper is a web application for managing animals in shelters. Users can view, add, edit, and delete animals and shelters, as well as leave comments on animals. Users can also mark animals as favorites.

## Deployment Link
<a href='https://homie-hopper-b38b07fe50d2.herokuapp.com/'>https://homie-hopper-b38b07fe50d2.herokuapp.com/</a>


# Screenshots
<img src="https://i.imgur.com/7mkvw6c.png">
<img src="https://i.imgur.com/VNh60ID.png">


## Technologies
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Features

- User authentication (sign up, sign in, sign out)
- View, add, edit, and delete animals
- View, add, edit, and delete shelters
- Leave comments on animals
- Mark animals as favorites

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up or sign in to start using the application.
3. Use the navigation bar to access different sections of the application.

## Folder Structure

```plaintext
homie-hopper/
├── controllers/
│   ├── animal.js
│   ├── shelter.js
│   └── user.js
├── middleware/
│   ├── is-comment-author.js
│   ├── is-signed-in.js
│   └── pass-user-to-view.js
├── models/
│   ├── animal.js
│   ├── comment.js
│   ├── shelter.js
│   └── user.js
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── views/
│   ├── animals/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── partials/
│   │   └── _navbar.ejs
│   ├── shelters/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── users/
│   │   ├── sign-in.ejs
│   │   ├── sign-up.ejs
│   │   └── profile.ejs
│   └── index.ejs
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md

## Routing Examples

### Animals

| HTTP Method | URL Endpoint                  | Controller Action  | Purpose                                                             |
|-------------|-------------------------------|--------------------|---------------------------------------------------------------------|
| GET         | /animals                      | animalsCtrl.index  | Display all animals                                                 |
| GET         | /animals/new                  | animalsCtrl.new    | Show form to create a new animal                                    |
| POST        | /animals                      | animalsCtrl.create | Create a new animal                                                 |
| GET         | /animals/:id                  | animalsCtrl.show   | Display a specific animal                                           |
| GET         | /animals/:id/edit             | animalsCtrl.edit   | Show form to edit an animal                                         |
| PUT         | /animals/:id                  | animalsCtrl.update | Update an animal                                                    |
| DELETE      | /animals/:id                  | animalsCtrl.delete | Delete an animal                                                    |
| POST        | /animals/:id/favorite         | animalsCtrl.favorite | Favorite/Unfavorite an animal                                      |
| POST        | /animals/:id/comments         | commentsCtrl.create | Add a comment to an animal                                          |
| DELETE      | /animals/:id/comments/:commentId | commentsCtrl.delete | Delete a comment                                                   |

### Shelters

| HTTP Method | URL Endpoint                  | Controller Action  | Purpose                                                             |
|-------------|-------------------------------|--------------------|---------------------------------------------------------------------|
| GET         | /shelters                     | sheltersCtrl.index | Display all shelters                                                |
| GET         | /shelters/new                 | sheltersCtrl.new   | Show form to create a new shelter                                   |
| POST        | /shelters                     | sheltersCtrl.create | Create a new shelter                                                |
| GET         | /shelters/:id                 | sheltersCtrl.show  | Display a specific shelter                                          |
| GET         | /shelters/:id/edit            | sheltersCtrl.edit  | Show form to edit a shelter                                         |
| PUT         | /shelters/:id                 | sheltersCtrl.update | Update a shelter                                                    |
| DELETE      | /shelters/:id                 | sheltersCtrl.delete | Delete a shelter                                                    |

### Users

| HTTP Method | URL Endpoint                  | Controller Action  | Purpose                                                             |
|-------------|-------------------------------|--------------------|---------------------------------------------------------------------|
| GET         | /users/sign-up                | usersCtrl.signUpForm | Show sign-up form                                                  |
| POST        | /users/sign-up                | usersCtrl.signUp   | Handle sign-up                                                     |
| GET         | /users/sign-in                | usersCtrl.signInForm | Show sign-in form                                                  |
| POST        | /users/sign-in                | usersCtrl.signIn   | Handle sign-in                                                     |
| GET         | /users/sign-out               | usersCtrl.signOut  | Handle sign-out                                                    |
