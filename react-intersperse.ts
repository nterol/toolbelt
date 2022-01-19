// This is not good, we should not use Array.reduce with inner spread

export default function intersperse(arr: JSX.Element[], separator: (index: number) => JSX.Element): JSX.Element[] {
    return arr.reduce((acc, curr, index) => [
        ...acc, 
        curr, 
        ...(index === arr.length -1 ? [] : [separator(index)])
    ], [] as JSX.Element)
    
}