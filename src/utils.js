const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

async function editPermission( context, userId, linkId) {

  const linkCreatedBy = await context.prisma.link({ id: linkId }).postedBy();

  if (linkCreatedBy.id !== userId ) {
    throw new Error('User does not have permission to edit this Link')
  }

  return linkCreatedBy; 
}

module.exports = {
  APP_SECRET,
  getUserId,
  editPermission
}