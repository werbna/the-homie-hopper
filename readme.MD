# Homie Hopper
Homie Hopper is a web application for managing animals in shelters. Users can view, add, edit, and delete animals and shelters, as well as leave comments on animals. Users can also mark animals as favorites.



# Screenshots
<img src="https://i.imgur.com/7mkvw6c.png">
<img src="https://i.imgur.com/VNh60ID.png">

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


## Routing Examples

### Animals

| HTTP Method | URL Endpoint                      | Controller Action      | Purpose                                     |
|-------------|-----------------------------------|------------------------|---------------------------------------------|
| GET         | /animals                          | animalsCtrl.index      | Display all animals                         |
| GET         | /animals/new                      | animalsCtrl.new        | Show form to create a new animal            |
| POST        | /animals                          | animalsCtrl.create     | Create a new animal                         |
| GET         | /animals/:id                      | animalsCtrl.show       | Display a specific animal                   |
| GET         | /animals/:id/edit                 | animalsCtrl.edit       | Show form to edit an animal                 |
| PUT         | /animals/:id                      | animalsCtrl.update     | Update an animal                            |
| DELETE      | /animals/:id                      | animalsCtrl.delete     | Delete an animal                            |
| POST        | /animals/:id/favorite             | animalsCtrl.favorite   | Favorite/Unfavorite an animal               |
| POST        | /animals/:id/comments             | commentsCtrl.create    | Add a comment to an animal                  |
| DELETE      | /animals/:id/comments/:commentId  | commentsCtrl.delete    | Delete a comment                            |

### Shelters

| HTTP Method | URL Endpoint                      | Controller Action      | Purpose                                     |
|-------------|-----------------------------------|------------------------|---------------------------------------------|
| GET         | /shelters                         | sheltersCtrl.index     | Display all shelters                        |
| GET         | /shelters/new                     | sheltersCtrl.new       | Show form to create a new shelter           |
| POST        | /shelters                         | sheltersCtrl.create    | Create a new shelter                        |
| GET         | /shelters/:id                     | sheltersCtrl.show      | Display a specific shelter                  |
| GET         | /shelters/:id/edit                | sheltersCtrl.edit      | Show form to edit a shelter                 |
| PUT         | /shelters/:id                     | sheltersCtrl.update    | Update a shelter                            |
| DELETE      | /shelters/:id                     | sheltersCtrl.delete    | Delete a shelter                            |

### Users

| HTTP Method | URL Endpoint                      | Controller Action      | Purpose                                     |
|-------------|-----------------------------------|------------------------|---------------------------------------------|
| GET         | /users/sign-up                    | usersCtrl.signUpForm   | Show sign-up form                           |
| POST        | /users/sign-up                    | usersCtrl.signUp       | Handle sign-up                              |
| GET         | /users/sign-in                    | usersCtrl.signInForm   | Show sign-in form                           |
| POST        | /users/sign-in                    | usersCtrl.signIn       | Handle sign-in                              |
| GET         | /users/sign-out                   | usersCtrl.signOut      | Handle sign-out                             |

## Example Controller Code

### Creating an Animal

```js
async function create(req, res) {
  const animal = new Animal(req.body);
  // Assign the logged in user's id if needed
  // animal.user = req.user._id;
  try {
    await animal.save();
    // Probably want to go to newly added animal's show view
    res.redirect(`/animals/${animal._id}`);
  } catch (e) {
    console.log(e.message);
    // Probably want to go back to new
    res.redirect(`/animals/new`);
  }
}
```

### Updating an Animal
```js
async function update(req, res) {
  try {
    await Animal.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/animals/${req.params.id}`);
  } catch (e) {
    console.log(e.message);
    res.redirect(`/animals/${req.params.id}/edit`);
  }
}
```
### Deleting an Animal
```js
async function delete(req, res) {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect('/animals');
  } catch (e) {
    console.log(e.message);
    res.redirect('/animals');
  }
}
```
### Adding a comment to an Animal
```js
async function createComment(req, res) {
  try {
    const animal = await Animal.findById(req.params.id);
    const comment = {
      text: req.body.text,
      author: req.session.user._id,
    };
    animal.comments.push(comment);
    await animal.save();
    res.redirect(`/animals/${animal._id}`);
  } catch (e) {
    console.log(e.message);
    res.redirect(`/animals/${req.params.id}`);
  }
}
```

### Deleting a Comment
```js
async function deleteComment(req, res) {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true }
    );
    res.redirect(`/animals/${animal._id}`);
  } catch (e) {
    console.log(e.message);
    res.redirect(`/animals/${req.params.id}`);
  }
}
```


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
