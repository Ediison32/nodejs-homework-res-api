const { log } = require("console");
const newid = require("../createId/createid")
const fs = require('fs/promises')
const path = require('path');
const consctPath = path.resolve('models/contacts.json')
const validar =require('../middleware/validar')

const listContacts = async () => {
  const list = await fs.readFile(consctPath)
  return JSON.parse(list)
}

const getContactById = async (contactId) => {
  let list= await listContacts();
  const listId =  list.find((x)=> x.id === contactId);
 
  return listId 
}

const removeContact = async (contactId) => {
  console.log(contactId);
  let list= await listContacts();
  const removelist =  list.findIndex((x)=> x.id === contactId);
  if(removelist != -1){
    const [result]= list.splice(removelist,1);
    await fs.writeFile(consctPath, JSON.stringify(list, null, 2))
    return result
  }
  return null
}

const addContact = async (body) => {
  //validar(req.body)
  const list= await listContacts();
  const newId = await newid();
  console.log(`nuevo id= ${newId}`) ;
   const nuecontac = {
    id: newId,
    name:body.name,
    email:body.email,
    phone:body.phone
  } 
  
  list.push(nuecontac)
  await fs.writeFile(consctPath, JSON.stringify(list,null,2));
  return nuecontac
}

const updateContact = async (contactId, body) => {
  console.log(`id  ${contactId}    siguie el body `);
  let list= await listContacts();
  
  const removelist =  list.findIndex((x)=> x.id === contactId);
  if(removelist != -1){
  list.forEach(element => {
    if(element.id === contactId){
      element.name = body.name;
      element.email = body.email;
      element.phone = body.phone;
    }
    
  });
  await fs.writeFile(consctPath, JSON.stringify(list,null,2));
  return list[removeContact]
}
return null

}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
