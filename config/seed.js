"use strict"
const User = require('../models/User'),
  Post = require('../models/Post'),
  Project = require('../models/Project'),
  async = require("async")


//this seeder automatically runs on application startup but ...
//seeder only runs if a user without admin role exists

module.exports = function(){
  User.findOne({role:'admin'})
    .then( user => {
      if(user) throw new Error('skipping seed')

      const seed_user = new User({
        email: 'admin@admin.com',
        password: 'asdfasdf',
        role: 'admin',
        askEmail: false,
        profile: {
          name: 'Admin'
        }
      });

      return seed_user.save()
    } )
    .then( user => {
      const seed_post = new Post({
        title: 'First Blog Post',
        content: "## First blog post\n\nCheck it out\n\n [github](https://github.com/uptownhr/hackathon-starter-lite)",
        status: 'launched',
        _author: user._id,
      })

      return seed_post.save()
    })
    .then( post => {
      const seed_project = new Project({
        name: 'hackathon starter lite',
        tag_line: 'create your personal project',
        description: 'jump start your project with an admin, blog, products',
        logo_url: '/site/img/logo.svg',
        project_url: 'https://github.com/uptownhr/hackathon-starter-lite'
      })

      return seed_project.save()
    })
    .catch( err => {
      console.log(err)
    })
}

