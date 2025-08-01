export namespace Ace {
    type Anchor = import("./src/anchor").Anchor;
    type Editor = import("./src/editor").Editor;
    type EditSession = import("./src/edit_session").EditSession;
    type Document = import("./src/document").Document;
    type Fold = import("./src/edit_session/fold").Fold;
    type FoldLine = import("./src/edit_session/fold_line").FoldLine;
    type Range = import("./src/range").Range;
    type VirtualRenderer = import("./src/virtual_renderer").VirtualRenderer;
    type UndoManager = import("./src/undomanager").UndoManager;
    type Tokenizer = import("./src/tokenizer").Tokenizer;
    type TokenIterator = import("./src/token_iterator").TokenIterator;
    type Selection = import("./src/selection").Selection;
    type Autocomplete = import("./src/autocomplete").Autocomplete;
    type InlineAutocomplete = import("./src/ext/inline_autocomplete").InlineAutocomplete;
    type CompletionProvider = import("./src/autocomplete").CompletionProvider;
    type AcePopup = import("./src/autocomplete/popup").AcePopup;
    type AceInline = import("./src/autocomplete/inline").AceInline;
    type MouseEvent = import("./src/mouse/mouse_event").MouseEvent;
    type RangeList = import("./src/range_list").RangeList;
    type FilteredList = import("./src/autocomplete").FilteredList;
    type LineWidgets = import("./src/line_widgets").LineWidgets;
    type SearchBox = import("./src/ext/searchbox").SearchBox;
    type Occur = import("./src/occur").Occur;
    type DefaultHandlers = import("./src/mouse/default_handlers").DefaultHandlers;
    type GutterHandler = import("./src/mouse/default_gutter_handler").GutterHandler;
    type DragdropHandler = import("./src/mouse/dragdrop_handler").DragdropHandler;
    type AppConfig = import("./src/lib/app_config").AppConfig;
    type Config = typeof import("./src/config");
    type GutterTooltip = import( "./src/mouse/default_gutter_handler").GutterTooltip;
    type GutterKeyboardEvent = import( "./src/keyboard/gutter_handler").GutterKeyboardEvent;
    type HoverTooltip = import("./src/tooltip").HoverTooltip;
    type Tooltip = import("./src/tooltip").Tooltip;
    type TextInput = import("./src/keyboard/textinput").TextInput;
    type DiffChunk = import("./src/ext/diff/base_diff_view").DiffChunk;

    type AfterLoadCallback = (err: Error | null, module: unknown) => void;
    type LoaderFunction = (moduleName: string, afterLoad: AfterLoadCallback) => void;

    export interface ConfigOptions {
        packaged: boolean,
        workerPath: string | null,
        modePath: string | null,
        themePath: string | null,
        basePath: string,
        suffix: string,
        $moduleUrls: { [url: string]: string },
        loadWorkerFromBlob: boolean,
        sharedPopups: boolean,
        useStrictCSP: boolean | null
    }

    interface Theme {
        cssClass?: string;
        cssText?: string;
        $id?: string;
        padding?: number | string;
        isDark?: boolean;
    }

    interface ScrollBar {
        setVisible(visible: boolean): void;

        [key: string]: any;
    }

    interface HScrollbar extends ScrollBar {
        setWidth(width: number): void;
    }

    interface VScrollbar extends ScrollBar {
        setHeight(width: number): void;
    }

    interface LayerConfig {
        width: number,
        padding: number,
        firstRow: number,
        firstRowScreen: number,
        lastRow: number,
        lineHeight: number,
        characterWidth: number,
        minHeight: number,
        maxHeight: number,
        offset: number,
        height: number,
        gutterOffset: number
    }

    interface HardWrapOptions {
        /** First row of the range to process */
        startRow: number;
        /** Last row of the range to process */
        endRow: number;
        /** Whether to merge short adjacent lines that fit within the limit */
        allowMerge?: boolean;
        /** Maximum column width for line wrapping (defaults to editor's print margin) */
        column?: number;
    }

    interface CommandBarOptions {
        maxElementsOnTooltip: number;
        alwaysShow: boolean;
        showDelay: number;
        hideDelay: number;
    }

    interface ScreenCoordinates {
        row: number,
        column: number,
        side?: 1 | -1,
        offsetX?: number
    }

    interface Folding {
        $foldData: FoldLine[];

        /**
         * Looks up a fold at a given row/column. Possible values for side:
         *   -1: ignore a fold if fold.start = row/column
         *   +1: ignore a fold if fold.end = row/column
         **/
        getFoldAt(row: number, column: number, side?: number): Ace.Fold;

        /**
         * Returns all folds in the given range. Note, that this will return folds
         **/
        getFoldsInRange(range: Ace.Range | Ace.Delta): Ace.Fold[];

        getFoldsInRangeList(ranges: Ace.Range[] | Ace.Range): Ace.Fold[];

        /**
         * Returns all folds in the document
         */
        getAllFolds(): Ace.Fold[];

        /**
         * Returns the string between folds at the given position.
         * E.g.
         *  foo<fold>b|ar<fold>wolrd -> "bar"
         *  foo<fold>bar<fold>wol|rd -> "world"
         *  foo<fold>bar<fo|ld>wolrd -> <null>
         *
         * where | means the position of row/column
         *
         * The trim option determs if the return string should be trimed according
         * to the "side" passed with the trim value:
         *
         * E.g.
         *  foo<fold>b|ar<fold>wolrd -trim=-1> "b"
         *  foo<fold>bar<fold>wol|rd -trim=+1> "rld"
         *  fo|o<fold>bar<fold>wolrd -trim=00> "foo"
         */
        getFoldStringAt(row: number, column: number, trim?: number, foldLine?: Ace.FoldLine): string | null;

        getFoldLine(docRow: number, startFoldLine?: Ace.FoldLine): null | Ace.FoldLine;

        /**
         * Returns the fold which starts after or contains docRow
         */
        getNextFoldLine(docRow: number, startFoldLine?: Ace.FoldLine): null | Ace.FoldLine;

        getFoldedRowCount(first: number, last: number): number;

        $addFoldLine(foldLine: FoldLine): Ace.FoldLine;

        /**
         * Adds a new fold.
         * @returns {Ace.Fold}
         *      The new created Fold object or an existing fold object in case the
         *      passed in range fits an existing fold exactly.
         */
        addFold(placeholder: Ace.Fold | string, range?: Ace.Range): Ace.Fold;

        $modified: boolean;

        addFolds(folds: Ace.Fold[]): void;

        removeFold(fold: Ace.Fold): void;

        removeFolds(folds: Ace.Fold[]): void;

        expandFold(fold: Ace.Fold): void;

        expandFolds(folds: Ace.Fold[]): void;

        unfold(location?: number | null | Ace.Point | Ace.Range | Ace.Range[], expandInner?: boolean): Ace.Fold[] | undefined;

        /**
         * Checks if a given documentRow is folded. This is true if there are some
         * folded parts such that some parts of the line is still visible.
         **/
        isRowFolded(docRow: number, startFoldRow?: Ace.FoldLine): boolean;

        getRowFoldEnd(docRow: number, startFoldRow?: Ace.FoldLine): number;

        getRowFoldStart(docRow: number, startFoldRow?: Ace.FoldLine): number;

        getFoldDisplayLine(foldLine: Ace.FoldLine, endRow?: number | null, endColumn?: number | null, startRow?: number | null, startColumn?: number | null): string;

        getDisplayLine(row: number, endColumn: number | null, startRow: number | null, startColumn: number | null): string;

        $cloneFoldData(): Ace.FoldLine[];

        toggleFold(tryToUnfold?: boolean): void;

        getCommentFoldRange(row: number, column: number, dir?: number): Ace.Range | undefined;

        foldAll(startRow?: number | null, endRow?: number | null, depth?: number | null, test?: Function): void;

        foldToLevel(level: number): void;

        foldAllComments(): void;

        $foldStyles: {
            manual: number;
            markbegin: number;
            markbeginend: number;
        };
        $foldStyle: string;

        setFoldStyle(style: string): void;

        $setFolding(foldMode: Ace.FoldMode): void;

        $foldMode: any;
        foldWidgets: any[];
        getFoldWidget: any;
        getFoldWidgetRange: any;
        $updateFoldWidgets: any;
        $tokenizerUpdateFoldWidgets: any;

        getParentFoldRangeData(row: number, ignoreCurrent?: boolean): {
            range?: Ace.Range;
            firstRange?: Ace.Range;
        };

        onFoldWidgetClick(row: number, e: any): void;

        $toggleFoldWidget(row: number, options: any): Fold | any;

        /**
         *
         * @param {boolean} [toggleParent]
         */
        toggleFoldWidget(toggleParent?: boolean): void;

        updateFoldWidgets(delta: Ace.Delta): void;

        tokenizerUpdateFoldWidgets(e: any): void;
    }

    interface BracketMatch {
        findMatchingBracket: (position: Point, chr?: string) => Point;

        getBracketRange: (pos: Point) => null | Range;
        /**
         * Returns:
         * * null if there is no any bracket at `pos`;
         * * two Ranges if there is opening and closing brackets;
         * * one Range if there is only one bracket
         */
        getMatchingBracketRanges: (pos: Point, isBackwards?: boolean) => null | Range[];
        $brackets: {
            ")": string;
            "(": string;
            "]": string;
            "[": string;
            "{": string;
            "}": string;
            "<": string;
            ">": string;
        };
        $findOpeningBracket: (bracket: string, position: Point, typeRe?: RegExp) => Point | null;
        $findClosingBracket: (bracket: string, position: Point, typeRe?: RegExp) => Point | null;
        /**
         * Returns [[Range]]'s for matching tags and tag names, if there are any
         */
        getMatchingTags: (pos: Point) => {
            closeTag: Range;
            closeTagName: Range;
            openTag: Range;
            openTagName: Range;
        };
        $findTagName: (iterator: any) => any;
        $findClosingTag: (iterator: any, token: any) => {
            openTag: Range;
            closeTag: Range;
            openTagName: Range;
            closeTagName: Range;
        };
        $findOpeningTag: (iterator: any, token: any) => {
            openTag: Range;
            closeTag: Range;
            openTagName: Range;
            closeTagName: Range;
        };
    }

    interface IRange {
        start: Point;
        end: Point;
    }

    interface LineWidget {
        editor?: Editor,
        el?: HTMLElement;
        rowCount?: number;
        hidden?: boolean;
        _inDocument?: boolean;
        column?: number;
        row: number;
        $oldWidget?: LineWidget,
        session?: EditSession,
        html?: string,
        text?: string,
        className?: string,
        coverGutter?: boolean,
        pixelHeight?: number,
        $fold?: Fold,
        type?: any,
        destroy?: () => void;
        coverLine?: boolean,
        fixedWidth?: boolean,
        fullWidth?: boolean,
        screenWidth?: number,
        rowsAbove?: number,
        lenses?: CodeLenseCommand[],
    }

    type NewLineMode = 'auto' | 'unix' | 'windows';

    interface EditSessionOptions {
        wrap: "off" | "free" | "printmargin" | boolean | number;
        wrapMethod: 'code' | 'text' | 'auto';
        indentedSoftWrap: boolean;
        firstLineNumber: number;
        useWorker: boolean;
        useSoftTabs: boolean;
        tabSize: number;
        navigateWithinSoftTabs: boolean;
        foldStyle: 'markbegin' | 'markbeginend' | 'manual';
        overwrite: boolean;
        newLineMode: NewLineMode;
        mode: string;
    }

    interface VirtualRendererOptions {
        animatedScroll: boolean;
        showInvisibles: boolean;
        showPrintMargin: boolean;
        printMarginColumn: number;
        printMargin: boolean | number;
        showGutter: boolean;
        fadeFoldWidgets: boolean;
        showFoldWidgets: boolean;
        showLineNumbers: boolean;
        displayIndentGuides: boolean;
        highlightIndentGuides: boolean;
        highlightGutterLine: boolean;
        hScrollBarAlwaysVisible: boolean;
        vScrollBarAlwaysVisible: boolean;
        fontSize: string | number;
        fontFamily: string;
        maxLines: number;
        minLines: number;
        scrollPastEnd: number;
        fixedWidthGutter: boolean;
        customScrollbar: boolean;
        theme: string;
        hasCssTransforms: boolean;
        maxPixelHeight: number;
        useSvgGutterIcons: boolean;
        showFoldedAnnotations: boolean;
        useResizeObserver: boolean;
    }

    interface MouseHandlerOptions {
        scrollSpeed: number;
        dragDelay: number;
        dragEnabled: boolean;
        focusTimeout: number;
        tooltipFollowsMouse: boolean;
    }

    interface EditorOptions extends EditSessionOptions,
        MouseHandlerOptions,
        VirtualRendererOptions {
        selectionStyle: "fullLine" | "screenLine" | "text" | "line";
        highlightActiveLine: boolean;
        highlightSelectedWord: boolean;
        readOnly: boolean;
        copyWithEmptySelection: boolean;
        cursorStyle: 'ace' | 'slim' | 'smooth' | 'wide';
        mergeUndoDeltas: true | false | 'always';
        behavioursEnabled: boolean;
        wrapBehavioursEnabled: boolean;
        enableAutoIndent: boolean;
        enableBasicAutocompletion: boolean | Completer[];
        enableLiveAutocompletion: boolean | Completer[];
        liveAutocompletionDelay: number;
        liveAutocompletionThreshold: number;
        enableSnippets: boolean;
        autoScrollEditorIntoView: boolean;
        keyboardHandler: string | null;
        placeholder: string;
        value: string;
        session: EditSession;
        relativeLineNumbers: boolean;
        enableMultiselect: boolean;
        enableKeyboardAccessibility: boolean;
        enableCodeLens: boolean;
        textInputAriaLabel: string;
        enableMobileMenu: boolean;
    }

    interface EventsBase {
        [key: string]: any;
    }

    interface EditSessionEvents {
        /**
         * Emitted when the document changes.
         * @param delta
         */
        "change": (delta: Delta) => void;
        /**
         * Emitted when the tab size changes, via [[EditSession.setTabSize]].
         */
        "changeTabSize": () => void;
        /**
         * Emitted when the ability to overwrite text changes, via [[EditSession.setOverwrite]].
         * @param overwrite
         */
        "changeOverwrite": (overwrite: boolean) => void;
        /**
         * Emitted when the gutter changes, either by setting or removing breakpoints, or when the gutter decorations change.
         * @param e
         */
        "changeBreakpoint": (e?: { row?: number, breakpoint?: boolean }) => void;
        /**
         * Emitted when a front marker changes.
         */
        "changeFrontMarker": () => void;
        /**
         * Emitted when a back marker changes.
         */
        "changeBackMarker": () => void;
        /**
         * Emitted when an annotation changes, like through [[EditSession.setAnnotations]].
         */
        "changeAnnotation": (e: {}) => void;
        /**
         * Emitted when a background tokenizer asynchronously processes new rows.
         */
        "tokenizerUpdate": (e: { data: { first: number, last: number } }) => void;
        /**
         * Emitted when the current mode changes.
         * @param e
         */
        "changeMode": (e: any) => void;
        /**
         * Emitted when the wrap mode changes.
         * @param e
         */
        "changeWrapMode": (e: any) => void;
        /**
         * Emitted when the wrapping limit changes.
         * @param e
         */
        "changeWrapLimit": (e: any) => void;
        /**
         * Emitted when a code fold is added or removed.
         * @param e
         */
        "changeFold": (e: any, session?: EditSession) => void;
        /**
         * Emitted when the scroll top changes.
         * @param scrollTop The new scroll top value
         **/
        "changeScrollTop": (scrollTop: number) => void;
        /**
         * Emitted when the scroll left changes.
         * @param scrollLeft The new scroll left value
         **/
        "changeScrollLeft": (scrollLeft: number) => void;
        "changeEditor": (e: { editor?: Editor, oldEditor?: Editor }) => void;
        "changeSelection": () => void;
        "startOperation": (op?: { command?: { name?: string }, args?: any }) => void;
        "endOperation": (op?: any) => void;
        "beforeEndOperation": () => void;
    }

    interface EditorEvents {
        "change": (delta: Delta) => void;
        "changeSelection": () => void;
        "input": () => void;
        /**
         * Emitted whenever the [[EditSession]] changes.
         * @param e An object with two properties, `oldSession` and `session`, that represent the old and new [[EditSession]]s.
         **/
        "changeSession": (e: { oldSession: EditSession, session: EditSession }) => void;
        "blur": (e: any) => void;
        "mousedown": (e: MouseEvent) => void;
        "mousemove": (e: MouseEvent & { scrollTop?: any }, editor?: Editor) => void;
        "changeStatus": (e: any) => void;
        "keyboardActivity": (e: any) => void;
        "mousewheel": (e: MouseEvent) => void;
        "mouseup": (e: MouseEvent) => void;
        "beforeEndOperation": (e: any) => void;
        "nativecontextmenu": (e: any) => void;
        "destroy": (e: any) => void;
        "focus": (e?: any) => void;
        /**
         * Emitted when text is copied.
         * @param text The copied text
         **/
        "copy": (e: { text: string }) => void;
        /**
         * Emitted when text is pasted.
         **/
        "paste": (e: { text: string, event?: ClipboardEvent }) => void;
        /**
         * Emitted when the selection style changes, via [[Editor.setSelectionStyle]].
         * @param data Contains one property, `data`, which indicates the new selection style
         **/
        "changeSelectionStyle": (data: "fullLine" | "screenLine" | "text" | "line") => void;
        "changeMode": (e: { mode?: Ace.SyntaxMode, oldMode?: Ace.SyntaxMode }) => void;

        //from searchbox extension
        "findSearchBox": (e: { match: boolean }) => void;

        //from code_lens extension
        "codeLensClick": (e: any) => void;

        "select": () => void;
        "gutterkeydown": (e: GutterKeyboardEvent) => void;
        "gutterclick": (e: MouseEvent) => void;
        "showGutterTooltip": (e: GutterTooltip) => void;
        "hideGutterTooltip": (e: GutterTooltip) => void;
        "compositionStart": () => void;
    }

    interface AcePopupEvents {
        "click": (e: MouseEvent) => void;
        "dblclick": (e: MouseEvent) => void;
        "tripleclick": (e: MouseEvent) => void;
        "quadclick": (e: MouseEvent) => void;
        "show": () => void;
        "hide": () => void;
        "select": (hide: boolean) => void;
        "changeHoverMarker": (e: any) => void;
    }

    interface DocumentEvents {
        /**
         * Fires whenever the document changes.
         * Several methods trigger different `"change"` events. Below is a list of each action type, followed by each property that's also available:
         *  * `"insert"`
         *    * `range`: the [[Range]] of the change within the document
         *    * `lines`: the lines being added
         *  * `"remove"`
         *    * `range`: the [[Range]] of the change within the document
         *    * `lines`: the lines being removed
         *
         **/
        "change": (e: Delta) => void;
        "changeNewLineMode": () => void;
    }

    interface AnchorEvents {
        /**
         * Fires whenever the anchor position changes.
         * Both of these objects have a `row` and `column` property corresponding to the position.
         * Events that can trigger this function include [[Anchor.setPosition `setPosition()`]].
         * @param {Object} e  An object containing information about the anchor position. It has two properties:
         *  - `old`: An object describing the old Anchor position
         *  - `value`: An object describing the new Anchor position
         **/
        "change": (e: { old: Point, value: Point }) => void;
    }

    interface BackgroundTokenizerEvents {
        /**
         * Fires whenever the background tokeniziers between a range of rows are going to be updated.
         * @param e An object containing two properties, `first` and `last`, which indicate the rows of the region being updated.
         **/
        "update": (e: {
            data: { first: number, last: number }
        }) => void;
    }

    interface SelectionEvents {
        /**
         * Emitted when the cursor position changes.
         **/
        "changeCursor": () => void;
        /**
         * Emitted when the cursor selection changes.
         **/
        "changeSelection": () => void;
    }

    interface MultiSelectionEvents extends SelectionEvents {
        "multiSelect": () => void;
        "addRange": (e: { range: Range }) => void;
        "removeRange": (e: { ranges: Range[] }) => void;
        "singleSelect": () => void;
    }

    interface PlaceHolderEvents {
        "cursorEnter": (e: any) => void;
        "cursorLeave": (e: any) => void;
    }

    interface GutterEvents {
        "changeGutterWidth": (width: number) => void;
        "afterRender": () => void;
    }

    interface TextEvents {
        "changeCharacterSize": (e: any) => void;
    }

    interface VirtualRendererEvents {
        "afterRender": (e?: any, renderer?: VirtualRenderer) => void;
        "beforeRender": (e: any, renderer?: VirtualRenderer) => void;
        "themeLoaded": (e: { theme: string | Theme }) => void;
        "themeChange": (e: { theme: string | Theme }) => void;
        "scrollbarVisibilityChanged": () => void;
        "changeCharacterSize": (e: any) => void;
        "resize": (e?: any) => void;
        "autosize": () => void;
    }

    export class EventEmitter<T extends { [K in keyof T]: (...args: any[]) => any }> {
        once<K extends keyof T>(name: K, callback: T[K]): void;

        setDefaultHandler(name: string, callback: Function): void;

        removeDefaultHandler(name: string, callback: Function): void;

        on<K extends keyof T>(name: K, callback: T[K], capturing?: boolean): T[K];

        addEventListener<K extends keyof T>(name: K, callback: T[K], capturing?: boolean): T[K];

        off<K extends keyof T>(name: K, callback: T[K]): void;

        removeListener<K extends keyof T>(name: K, callback: T[K]): void;

        removeEventListener<K extends keyof T>(name: K, callback: T[K]): void;

        removeAllListeners(name?: string): void;

        _signal<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>): void;

        _emit<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>): void;

        _dispatchEvent<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>): void;
    }

    interface SearchOptions {
        /**The string or regular expression you're looking for*/
        needle: string | RegExp;
        preventScroll: boolean;
        /**Whether to search backwards from where cursor currently is*/
        backwards: boolean;
        /**The starting [[Range]] or cursor position to begin the search*/
        start: Range;
        /**Whether or not to include the current line in the search*/
        skipCurrent: boolean;
        /**The [[Range]] to search within. Set this to `null` for the whole document*/
        range: Range | null;
        preserveCase: boolean;
        /**Whether the search is a regular expression or not*/
        regExp: boolean;
        /**Whether the search matches only on whole words*/
        wholeWord: boolean;
        /**Whether the search ought to be case-sensitive*/
        caseSensitive: boolean;
        /**Whether to wrap the search back to the beginning when it hits the end*/
        wrap: boolean;
        re: any;
        /**true, if needle has \n or \r\n*/
        $isMultiLine: boolean;
        /**
         * internal property, determine if browser supports unicode flag
         * @private
         * */
        $supportsUnicodeFlag: boolean;
    }

    interface Point {
        row: number;
        column: number;
    }

    type Position = Point;

    interface Delta {
        action: 'insert' | 'remove';
        start: Point;
        end: Point;
        lines: string[];
        id?: number,
        folds?: Fold[]
    }

    interface Annotation {
        row: number;
        column: number;
        text: string;
        type: string;
    }

    export interface MarkerGroupItem {
        range: Range;
        className: string;
    }

    type MarkerGroup = import("./src/marker_group").MarkerGroup;


    export interface Command {
        name?: string;
        bindKey?: string | { mac?: string, win?: string };
        readOnly?: boolean;
        exec?: (editor?: Editor | any, args?: any) => void;
        isAvailable?: (editor: Editor) => boolean;
        description?: string,
        multiSelectAction?: "forEach" | "forEachLine" | Function,
        scrollIntoView?: true | "cursor" | "center" | "selectionPart" | "animate" | "selection" | "none",
        aceCommandGroup?: string,
        passEvent?: boolean,
        level?: number,
        action?: string,
    }

    type CommandLike = Command | ((editor: Editor) => void) | ((sb: SearchBox) => void);

    type KeyboardHandler = Partial<import("./src/keyboard/hash_handler").HashHandler> & {
        attach?: (editor: Editor) => void;
        detach?: (editor: Editor) => void;
        getStatusText?: (editor?: any, data?: any) => string;
    }

    export interface MarkerLike {
        range?: Range;
        type: string;
        renderer?: MarkerRenderer;
        clazz: string;
        inFront?: boolean;
        id?: number;
        update?: (html: string[],
                  // TODO maybe define Marker class
                  marker: any,
                  session: EditSession,
                  config: any) => void;

        [key: string]: any;
    }

    type MarkerRenderer = (html: string[],
                           range: Range,
                           left: number,
                           top: number,
                           config: any) => void;

    interface Token {
        type: string;
        value: string;
        index?: number;
        start?: number;
    }

    type BaseCompletion = import("./src/autocomplete").BaseCompletion;
    type SnippetCompletion = import("./src/autocomplete").SnippetCompletion;
    type ValueCompletion = import("./src/autocomplete").ValueCompletion;
    type Completion = import("./src/autocomplete").Completion;

    type HighlightRule = ({ defaultToken: string } | { include: string } | { todo: string } | {
        token: string | string[] | ((value: string) => string);
        regex: string | RegExp;
        next?: string | (() => void);
        push?: string;
        comment?: string;
        caseInsensitive?: boolean;
        nextState?: string;
    }) & { [key: string]: any };

    type HighlightRulesMap = Record<string, HighlightRule[]>;

    type KeywordMapper = (keyword: string) => string;

    interface HighlightRules {
        $rules: HighlightRulesMap;
        $embeds: string[];
        $keywords: any[];
        $keywordList: string[];

        addRules(rules: HighlightRulesMap, prefix?: string): void;

        getRules(): HighlightRulesMap;

        embedRules(rules: (new () => HighlightRules) | HighlightRulesMap, prefix: string, escapeRules?: boolean, append?: boolean): void;

        getEmbeds(): string[];

        normalizeRules(): void;

        createKeywordMapper(map: Record<string, string>, defaultToken?: string, ignoreCase?: boolean, splitChar?: string): KeywordMapper;
    }

    type FoldWidget = "start" | "end" | ""

    interface FoldMode {
        foldingStartMarker: RegExp;
        foldingStopMarker?: RegExp;

        getFoldWidget(session: EditSession, foldStyle: string, row: number): FoldWidget;

        getFoldWidgetRange(session: EditSession, foldStyle: string, row: number): Range | undefined;

        indentationBlock(session: EditSession, row: number, column?: number): Range | undefined;

        openingBracketBlock(session: EditSession, bracket: string, row: number, column: number, typeRe?: RegExp): Range | undefined;

        closingBracketBlock(session: EditSession, bracket: string, row: number, column: number, typeRe?: RegExp): Range | undefined;
    }

    type BehaviorAction = (state: string | string[], action: string, editor: Editor, session: EditSession, text: string | Range) => ({
        text: string,
        selection: number[]
    } | Range) & { [key: string]: any } | undefined;
    type BehaviorMap = Record<string, Record<string, BehaviorAction>>;

    interface Behaviour {
        $behaviours: { [behaviour: string]: any }

        add(name: string, action: string, callback: BehaviorAction): void;

        addBehaviours(behaviours: BehaviorMap): void;

        remove(name: string): void;

        inherit(mode: SyntaxMode | (new () => SyntaxMode), filter: string[]): void;

        getBehaviours(filter?: string[]): BehaviorMap;
    }

    interface Outdent {
        checkOutdent(line: string, input: string): boolean;

        autoOutdent(doc: Document, row: number): number | undefined;
    }

    interface SyntaxMode {
        /**
         * quotes used by language mode
         */
        $quotes: { [quote: string]: string };
        HighlightRules: {
            new(config?: any): HighlightRules
        }; //TODO: fix this
        foldingRules?: FoldMode;
        $behaviour?: Behaviour;
        $defaultBehaviour?: Behaviour;
        /**
         * characters that indicate the start of a line comment
         */
        lineCommentStart?: string;
        /**
         * characters that indicate the start and end of a block comment
         */
        blockComment?: { start: string, end: string }
        tokenRe?: RegExp;
        nonTokenRe?: RegExp;
        /**
         * An object containing conditions to determine whether to apply matching quote or not.
         */
        $pairQuotesAfter: { [quote: string]: RegExp }
        $tokenizer: Tokenizer;
        $highlightRules: HighlightRules;
        $embeds?: string[];
        $modes?: SyntaxMode[];
        $keywordList?: string[];
        $highlightRuleConfig?: any;
        completionKeywords: string[];
        transformAction: BehaviorAction;
        path?: string;

        getTokenizer(): Tokenizer;

        toggleCommentLines(state: string | string[],
                           session: EditSession,
                           startRow: number,
                           endRow: number): void;

        toggleBlockComment(state: string | string[],
                           session: EditSession,
                           range: Range,
                           cursor: Point): void;

        getNextLineIndent(state: string | string[], line: string, tab: string): string;

        checkOutdent(state: string | string[], line: string, input: string): boolean;

        autoOutdent(state: string | string[], doc: EditSession, row: number): void;

        // TODO implement WorkerClient types
        createWorker(session: EditSession): any;

        createModeDelegates(mapping: { [key: string]: string }): void;

        getKeywords(append?: boolean): Array<string | RegExp>;

        getCompletions(state: string | string[],
                       session: EditSession,
                       pos: Point,
                       prefix: string): Completion[];

        $getIndent(line: string): string;

        $createKeywordList(): string[];

        $delegator(method: string, args: IArguments, defaultHandler: any): any;

    }

    interface OptionsBase {
        [key: string]: any;
    }

    class OptionsProvider<T> {
        setOptions(optList: Partial<T>): void;

        getOptions(optionNames?: Array<keyof T> | Partial<T>): Partial<T>;

        setOption<K extends keyof T>(name: K, value: T[K]): void;

        getOption<K extends keyof T>(name: K): T[K];
    }

    type KeyBinding = import("./src/keyboard/keybinding").KeyBinding;

    interface CommandMap {
        [name: string]: Command;
    }

    type execEventHandler = (obj: {
        editor: Editor,
        command: Command,
        args: any[]
    }) => void;

    interface CommandManagerEvents {
        "exec": execEventHandler
        "afterExec": execEventHandler;
        "commandUnavailable": execEventHandler;
    }

    type CommandManager = import("./src/commands/command_manager").CommandManager;


    interface SavedSelection {
        start: Point;
        end: Point;
        isBackwards: boolean;
    }

    var Selection: {
        new(session: EditSession): Selection;
    }

    type CompleterCallback = (error: any, completions: Completion[]) => void;

    interface Completer {
        /** Regular expressions defining valid identifier characters for completion triggers */
        identifierRegexps?: Array<RegExp>,

        /** Main completion method that provides suggestions for the given context */
        getCompletions(editor: Editor,
                       session: EditSession,
                       position: Point,
                       prefix: string,
                       callback: CompleterCallback): void;

        /** Returns documentation tooltip for a completion item */
        getDocTooltip?(item: Completion): void | string | Completion;

        /** Called when a completion item becomes visible */
        onSeen?: (editor: Ace.Editor, completion: Completion) => void;
        /** Called when a completion item is inserted */
        onInsert?: (editor: Ace.Editor, completion: Completion) => void;

        /** Cleanup method called when completion is cancelled */
        cancel?(): void;

        /** Unique identifier for this completer */
        id?: string;
        /** Characters that trigger autocompletion when typed */
        triggerCharacters?: string[];
        /** Whether to hide inline preview text */
        hideInlinePreview?: boolean;
        /** Custom insertion handler for completion items */
        insertMatch?: (editor: Editor, data: Completion) => void;
    }

    interface CompletionOptions {
        matches?: Completion[];
    }

    type CompletionProviderOptions = {
        exactMatch?: boolean;
        ignoreCaption?: boolean;
    }

    type GatherCompletionRecord = {
        prefix: string;
        matches: Completion[];
        finished: boolean;
    }

    type CompletionCallbackFunction = (err: Error | undefined, data: GatherCompletionRecord) => void;
    type CompletionProviderCallback = (this: import("./src/autocomplete").Autocomplete, err: Error | undefined, completions: import("./src/autocomplete").FilteredList, finished: boolean) => void;

    type AcePopupNavigation = "up" | "down" | "start" | "end";

    interface EditorMultiSelectProperties {
        inMultiSelectMode?: boolean,
        /**
         * Updates the cursor and marker layers.
         **/
        updateSelectionMarkers: () => void,
        /**
         * Adds the selection and cursor.
         * @param orientedRange A range containing a cursor
         **/
        addSelectionMarker: (orientedRange: Ace.Range & { marker?: any }) => Ace.Range & { marker?: any },
        /**
         * Removes the selection marker.
         * @param range The selection range added with [[Editor.addSelectionMarker `addSelectionMarker()`]].
         **/
        removeSelectionMarker: (range: Ace.Range & { marker?: any }) => void,
        removeSelectionMarkers: (ranges: (Ace.Range & { marker?: any })[]) => void,
        $onAddRange: (e: any) => void,
        $onRemoveRange: (e: any) => void,
        $onMultiSelect: (e: any) => void,
        $onSingleSelect: (e: any) => void,
        $onMultiSelectExec: (e: any) => void,
        /**
         * Executes a command for each selection range.
         * @param cmd The command to execute
         * @param [args] Any arguments for the command
         **/
        forEachSelection: (cmd: Object, args?: string, options?: Object) => void,
        /**
         * Removes all the selections except the last added one.
         **/
        exitMultiSelectMode: () => void,
        getSelectedText: () => string,
        $checkMultiselectChange: (e: any, anchor: Ace.Anchor) => void,
        /**
         * Finds and selects all the occurrences of `needle`.
         * @param needle The text to find
         * @param options The search options
         * @param additive keeps
         * @returns {Number} The cumulative count of all found matches
         **/
        findAll: (needle?: string, options?: Partial<Ace.SearchOptions>, additive?: boolean) => number,
        /**
         * Adds a cursor above or below the active cursor.
         * @param dir The direction of lines to select: -1 for up, 1 for down
         * @param [skip] If `true`, removes the active selection range
         */
        selectMoreLines: (dir: number, skip?: boolean) => void,
        /**
         * Transposes the selected ranges.
         * @param {Number} dir The direction to rotate selections
         **/
        transposeSelections: (dir: number) => void,
        /**
         * Finds the next occurrence of text in an active selection and adds it to the selections.
         * @param {Number} dir The direction of lines to select: -1 for up, 1 for down
         * @param {Boolean} [skip] If `true`, removes the active selection range
         * @param {Boolean} [stopAtFirst]
         **/
        selectMore: (dir: number, skip?: boolean, stopAtFirst?: boolean) => void,
        /**
         * Aligns the cursors or selected text.
         **/
        alignCursors: () => void,
        $reAlignText: (lines: string[], forceLeft: boolean) => string[],
        multiSelect?: any,
        $multiselectOnSessionChange?: any,
        $blockSelectEnabled?: boolean,
    }

    /**
     * Provider interface for code lens functionality
     */
    interface CodeLenseProvider {
        /**
         * Compute code lenses for the given edit session
         * @param session The edit session to provide code lenses for
         * @param callback Callback function that receives errors and code lenses
         */
        provideCodeLenses: (session: EditSession, callback: (err: any, payload: CodeLense[]) => void) => void;
    }

    /**
     * Represents a command associated with a code lens
     */
    interface CodeLenseCommand {
        /**
         * Command identifier that will be executed
         */
        id?: string,
        /**
         * Display title for the code lens
         */
        title: string,
        /**
         * Argument(s) to pass to the command when executed
         */
        arguments?: any,
    }

    /**
     * Represents a code lens - an actionable UI element displayed above a code line
     */
    interface CodeLense {
        /**
         * Starting position where the code lens should be displayed
         */
        start: Point,
        /**
         * Command to execute when the code lens is activated
         */
        command?: CodeLenseCommand
    }

    interface CodeLenseEditorExtension {
        codeLensProviders?: CodeLenseProvider[];
        $codeLensClickHandler?: any;
        $updateLenses?: () => void;
        $updateLensesOnInput?: () => void;
    }

    interface ElasticTabstopsEditorExtension {
        elasticTabstops?: import("./src/ext/elastic_tabstops_lite").ElasticTabstopsLite;
    }

    interface TextareaEditorExtension {
        setDisplaySettings?: (settings: any) => void;
    }

    interface PromptEditorExtension {
        cmdLine?: Editor;
    }

    interface OptionsEditorExtension {
        $options?: any;
    }

    interface MultiSelectProperties {
        ranges: Ace.Range[] | null;
        rangeList: Ace.RangeList | null;

        /**
         * Adds a range to a selection by entering multiselect mode, if necessary.
         * @param {Ace.Range} range The new range to add
         * @param {Boolean} [$blockChangeEvents] Whether or not to block changing events
         **/
        addRange(range: Ace.Range, $blockChangeEvents?: boolean): any;

        inMultiSelectMode: boolean;

        /**
         * @param {Ace.Range} [range]
         **/
        toSingleRange(range?: Ace.Range): void;

        /**
         * Removes a Range containing pos (if it exists).
         * @param {Ace.Point} pos The position to remove, as a `{row, column}` object
         **/
        substractPoint(pos: Ace.Point): any;

        /**
         * Merges overlapping ranges ensuring consistency after changes
         **/
        mergeOverlappingRanges(): void;

        /**
         * @param {Ace.Range} range
         */
        $onAddRange(range: Ace.Range): void;

        rangeCount: number;

        /**
         *
         * @param {Ace.Range[]} removed
         */
        $onRemoveRange(removed: Ace.Range[]): void;

        /**
         * adds multicursor support to selection
         */
        $initRangeList(): void;

        /**
         * Returns a concatenation of all the ranges.
         * @returns {Ace.Range[]}
         **/
        getAllRanges(): Ace.Range[];

        /**
         * Splits all the ranges into lines.
         **/
        splitIntoLines(): void;

        /**
         */
        joinSelections(): void;

        /**
         **/
        toggleBlockSelection(): void;

        /**
         *
         * Gets list of ranges composing rectangular block on the screen
         *
         * @param {Ace.ScreenCoordinates} screenCursor The cursor to use
         * @param {Ace.ScreenCoordinates} screenAnchor The anchor to use
         * @param {Boolean} [includeEmptyLines] If true, this includes ranges inside the block which are empty due to clipping
         * @returns {Ace.Range[]}
         **/
        rectangularRangeBlock(screenCursor: Ace.ScreenCoordinates, screenAnchor: Ace.ScreenCoordinates, includeEmptyLines?: boolean): Ace.Range[];

        _eventRegistry?: any;
        index?: number;
    }

    type AcePopupEventsCombined = Ace.EditorEvents & Ace.AcePopupEvents;
    type AcePopupWithEditor = Ace.EventEmitter<AcePopupEventsCombined> & Ace.Editor;
    type InlineAutocompleteAction = "prev" | "next" | "first" | "last";

    type TooltipCommandFunction<T> = (editor: Ace.Editor) => T;

    export interface TooltipCommand extends Ace.Command {
        enabled?: TooltipCommandFunction<boolean> | boolean,
        getValue?: TooltipCommandFunction<any>,
        type: "button" | "text" | "checkbox"
        iconCssClass?: string,
        cssClass?: string
    }

    export type CommandBarTooltip = import("./src/ext/command_bar").CommandBarTooltip;

    export type TokenizeResult = Array<Array<{
        className?: string,
        value: string,
    }>>

    export interface StaticHighlightOptions {
        /** Syntax mode (e.g., 'ace/mode/javascript'). Auto-detected from CSS class if not provided */
        mode?: string | SyntaxMode,
        /** Color theme (e.g., 'ace/theme/textmate'). Defaults to 'ace/theme/textmate' */
        theme?: string | Theme,
        /** Whether to trim whitespace from code content */
        trim?: boolean,
        /** Starting line number for display */
        firstLineNumber?: number,
        /** Whether to show line numbers gutter */
        showGutter?: boolean
    }

    export interface Operation {
        command: {
            name?: string;
        };
        args: any;
        selectionBefore?: Range | Range[];
        selectionAfter?: Range | Range[];
        docChanged?: boolean;
        selectionChanged?: boolean;
    }

    export interface CommandBarEvents {
        "hide": () => void;
        "show": () => void;
        "alwaysShow": (e: boolean) => void;
    }

    export interface FontMetricsEvents {
        "changeCharacterSize": (e: { data: { height: number, width: number } }) => void;
    }

    export interface OptionPanelEvents {
        "setOption": (e: { name: string, value: any }) => void;
    }

    export interface ScrollbarEvents {
        "scroll": (e: { data: number }) => void;
    }

    export interface TextInputAriaOptions {
        activeDescendant?: string;
        role?: string;
        setLabel?: boolean;
        inline?: boolean;
    }
}


