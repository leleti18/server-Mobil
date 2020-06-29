'use strict'


const Hash = use('Hash')
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()


    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  addresses(){
    return this.hasMany('App/Models/UserAddress')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }
  projects (){
    return this.hasMany('App/Models/Project')
  }
}

module.exports = User
