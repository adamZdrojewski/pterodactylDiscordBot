export default interface Command {
    info: {
        name: string,
        description: string,
        type: number
    },
    interaction(res: any): any
}