export const version: string;
export const config: Ace.Config;

export function require(name: string): any;

export function edit(el?: string | (Element & {
    env?: any;
    value?: any;
}) | null, options?: Partial<Ace.EditorOptions>): Ace.Editor;

export function createEditSession(text: Ace.Document | string, mode: Ace.SyntaxMode): Ace.EditSession;

export const VirtualRenderer: {
    new(container: HTMLElement, theme?: string): Ace.VirtualRenderer;
};
export const EditSession: {
    new(text: string | Ace.Document, mode?: Ace.SyntaxMode): Ace.EditSession;
};
export const UndoManager: {
    new(): Ace.UndoManager;
};
export const Editor: {
    new(renderer: Ace.VirtualRenderer, session?: Ace.EditSession, options?: Partial<Ace.EditorOptions>): Ace.Editor;
};
export const Range: {
    new(startRow: number, startColumn: number, endRow: number, endColumn: number): Ace.Range;
    fromPoints(start: Ace.Point, end: Ace.Point): Ace.Range;
    comparePoints(p1: Ace.Point, p2: Ace.Point): number;
};

export type InlineAutocomplete = Ace.InlineAutocomplete;
export type CommandBarTooltip = Ace.CommandBarTooltip;

declare global {
    interface Element {
        setAttribute(name: string, value: boolean): void;

        setAttribute(name: string, value: number): void;
    }
}

