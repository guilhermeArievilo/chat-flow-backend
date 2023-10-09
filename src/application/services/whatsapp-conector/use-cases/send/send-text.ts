import { SendModuleTemplate } from '../../template/send-module-template';

interface SendTextRequest {
  contact: string;
  content: string;
}

interface SendTextResponse {
  chatId?: string;
  status: string;
  error?: string;
}

export class SendText {
  constructor(private sendModule: SendModuleTemplate) {}

  async execute(request: SendTextRequest): Promise<SendTextResponse> {
    const { contact, content } = request;

    try {
      const { chatId } = await this.sendModule.sendText(contact, content);

      return {
        chatId,
        status: 'success',
      };
    } catch (e) {
      return {
        status: 'Error',
        error: `[Send Text] - ${e}`,
      };
    }
  }
}
