export declare class Blogs {
    id: number;
    title: string;
    content: string;
    summary: string;
    tsvector_column: string;
    created_at: Date;
    update_at: Date;
    formatContent(): void;
}