declare module "./src/anchor" {
    export interface Anchor extends Ace.EventEmitter<Ace.AnchorEvents> {
        markerId?: number;
        document: Ace.Document;
    }


}

declare module "./src/autocomplete" {
    export interface Autocomplete {
        popup: Ace.AcePopup;
        emptyMessage?: Function,
    }

    export interface CompletionProvider {
        completions: Ace.FilteredList;
    }
}

declare module "./src/background_tokenizer" {
    export interface BackgroundTokenizer extends Ace.EventEmitter<Ace.BackgroundTokenizerEvents> {

    }
}

declare module "./src/document" {
    export interface Document extends Ace.EventEmitter<Ace.DocumentEvents> {
    }

}

declare module "./src/editor" {
    export interface Editor extends Ace.EditorMultiSelectProperties, Ace.OptionsProvider<Ace.EditorOptions>,
        Ace.EventEmitter<Ace.EditorEvents>, Ace.CodeLenseEditorExtension, Ace.ElasticTabstopsEditorExtension,
        Ace.TextareaEditorExtension, Ace.PromptEditorExtension, Ace.OptionsEditorExtension {
        session: Ace.EditSession;
        $mergeUndoDeltas?: any,
        $highlightSelectedWord?: boolean,
        $updatePlaceholder?: Function,
        $cursorStyle?: string,
        $readOnly?: any,
        $highlightActiveLine?: any,
        $enableAutoIndent?: any,
        $copyWithEmptySelection?: any
        $selectionStyle?: string,
        env?: any;
        widgetManager?: Ace.LineWidgets,
        completer?: Ace.Autocomplete | Ace.InlineAutocomplete,
        completers: Ace.Completer[],
        $highlightTagPending?: boolean,
        showKeyboardShortcuts?: () => void,
        showSettingsMenu?: () => void,
        searchBox?: Ace.SearchBox,
        _eventRegistry?: any,
        $textInputAriaLabel?: string
    }
}

