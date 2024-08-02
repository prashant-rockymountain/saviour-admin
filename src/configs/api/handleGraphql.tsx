import axi from "./AxiosInterseptor";

const graphqlEndPoint = "https://test-graphql-server-ond7.onrender.com/"

const qlRequest = async ({ query }: { query: string }) => {
    let result = await axi.post(graphqlEndPoint, { query: query })
    return result
}


export { graphqlEndPoint, qlRequest }