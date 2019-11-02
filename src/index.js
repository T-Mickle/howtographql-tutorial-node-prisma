const { GraphQLServer } = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

const resolvers = {
    Query,
    Mutation,
    User,
    Link, 
    Subscription,
    Vote
}

// const resolvers = {
//     Query: {
//         info: () => `This is the API of a Hackernews Clone`,
//         feed: (root, args, context, info) => {
//             return context.prisma.links()
//         }
//     },
//     Mutation: {
//         post: (root, args, context) => {
//             return context.prisma.createLink({
//                 url: args.url,
//                 description: args.description,
//             })
//         }
//     }
// }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers,
    context: request => {
        return {
          ...request,
          prisma,
        }
      },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))

// const resolvers = {
//     Query: {
//         info: () => `This is the API of a Hackernews Clone`,
//         feed: () => links,
//         link: (parents, args) => {

//             const i = links.findIndex((element) => element.id === args.id);
//             return links[i]
//         }
        
//     },
//     Mutation: {
//         post: (parent, args) => {
//             const link = {
//                 id: `link-${idCount++}`,
//                 description: args.description,
//                 url: args.url,
//             }
//             links.push(link)
//             return link
//         } , 

//         updateLink: (parent, args) => {
//             const i = links.findIndex((element) => element.id === args.id);
            
//             links[i] = {
//                 id: links[i].id,
//                 description: args.description ? args.description : links[i].description,
//                 url: args.url ? args.url : links[i].url , 
//             }

//             return links[i];
//         }, 

//         deleteLink: (parent, args) => {
//             const i = links.findIndex((element) => element.id === args.id);
           
//             const deletedLink = links[i];

//             links = links.map((e,index) => {
//                 if (index != i ) {
//                     return e
//                 }
//             });
//             console.log(links)
            
//             return deletedLink
//         }
//     } 
//     ,
//     // Link: {
//     //     id: (parent) => parent.id,
//     //     description: (parent) => parent.description,
//     //     url: (parent) => parent.url,
//     // }
// }

