
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Message {
    messageId?: string;
    create_at?: string;
    text_message?: string;
    send_by?: string;
}

export interface Send_By {
    login?: string;
    userId?: string;
}

export interface IQuery {
    getMessage(): Message[] | Promise<Message[]>;
    users(): User[] | Promise<User[]>;
    getUser(login?: string): User | Promise<User>;
    getMe(): User | Promise<User>;
}

export interface IMutation {
    createMessage(message?: string): Message | Promise<Message>;
    createUser(login?: string, password?: string): User | Promise<User>;
    login(login?: string, password?: string): string | Promise<string>;
}

export interface ISubscription {
    wathMessage(): Message[] | Promise<Message[]>;
}

export interface User {
    userId?: string;
    login?: string;
    password?: string;
}
