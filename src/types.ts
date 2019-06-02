/**
 * https://core.telegram.org/bots/api#messageentity
 * @name  type  Type of the entity. Can be mention (@username), hashtag, cashtag, bot_command, url, email, phone_number, bold (bold text), italic (italic text), code (monowidth string), pre (monowidth block), text_link (for clickable text URLs), text_mention (for users without usernames)
 * */
export interface EntityContentTypes {
  type: string;
}

/**
 * https://core.telegram.org/bots/api#photosize
 * */
export interface ImageContentTypes {
  hash: string;
  uri: string;
  width: number;
  height: number;
  size: number;
}

export interface StickerContentTypes extends ImageContentTypes {

}

/**
 * https://core.telegram.org/bots/api#audio
 * */
export interface AudioContentTypes {
  hash: string;
  uri: string;
  duration: number;
  size: number;
}

/**
 * https://core.telegram.org/bots/api#document
 * */
export interface DocumentContentTypes {
  hash: string;
  uri: string;
  duration: number;
  size: number;
}

/**
 * https://core.telegram.org/bots/api#document
 * */
export interface VideoContentTypes {
  hash: string;
  uri: string;
  width: number;
  height: number;
  duration: number;
  size: number;
}

/**
 * https://core.telegram.org/bots/api#voice
 * */
export interface VoiceContentTypes extends AudioContentTypes {
}

/**
 * https://core.telegram.org/bots/api#location
 * */
export interface LocationContentTypes {
  longitude: number;
  latitude: number;
}

export interface MessageContentTypes {
  text?: string;
  entities?: EntityContentTypes;
  img?: ImageContentTypes[];
  sticker?: StickerContentTypes;
  audio?: AudioContentTypes;
  document?: DocumentContentTypes;
  video?: VideoContentTypes;
  voice?: VoiceContentTypes;
  geo?: LocationContentTypes;
}

/**
 * https://core.telegram.org/type/MessageMedia
 * @type MediaTypes  text | entity | img | sticker| photo | video | map | document | audio | voice
 * */
export type MediaTypes =
  "text"
  | "entity"
  | "img"
  | "sticker"
  | "photo"
  | "video"
  | "geo"
  | "document"
  | "audio"
  | "voice"

/**
 * https://core.telegram.org/constructor/message
 * @interface MessageTypes
 * @name   id        {int}          Message id
 * @name   from_id   {int}          Message sender
 * @name   to_id     {Peer}         Message recipient
 * @name   out       {Bool}         If true, message was sent by the current user
 * @name   uname
 * @name   avatar
 * @name   message
 * @name   date      {int}          Date created
 * @name   flags     {int}          Flag mask for the message:
 * @name   type
 * */
export interface MessageTypes {
  id: number;
  from_id: number;
  to_id: number;
  out: boolean;
  uname: string;
  avatar: string;
  message: MessageContentTypes;
  date: number;
  flags?: boolean;
  type: MediaTypes;
}


export interface ChatTypes {
  avatar: string;
  title: string;
  notice: string;
  lists: MessageTypes[];
  isRefresh: boolean;
  isEnd: boolean;
  maxId: number;
  readId: number;
  limit?: number;
}
