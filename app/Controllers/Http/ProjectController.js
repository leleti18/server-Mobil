'use strict'

const { createMany } = require("../../Models/Project")
const Database = use('Database')
const Project = use('App/Models/Project')
class ProjectController {

  async index ({ request }) {

    const {page} = request.get()

    const projects = await Project.query().with('user').paginate(page)

    return projects
  }



  async store ({ request, response, auth }) {
    const data = request.only(['title', 'description'])
    const addresses = request.input('addresses')
    const trx = await Database.beginTransaction()

    const project = await Project.create({...data, user_id:auth.user.id}, trx)

    await project.addresses().createMany(addresses, trx)

    await trx.commit()

    return project
  }


  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user')

    return project
  }



  async update ({ params, request }) {

    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project
  }


  async destroy ({ params}) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