declare module "./src/edit_session" {
    type TextMarker = import("./src/layer/text_markers").TextMarker;
    type TextMarkers = typeof import("./src/layer/text_markers").editSessionTextMarkerMixin & {
        $textMarkers: TextMarker[];
        $textMarkerId: number;
        $scheduleForRemove: Set<string>;
    };

    export interface EditSession extends Ace.EventEmitter<Ace.EditSessionEvents>,
        Ace.OptionsProvider<Ace.EditSessionOptions>,
        Ace.Folding, Ace.BracketMatch, TextMarkers  {
        doc: Ace.Document,
        $highlightLineMarker?: {
            start: Ace.Point,
            end: Ace.Point,
            id?: number
        }
        $useSoftTabs?: boolean,
        $tabSize?: number,
        $useWorker?: boolean,
        $wrapAsCode?: boolean,
        $indentedSoftWrap?: boolean,
        $bracketHighlight?: any,
        $selectionMarker?: number,
        lineWidgetsWidth?: number,
        $getWidgetScreenLength?: () => number,
        _changedWidgets?: any,
        $options: any,
        $wrapMethod?: any,
        $enableVarChar?: any,
        $wrap?: any,
        $navigateWithinSoftTabs?: boolean,
        $selectionMarkers?: any[],
        gutterRenderer?: any,
        $firstLineNumber?: number,
        $emacsMark?: any,
        selectionMarkerCount?: number,
        multiSelect?: any,
        $occurHighlight?: any,
        $occur?: Ace.Occur,
        $occurMatchingLines?: any,
        $useEmacsStyleLineStart?: boolean,
        $selectLongWords?: boolean,
        curOp: Ace.Operation | null,

        getSelectionMarkers(): any[],
    }

}

