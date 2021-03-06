/// <reference types="node" />
/// <reference types="socket.io" />
/// <reference types="nulllogger" />
import { User, APIEncoder, ResponseLocals, StaticMountOptions, Renderer, PageSystemSkeleton, MountOptions, ImageResizerOptions, MappedRequestHandler, RequestHandler, RequestHandlerEntry, ExistsRequestHandler, RouteRequestHandler, AccessRequestHandler, RequestHandlerChildEntry, Request, Response } from "../types";
import { Template } from "nhp/lib/Template";
import { Application } from "express";
import express = require("express");
import events = require("events");
import http = require("http");
import nhp = require("nhp");
export declare class LeafRequestHandler implements RequestHandlerEntry {
    leaf: boolean;
    handle: RequestHandler<any, any>;
    constructor(handler: RequestHandler<any, any>, actuallyLeaf?: boolean);
    children(): RequestHandlerChildEntry[];
    childPaths(): any;
    childAt(path: string, createIfNotExists?: boolean): RequestHandlerChildEntry;
    setChild(path: string, handler: RequestHandlerChildEntry, createIfNotExists?: boolean): void;
    view(type?: string): string;
    setView(filename: string, type?: string): void;
    index(): RequestHandlerEntry;
    setIndex(index: RequestHandlerEntry): void;
    routeHandler(): RouteRequestHandler<any, any>;
    accessHandler(): AccessRequestHandler<any, any>;
    existsHandler(): ExistsRequestHandler<any, any>;
    setRouteHandler(index: RouteRequestHandler<any, any>): void;
    setAccessHandler(index: AccessRequestHandler<any, any>): void;
    setExistsHandler(index: ExistsRequestHandler<any, any>): void;
    destroy(): void;
}
export declare class NHPRequestHandler extends LeafRequestHandler {
    private impl;
    private views;
    private exists;
    private access;
    constructor(impl: RequestHandler<any, any>, redirect?: boolean);
    view(type?: string): string;
    setView(filename: string, type?: string): void;
    accessHandler(): AccessRequestHandler<any, any>;
    existsHandler(): ExistsRequestHandler<any, any>;
    setAccessHandler(index: AccessRequestHandler<any, any>): void;
    setExistsHandler(index: ExistsRequestHandler<any, any>): void;
}
export declare function createExtendedRequestHandler(): MappedRequestHandler;
export declare class NexusFramework extends events.EventEmitter {
    readonly nhp: nhp;
    readonly prefix: string;
    readonly app: Application;
    readonly server: http.Server;
    readonly io?: SocketIO.Server;
    readonly logger: nulllogger.INullLogger;
    static readonly apiencoders: {
        [index: string]: APIEncoder<User, ResponseLocals<User>>;
    };
    private socketIOGuests;
    private socketIOSetup;
    private replacements;
    private apis;
    private versions;
    private cookieParser;
    private prestack;
    private mounts;
    private stack;
    private default;
    private renderoptions;
    private afterbody;
    private footer;
    private header;
    private loaderEnabled;
    private multerInstance;
    private logging;
    constructor(app?: Application, server?: http.Server, logger?: nulllogger.INullLogger, prefix?: string, nhpoptions?: Object);
    enableLoader(): void;
    disableLoader(): void;
    /**
     * Push a named version into the array of versions and add a new resource replacement.
     * The resource replacer can be accessed via `version_{{name}}`
     */
    addVersion(version: string, name: string): void;
    addReplacement(regex: RegExp, replacement: string | Function): void;
    enableSignedCookies(secret: any): void;
    installAfterBodyRenderer(renderer: Renderer): void;
    installFooterRenderer(renderer: Renderer): void;
    installHeaderRenderer(renderer: Renderer): void;
    installAPI(ext: string, encoder: APIEncoder<User, ResponseLocals<User>>): void;
    enableAPIs(encoders: string[]): void;
    enableLogging(): void;
    /**
     * Set the skeleton to use for legacy browsers.
     * By default NexusFramework displays a Not Supported message.
     *
     * This includes IE below version 10,
     * Chrome below version 4,
     * Firefox below version 3,
     * Safari below version 3.1 and
     * Opera below version 3.5.
     */
    setLegacySkeleton(val: string | Template): void;
    setIndexOfSkeleton(val: string | Template): void;
    setSkeleton(val: string | Template): void;
    setPageSystemSkeleton(val: string | PageSystemSkeleton): void;
    setErrorDocument(code: number | "*", page?: string): void;
    mountScripts(mpath?: string): void;
    mountAbout(mpath?: string, opts?: MountOptions): void;
    setupPageSystem(): void;
    setupIO(path?: string, withPageSystem?: boolean, guestsToo?: boolean): string;
    /**
     * Mount a NHP page system.
     *
     * @param wwwpath The web path
     * @param fspath The filesystem path
     * @param options The optional mount options
     */
    mount(webpath: string, fspath: string, options?: MountOptions): RequestHandlerEntry;
    mountImageResizer(webpath: string, imagefile: string, options?: ImageResizerOptions): RequestHandlerEntry;
    /**
     * Mount a directory.
     *
     * @param webpath The web path
     * @param fspath The filesystem path
     * @param options The mount options
     */
    mountStatic(webpath: string, fspath: string, options?: StaticMountOptions): RequestHandlerEntry;
    /**
     * Set a request handler for the specified path.
     * Replaces any existing request handler.
     *
     * @param path The path
     * @param handler The request handler
     * @param leaf Whether or not this handler is a leaf, or branch
     */
    mountHandler(webpath: string, handler: RequestHandler<any, any>, leaf?: boolean): RequestHandlerEntry;
    /**
     * Set the default handler, its the handler that gets used when no mounts take the request.
     */
    setDefaultHandler(handler: RequestHandlerEntry): void;
    /**
     * Start listening on a specific port.
     */
    listen(port: number, callbackOrHost?: string | Function, callback?: Function): void;
    /**
     * NexusFork compatible handler.
     */
    handle(req: Request<any>, res: Response<any, any>, next: (err?: Error) => void): void;
    /**
     * Push middleware to the end of the stack.
     */
    pushMiddleware(middleware: RequestHandler<any, any>, pre?: boolean): void;
    /**
     * Unshift middleware onto the beginning of the stack.
     */
    unshiftMiddleware(middleware: RequestHandler<any, any>, pre?: boolean): void;
    /**
     * Alias for pushMiddleware
     */
    use: (middleware: RequestHandler<any, any>) => void;
    runMiddleware(req: Request<any>, res: Response<any, any>, next: (err?: Error) => void): void;
    /**
     * Process the incoming request
     */
    process(req: Request<any>, res: Response<any, any>, next: (err?: Error) => void): void;
    upgrade(req: Request<User>, res: Response<User, ResponseLocals<User>>, next: (err?: Error) => void): void;
    static nexusforkUpgrade(req: express.Request, res: express.Response): void;
    /**
     * Express compatible handler
     */
    __express(req: express.Request, res: express.Response, next: express.NextFunction): void;
    static expressUpgradeRequest(req: http.IncomingMessage, onPrototype?: boolean): void;
    static expressUpgradeResponse(res: http.ServerResponse, onPrototype?: boolean): void;
    static expressUpgrade(req: http.IncomingMessage, res: http.ServerResponse, onPrototype?: boolean): void;
    /**
     * HTTP compatible handler
     */
    __http(req: http.IncomingMessage, res: http.ServerResponse, next: express.NextFunction): void;
    close(cb?: Function): void;
    isIOSetup(): boolean;
}
