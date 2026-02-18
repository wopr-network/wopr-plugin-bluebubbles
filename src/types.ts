/**
 * Local type definitions for WOPR BlueBubbles Plugin
 */

export interface ConfigField {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  hidden?: boolean;
  default?: any;
}

export interface ConfigSchema {
  title: string;
  description: string;
  fields: ConfigField[];
}

export interface StreamMessage {
  type: "text" | "assistant";
  content: string;
}

export interface ChannelInfo {
  type: string;
  id: string;
  name?: string;
}

export interface InjectOptions {
  silent?: boolean;
  onStream?: (msg: StreamMessage) => void;
  from?: string;
  channel?: ChannelInfo;
  images?: string[];
}

export interface LogMessageOptions {
  from?: string;
  channel?: ChannelInfo;
}

export interface PluginLogger {
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export interface AgentIdentity {
  name?: string;
  creature?: string;
  vibe?: string;
  emoji?: string;
}

export interface UserProfile {
  name?: string;
  preferredAddress?: string;
  pronouns?: string;
  timezone?: string;
  notes?: string;
}

export interface WOPRPluginContext {
  inject: (session: string, message: string, options?: InjectOptions) => Promise<string>;
  logMessage: (session: string, message: string, options?: LogMessageOptions) => void;
  injectPeer: (peer: string, session: string, message: string) => Promise<string>;
  getIdentity: () => { publicKey: string; shortId: string; encryptPub: string };
  getAgentIdentity: () => AgentIdentity | Promise<AgentIdentity>;
  getUserProfile: () => UserProfile | Promise<UserProfile>;
  getSessions: () => string[];
  getPeers: () => any[];
  getConfig: <T = any>() => T;
  saveConfig: <T>(config: T) => Promise<void>;
  getMainConfig: (key?: string) => any;
  registerConfigSchema: (pluginId: string, schema: ConfigSchema) => void;
  getPluginDir: () => string;
  log: PluginLogger;
}

export interface WOPRPlugin {
  name: string;
  version: string;
  description: string;
  init?: (context: WOPRPluginContext) => Promise<void>;
  shutdown?: () => Promise<void>;
}

// BlueBubbles API types

export interface BBMessage {
  guid: string;
  text: string;
  subject: string;
  handle: BBHandle;
  handleId: number;
  chats: BBChat[];
  attachments: BBAttachment[];
  associatedMessageGuid: string | null;
  associatedMessageType: string | null;
  replyToGuid: string | null;
  threadOriginatorGuid: string | null;
  dateCreated: number;
  dateDelivered: number;
  dateRead: number;
  isFromMe: boolean;
  isAudioMessage: boolean;
  itemType: number;
  groupActionType: number;
  groupTitle: string;
  error: number;
  partCount: number;
}

export interface BBChat {
  guid: string;
  chatIdentifier: string;
  groupId: string;
  displayName: string;
  participants: BBParticipant[];
  lastMessage?: BBMessage;
}

export interface BBHandle {
  address: string;
  country: string;
  service: string;
  originalROWID: number;
}

export interface BBAttachment {
  guid: string;
  uti: string;
  mimeType: string;
  transferName: string;
  totalBytes: number;
  transferState: number;
  isOutgoing: boolean;
  height: number;
  width: number;
}

export interface BBParticipant {
  address: string;
}

export interface BBApiResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  error?: { type: string; error: string };
}

export interface BBTypingNotification {
  display: boolean;
  guid: string;
}

export interface BlueBubblesConfig {
  serverUrl?: string;
  password?: string;
  dmPolicy?: "allowlist" | "pairing" | "open" | "disabled";
  allowFrom?: string[];
  groupPolicy?: "allowlist" | "open" | "disabled";
  groupAllowFrom?: string[];
  mediaMaxMb?: number;
  sendReadReceipts?: boolean;
  enableReactions?: boolean;
  enableAttachments?: boolean;
  commandPrefix?: string;
}
