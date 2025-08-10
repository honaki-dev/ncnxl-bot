export type EventType =
    | "ready"
    | "stop_listen"
    | "account_inactive"
    | "friend_request_received"
    | "friend_request_cancel"
    | "instant_game_dynamic_custom_update"
    | "accept_pending_thread"
    | "confirm_friend_request"
    | "shared_album_delete"
    | "shared_album_addition"
    | "pin_messages_v2"
    | "unpin_messages_v2"
    | "change_thread_theme"
    | "change_thread_nickname"
    | "change_thread_icon"
    | "change_thread_quick_reaction"
    | "change_thread_admins"
    | "group_poll"
    | "joinable_group_link_mode_change"
    | "magic_words"
    | "change_thread_approval_mode"
    | "messenger_call_log"
    | "participant_joined_group_call"
    | "rtc_call_log"
    | "update_vote"
    | "message_reaction"
    | "message_unsend"
    | "message_reply"
    | "message"
    | "event";

export type MessageBody = {
    body: string;
    mentions?: {
        tag: string;
        id: string;
        fromIndex?: number;
    }[];
};
export interface TextMessage {
    /**
     * Reply this message.
     *
     * @param {string|{ body: string, mentions?: {tag: string, id: string, fromIndex?: number}[] }} body - The body of message
     * @returns {Promise<{ messageID: string, threadID: string, timestamp: number }>}
     */
    reply(
        body: string | MessageBody
    ): Promise<{ messageID: string; threadID: string; timestamp: number }>;
}
