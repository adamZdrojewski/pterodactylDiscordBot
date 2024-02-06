export default interface MessageComponent {
    custom_id: string,
    interaction(req:any, res:any, data:any): any
}