declare module "./src/edit_session/fold" {
    export interface Fold {
        collapseChildren?: number;
    }
}

declare module "./src/placeholder" {
    export interface PlaceHolder extends Ace.EventEmitter<Ace.PlaceHolderEvents> {
    }
}

declare module "./src/scrollbar" {
    export interface VScrollBar extends Ace.EventEmitter<Ace.ScrollbarEvents> {
    }

    export interface HScrollBar extends Ace.EventEmitter<Ace.ScrollbarEvents> {
    }
}

declare module "./src/scrollbar_custom" {
    export interface VScrollBar extends Ace.EventEmitter<Ace.ScrollbarEvents> {
    }

    export interface HScrollBar extends Ace.EventEmitter<Ace.ScrollbarEvents> {
    }
}

declare module "./src/line_widgets" {
    export interface LineWidgets {
        lineWidgets: Ace.LineWidget[];
        editor: Ace.Editor;
    }
}

declare module "./src/selection" {
    export interface Selection extends Ace.EventEmitter<Ace.MultiSelectionEvents>, Ace.MultiSelectProperties {
    }
}

declare module "./src/range" {
    export interface Range {
        id?: number;
        cursor?: Ace.Point;
        isBackwards?: boolean;
    }
}

declare module "./src/virtual_renderer" {
    export interface VirtualRenderer extends Ace.EventEmitter<Ace.VirtualRendererEvents>, Ace.OptionsProvider<Ace.VirtualRendererOptions> {
        $customScrollbar?: boolean,
        $extraHeight?: number,
        $showGutter?: boolean,
        $showPrintMargin?: boolean,
        $printMarginColumn?: number,
        $animatedScroll?: boolean,
        $isMousePressed?: boolean,
        textarea: HTMLTextAreaElement,
        $hScrollBarAlwaysVisible?: boolean,
        $vScrollBarAlwaysVisible?: boolean
        $maxLines?: number,
        $scrollPastEnd?: number,
        enableKeyboardAccessibility?: boolean,
        $highlightGutterLine?: boolean,
        $minLines?: number,
        $maxPixelHeight?: number,
        $gutterWidth?: number,
        showInvisibles?: boolean,
        $hasCssTransforms?: boolean,
        $blockCursor?: boolean,
        $useTextareaForIME?: boolean,
        theme?: any,
        $theme?: any,
        destroyed?: boolean,
        session: Ace.EditSession,
        keyboardFocusClassName?: string,
    }
}

