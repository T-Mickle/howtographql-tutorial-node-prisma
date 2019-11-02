async function feed(parent, args, context, info) {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter},
      { url_contains: args.filter }
    ]
  } : {}

    const links = await context.prisma.links({
      where,
      skip: args.skip,
      first: args.first, 
      orderBy: args.orderBy,
    })

  const count = await context.prisma.linksConnection({where}).aggregate().count()

  return {
    links,
    count,
  }
  }

function info (){return "This is a mock hackerrank page"}

async function link(parent, args, context, info){
   const link = await context.prisma.link({id: args.id})
   
   if (!link) {
    
     throw new Error('No link found with given id')
   }
  return  link
}
  
  module.exports = {
    feed,
    info,
    link
  }