export interface ContentProps {
  type: string;
  content?: string;
  isMedia: boolean;
  mediaUrl?: string;
}

export class Content {
  private props: ContentProps;

  constructor(props: ContentProps) {
    this.props = props;
  }

  public get type(): string {
    return this.props.type;
  }

  public get content(): string | null {
    if (!this.props.content) return null;
    return this.props.content;
  }

  public get isMedia(): boolean {
    return this.props.isMedia;
  }

  public get mediaUrl(): string | null {
    if (!this.props.mediaUrl) return null;
    return this.props.mediaUrl;
  }
}