declare module "./src/snippets" {
    interface SnippetManager extends Ace.EventEmitter<any> {
    }
}

declare module "./src/ext/command_bar" {
    export interface CommandBarTooltip extends Ace.EventEmitter<Ace.CommandBarEvents> {
        $shouldHideMoreOptions?: boolean,
    }
}

declare module "./src/commands/command_manager" {
    export interface CommandManager extends Ace.EventEmitter<Ace.CommandManagerEvents> {
        $checkCommandState?: boolean
    }
}

declare module "./src/autocomplete/popup" {

    export interface AcePopup extends Ace.AcePopupWithEditor {
        setSelectOnHover: (val: boolean) => void,
        setRow: (line: number) => void,
        getRow: () => number,
        getHoveredRow: () => number,
        filterText: string,
        isOpen: boolean,
        isTopdown: boolean,
        autoSelect: boolean,
        data: Ace.Completion[],
        setData: (data: Ace.Completion[], filterText?: string) => void,
        getData: (row: number) => Ace.Completion,
        hide: () => void,
        anchor: "top" | "bottom",
        anchorPosition: Ace.Point,
        tryShow: (pos: any, lineHeight: number, anchor: "top" | "bottom", forceShow?: boolean) => boolean,
        $borderSize: number,
        show: (pos: any, lineHeight: number, topdownOnly?: boolean) => void,
        goTo: (where: Ace.AcePopupNavigation) => void,
        getTextLeftOffset: () => number,
        $imageSize: number,
        anchorPos: any,
        isMouseOver?: boolean,
        selectedNode?: HTMLElement,
    }
}

