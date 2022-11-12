class MediaPoint {
    private readonly name: string
    private readonly point: number

    constructor(name: string, point: number) {
        this.name = name
        this.point = point
    }
}

interface IStorage {
    [key: string]: string[]
}

// class MediaStorage {
//     public readonly storage: IStorage
// }

// const storage = new MediaStorage()

export default class Media {
    // breakpoint: number
    // private readonly media: MediaPoint[]
    // private

    constructor(enable: boolean) {
        // if(!enable) return
        //
        // this.media = [
        //     new MediaPoint('lg', 1200),
        //     new MediaPoint('md', 750),
        //     new MediaPoint('sm', 440),
        // ]

        // this.breakpoint = breakpoint
    }
}