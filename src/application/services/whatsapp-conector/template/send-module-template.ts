export interface SendResponse {
  contact: string;
  chatId: string;
}

export abstract class SendModuleTemplate {
  abstract sendText(contact: string, content: string): Promise<SendResponse>;
}