declare module "./src/layer/cursor" {
    export interface Cursor {
        timeoutId?: number;
    }
}

declare module "./src/layer/gutter" {
    export interface Gutter extends Ace.EventEmitter<Ace.GutterEvents> {
        $useSvgGutterIcons?: boolean,
        $showFoldedAnnotations?: boolean,
    }
}

declare module "./src/layer/text" {
    type TextMarkersMixin = typeof import("./src/layer/text_markers").textMarkerMixin;
    export interface Text extends Ace.EventEmitter<Ace.TextEvents>, TextMarkersMixin {
        config: Ace.LayerConfig
    }
}

declare module "./src/lib/app_config" {
    export interface AppConfig extends Ace.EventEmitter<any> {
    }
}

declare module "./src/mouse/mouse_event" {
    export interface MouseEvent {
        time?: number;
    }
}

declare module "./src/mouse/mouse_handler" {

    export interface MouseHandler {
        $tooltipFollowsMouse?: boolean,
        cancelDrag?: boolean
        //from DefaultHandlers
        $clickSelection?: Ace.Range,
        mousedownEvent?: Ace.MouseEvent,
        startSelect?: (pos?: Ace.Point, waitForClickSelection?: boolean) => void,
        select?: () => void
        $lastScroll?: { t: number, vx: number, vy: number, allowed: number }
        selectEnd?: () => void
    }
}

declare module "./src/ext/options" {
    export interface OptionPanel extends Ace.EventEmitter<Ace.OptionPanelEvents> {
    }
}

declare module "./src/layer/font_metrics" {
    export interface FontMetrics extends Ace.EventEmitter<Ace.FontMetricsEvents> {
    }
}

declare module "./src/tooltip" {
    export interface HoverTooltip {
        row: number;
    }
}

declare module "./src/mouse/default_gutter_handler" {
    export interface GutterHandler {
    }
}

declare module "./src/ext/diff/base_diff_view" {
    export interface BaseDiffView extends Ace.OptionsProvider<import("ace-code/src/ext/diff").DiffViewOptions> {
    }
}

