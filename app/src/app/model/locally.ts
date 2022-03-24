export interface Locally {
    vid: String,
    title: String,
    description: String,
    image_path: String,
    isDownloaded: boolean,
    created: Date,
}

export interface LocallyResponse {
    items: Array<Locally> 
}